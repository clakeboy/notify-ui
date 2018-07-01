/**
 * Created by clakeboy on 2018/6/29.
 */
import React from 'react';
import Loader from '../../components/Loader';
import {GetComponent} from '../../common/Funcs';
import moment from 'moment';
import {
    Card,
    Input,
    Button,
    Table,
    Pagination,
    Modal
} from '@clake/react-bootstrap4';

class Manage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data:null,
        };

        this.props.setTitle('任务列表');
    }

    componentDidMount() {
        this.loadTask();
    }

    loadTask() {

    }

    openEdit(id) {
        this.modal.view({
            title:'添加通知任务',
            content:<Loader loadPath='/task/edit_task' import={GetComponent} taskId={id}/>
        });
    }

    render() {
        return (
            <div className='ck-container'>
                <Card>
                    <div className='form-inline'>
                        <Input className='mr-1' placeholder='任务名称'/>
                        <Button icon='search'>搜索</Button>
                    </div>
                    <hr/>
                    <Button className='mb-1' icon='plus' theme='success' onClick={e=>this.openEdit()}>添加任务</Button>
                    <Table hover={true} select={true} headerTheme='light' data={this.dataTable}>
                        <Table.Header text='任务ID' field='name'/>
                        <Table.Header text='任务名称' field='age'/>
                        <Table.Header text='时间规则' field='birthday'/>
                        <Table.Header text='执行一次' field='address' hide/>
                        <Table.Header text='通知次数' field='both'/>
                        <Table.Header text='已通知次数' field='test'/>
                        <Table.Header text='创建时间' field='is_paid' onFormat={row=>{
                            return moment.unix(row.created_date).format("YYYY-MM-DD hh:mm:ss");
                        }}/>
                        <Table.Header text='操作' align='center' onFormat={row=>{
                            return <Button className='color-blue' size='sm' icon='plus'>Add</Button>
                        }} />
                    </Table>
                    <Pagination count={1000} current={1} number={30} showPage={10}/>
                </Card>
                <Modal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

Manage.propTypes = {

};

Manage.defaultProps = {

};

export default Manage;