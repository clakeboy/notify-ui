/**
 * Created by clakeboy on 2018/7/4.
 */
import React from 'react';
import {
    Input,
    Button,
    Checkbox,
    CKModal,
} from '@clake/react-bootstrap4';
import Fetch from "../../common/Fetch";

class EditAccount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : {}
        };
    }

    componentDidMount() {
        this.initEdit(this.props.userId)
    }

    componentWillReceiveProps(nextProps) {
        this.initEdit(nextProps.userId)
    }

    initEdit(user_id) {
        if (user_id) {
            this.loadUser(user_id);
        } else {
            this.setState({
                data : {
                    account:'',
                    user_name:'',
                    password:'',
                    disable:false,
                }
            });
        }
    }

    loadUser(user_id) {
        this.modal.loading('加载中...');
        Fetch('/serv/account/find',{id:user_id},(res)=>{
            if (res.status) {
                this.setState({
                    data:res.data
                },()=>{
                    this.modal.close();
                });
            } else {
                this.modal.alert('获取任务信息失败!\n'+res.msg);
            }
        },(e)=>{
            this.modal.alert('远程调用出错! '+e);
        })
    }

    save() {
        this.modal.loading('加载中...');
        let remote_url = '/serv/account/insert';
        if (this.state.data.id) {
            remote_url = '/serv/account/update';
        }
        Fetch(remote_url,this.state.data,(res)=>{
            if (res.status) {
                this.modal.alert({
                    content:'编辑帐户信息成功!',
                    callback:()=>{
                        this.props.callback('save done');
                    }
                });
            } else {
                this.modal.alert('编辑帐户信息出错!'+res.msg);
            }
        },(e)=>{
            this.modal.alert('远程调用出错! '+e);
        })
    }

    changeHandler(name){
        return (val)=>{
            let data = this.state.data;
            data[name] = val;
            this.setState({
                data:data
            })
        };
    }

    render() {
        return (
            <div>
                <Input label='帐户名' placeholder='帐户名称,只能使用英文和数字' validate={{rule:/.+/,text:'帐户名称不能为空'}} data={this.state.data.account} onChange={this.changeHandler('account')}/>
                <Input label='用户姓名' placeholder='用户姓名' validate={{rule:/.+/,text:'用户姓名不能为空'}} data={this.state.data.user_name} onChange={this.changeHandler('user_name')}/>
                <Input label='密码' type='password' placeholder='帐户密码' summary='留空就不修改密码' data={this.state.data.password} onChange={this.changeHandler('password')}/>
                <div>
                    <Checkbox className='ml-1 text-danger' label='禁用' onChange={e=>{
                        let data = this.state.data;
                        data['disable'] = e.target.checked?1:0;
                        this.setState({
                            data:data
                        })
                    }} checked={this.state.data.disable}/>
                    <Button className='float-right' icon='save' onClick={()=>this.save()}>保存</Button>
                </div>
                <CKModal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

EditAccount.propTypes = {

};

EditAccount.defaultProps = {

};

export default EditAccount;