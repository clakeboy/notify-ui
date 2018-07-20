/**
 * Created by clakeboy on 2018/6/29.
 */
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    ButtonGroup,
    Table,
    Pagination,
    Modal,
    Tabs,
    TabsContent
} from '@clake/react-bootstrap4';
import Fetch from "../../common/Fetch";
import PropTypes from "prop-types";
import {GetComponent} from "../../common/Funcs";
import Loader from "../../components/Loader";
import $ from 'jquery';

class Manage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            count:0,
            currentPage:1
        };

        this.once = 'all';

        this.pageNumber = 30;

        this.props.setTitle('任务列表');
    }

    componentDidMount() {
        this.loadTask(1);
        $('body').tooltip({
            selector:'[data-toggle="tooltip"]',
            trigger:'hover'
        });
    }

    componentWillUnmount() {
        $('[data-toggle="tooltip"]').tooltip('dispose');
    }

    loadTask(page) {
        this.modal.loading("加载中...");
        Fetch("/serv/task/query",{
            page:page,
            number:this.pageNumber,
            once:this.once,
            task_name:this.task_name.getValue()
        },(res)=>{
            if (res.status) {
                this.setState({
                    data:res.data.list,
                    currentPage:page,
                    count:res.data.count
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

    openEdit(id) {
        this.modal.view({
            title:id?'修改通知任务信息':'添加通知任务',
            content:<Loader loadPath='/task/edit_task'
                            import={GetComponent}
                            taskId={id}
                            callback={(res)=>{
                                console.log(res);
                                this.modal.close();
                                this.loadTask(1);
                            }}/>
        });
        // this.context.router.history.push('/task/edit_task')
    }

    delete(row) {
        this.modal.confirm({
            content:`确定要删除这个任务项?\n[${row.task_name}]`,
            callback:(ok)=>{
                if (ok) {
                    this.modal.loading('删除数据中...');
                    Fetch('/serv/task/delete',{id:row.id},(res)=>{
                        if (res.status) {
                            this.modal.alert({
                                content:'删除数据成功!',
                                callback:()=>{
                                    this.loadTask(this.state.currentPage);
                                }
                            });
                        } else {
                            this.modal.alert('删除数据失败! '+res.msg);
                        }
                    },(e)=>{
                        this.modal.alert(e);
                    })
                }
            }
        });
    }

    selectHandler=(id,prv_id)=>{
        this.once = id;
        this.loadTask(1);
    };

    render() {
        return (
            <div className='ck-container'>
                <Card>
                    <div className='form-inline'>
                        <Input ref={c=>this.task_name=c} className='mr-1' placeholder='任务名称'/>
                        <Button icon='search' onClick={()=>{
                            this.loadTask(1)
                        }}>搜索</Button>
                    </div>
                    <hr/>
                    <Tabs className='mb-1' border={false} content={false} onSelect={this.selectHandler}>
                        <TabsContent id='all' text='全部任务' active/>
                        <TabsContent id='loop' text='循环任务'/>
                        <TabsContent id='once' text='单次任务'/>
                    </Tabs>
                    <div className='mb-1'>
                        <Button className='mr-1' icon='sync-alt' onClick={e=>this.loadTask(this.state.currentPage)}>刷新</Button>
                        <Button className='float-right' icon='plus' theme='success' onClick={e=>this.openEdit()}>添加任务</Button>
                    </div>
                    <Table hover={true} select={false} headerTheme='light' data={this.state.data}>
                        <Table.Header text='任务ID' field='id'/>
                        <Table.Header text='任务名称' field='task_name' onFormat={(val,row)=>{
                            return (
                                <React.Fragment>
                                    {row.disable?
                                        <span className='badge badge-danger'>禁用</span>:
                                        <span className='badge badge-success'>启用</span>}
                                    <Link className='ml-1' to={`/task/log?task_id=${row.id}`}
                                          data-toggle="tooltip" data-placement="top" title="点击查看通知记录">{val}</Link>
                                </React.Fragment>
                            )
                        }}/>
                        <Table.Header text='时间规则' field='time_rule'/>
                        <Table.Header text='通知方式' field='notify_method'/>
                        <Table.Header text='执行一次' field='once' onFormat={val=>{
                            return val? <span className="badge badge-success">是</span>:
                                <span className="badge badge-danger">否</span>;
                        }}/>
                        <Table.Header text='已完成' field='is_execute' onFormat={val=>{
                            return val? <span className="badge badge-success">是</span>:
                                <span className="badge badge-danger">否</span>;
                        }}/>
                        <Table.Header text='通知次数' field='notify_number'/>
                        <Table.Header text='重送次数' field='notified_number'/>
                        <Table.Header text='创建时间' field='created_date' onFormat={value=>{
                            return moment.unix(value).format("YYYY-MM-DD HH:mm:ss");
                        }}/>
                        <Table.Header text='操作' align='center' onFormat={(val,row)=>{
                            return <ButtonGroup>
                                <Button size='sm' icon='edit' theme='secondary'
                                        onClick={e=>{
                                            this.openEdit(row.id);
                                        }}>修改</Button>
                                <Button size='sm' icon='trash-alt' theme='danger'
                                        onClick={e=>{
                                            this.delete(row)
                                        }}/>
                            </ButtonGroup>
                        }} />
                    </Table>
                    <Pagination count={this.state.count} current={this.state.currentPage}
                                number={this.pageNumber} showPage={10}
                                onSelect={page=>this.loadTask(page)}/>
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

Manage.contextTypes = {
    router: PropTypes.object
};

export default Manage;