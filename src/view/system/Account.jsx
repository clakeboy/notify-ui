/**
 * Created by clakeboy on 2018/7/4.
 */
import React from 'react';
import {
    Card,
    Input,
    Button,
    ButtonGroup,
    Table,
    Pagination,
    Modal
} from '@clake/react-bootstrap4';
import Fetch from "../../common/Fetch";
import PropTypes from "prop-types";
import {GetComponent} from "../../common/Funcs";
import Loader from "../../components/Loader";

class Account extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            count:0,
            currentPage:1
        };

        this.pageNumber = 30;

        this.props.setTitle('任务列表');
    }

    componentDidMount() {
        this.loadUsers(1)
    }

    /**
     * 加载用户列表
     * @param page
     */
    loadUsers(page) {
        this.modal.loading("加载中...");
        Fetch("/serv/account/query",{page:page,number:this.pageNumber,account:this.account.getValue()},(res)=>{
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

    /**
     * 打开一个用户信息
     * @param id
     */
    openEdit(id) {
        this.modal.view({
            title:id?'修改后台帐户信息':'添加后台帐户',
            content:<Loader loadPath='/system/edit_account'
                            import={GetComponent}
                            userId={id}
                            callback={(res)=>{
                                console.log(res);
                                this.modal.close();
                                this.loadUsers(1);
                            }}/>
        });
        // this.context.router.history.push('/task/edit_task')
    }

    render() {
        return (
            <div className='ck-container'>
                <Card>
                    <div className='form-inline'>
                        <Input ref={c=>this.account=c} className='mr-1' placeholder='帐户名'/>
                        <Button icon='search' onClick={()=>{
                            this.loadUsers(1)
                        }}>搜索</Button>
                    </div>
                    <hr/>
                    <div className='mb-1'>
                        <Button className='mr-1' icon='sync-alt' onClick={e=>this.loadUsers(this.state.currentPage)}>刷新</Button>
                        <Button className='float-right' icon='plus' theme='success' onClick={e=>this.openEdit()}>添加帐号</Button>
                    </div>
                    <Table hover={true} select={true} headerTheme='light' data={this.state.data}>
                        <Table.Header text='帐户ID' field='id'/>
                        <Table.Header text='帐户名' field='account' onFormat={(val,row)=>{
                            return (
                                <React.Fragment>
                                    {row.disable?
                                        <span className='badge badge-danger mr-1'>禁用</span>:
                                        <span className='badge badge-success mr-1'>启用</span>}
                                    {val}
                                </React.Fragment>
                            )
                        }}/>
                        <Table.Header text='姓名' field='user_name'/>
                        <Table.Header text='密码' field='password'/>
                        <Table.Header text='创建时间' field='created_date' onFormat={value=>{
                            return moment.unix(value).format("YYYY-MM-DD hh:mm:ss");
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
                                onSelect={page=>this.loadUsers(page)}/>
                </Card>
                <Modal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

Account.propTypes = {

};

Account.defaultProps = {

};

export default Account;