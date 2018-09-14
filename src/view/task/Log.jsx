/**
 * Created by clakeboy on 2018/6/29.
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Card,
    Input,
    Button,
    ButtonGroup,
    Table,
    Pagination,
    CKModal
} from '@clake/react-bootstrap4';
import Fetch from "../../common/Fetch";
class Log extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            count:0,
            currentPage:1,
            task_id:this.props.query.task_id||''
        };

        this.pageNumber = 30;
        this.props.setTitle('任务日志');
    }

    componentDidMount() {
        this.loadTaskLog(1)
    }

    loadTaskLog(page) {
        this.modal.loading("加载中...");
        let id  = parseInt(this.state.task_id);
        if (!id) {
            id = 0;
        }
        Fetch("/serv/log/query",{page:page,number:this.pageNumber,task_id:id},(res)=>{
            if (res.status) {
                this.setState({
                    data:res.data.list,
                    currentPage:page,
                    count:res.data.count,
                    task_id:id||'',
                },()=>{
                    this.modal.close();
                });
            } else {
                this.modal.alert(res.msg);
            }
        },(e)=>{
            this.modal.alert('远程调用出错!'+e);
        });
    }

    render() {
        return (
            <div className='ck-container'>
                <Card>
                    <div className='form-inline'>
                        <Input className='mr-1' onChange={(val)=>{
                            this.setState({
                                task_id:val
                            });
                        }} data={this.state.task_id} placeholder='任务ID'/>
                        <Button icon='search' onClick={()=>{
                            this.loadTaskLog(1);
                        }}>搜索</Button>
                    </div>
                    <hr/>
                    <div className='mb-1'>
                        <Button className='mr-1' icon='sync-alt' onClick={e=>this.loadTaskLog(this.state.currentPage)}>刷新</Button>
                    </div>
                    <Table hover={true} select={false} headerTheme='light' data={this.state.data}>
                        <Table.Header text='ID' field='id'/>
                        <Table.Header text='任务ID' field='task_id'/>
                        <Table.Header text='任务名称' field='task_name'/>
                        <Table.Header text='通知回复' field='exec_receive'/>
                        <Table.Header text='通知错误' field='exec_error'/>
                        <Table.Header text='执行时间' field='exec_time' onFormat={value=>{
                            return moment.unix(value).format("YYYY-MM-DD HH:mm:ss");
                        }}/>
                        <Table.Header text='创建时间' field='created_date' onFormat={value=>{
                            return moment.unix(value).format("YYYY-MM-DD HH:mm:ss");
                        }}/>
                    </Table>
                    <Pagination count={this.state.count} current={this.state.currentPage}
                                number={this.pageNumber} showPage={10}
                                onSelect={page=>this.loadTaskLog(page)}/>
                </Card>
                <CKModal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

Log.propTypes = {

};

Log.defaultProps = {

};

Log.contextTypes = {
    router: PropTypes.object
};

export default Log;