/**
 * Created by clakeboy on 2018/6/29.
 */
import React from 'react';

import '../assets/css/Login.less';

import {
    Icon,
    Input,
    Button,
    Checkbox,
    Modal,
    Load
} from '@clake/react-bootstrap4';
import Fetch from "../common/Fetch";
import Storage from "../common/Storage";

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page_data:{
                user_name:'',
                password:'',
                remember:false
            },
            init:false
        };

        let login_name = Storage.get('login_name');
        if (login_name) {
            this.state.page_data.user_name = login_name;
            this.state.page_data.remember = true;
        }
    }

    componentWillMount() {
        this.checkLogin()
    }

    componentDidMount() {

    }

    checkLogin() {
        Fetch('/serv/login/auth',{},(res)=>{
            if (res.status) {
                this.setLogin(res.data)
            } else {
                this.setState({
                    init:true
                })
            }
        },(e)=>{

        })
    }

    setLogin(user) {
        this.props.setLogin(user,true);
    }

    changeHandler(name){
        return (val)=>{
            let data = this.state.page_data;
            data[name] = val;
            this.setState({
                page_data:data
            })
        };
    }

    login = () => {
        if (this.state.page_data.remember) {
            Storage.set('login_name',this.state.page_data.user_name);
        } else {
            Storage.remove('login_name');
        }
        this.modal.loading('正在登录中...');
        Fetch('/serv/login/sign',{
            account:this.state.page_data.user_name,
            password:this.state.page_data.password
        },(res)=>{
            if (res.status) {
                this.modal.close();
                this.setLogin(res.data)
            } else {
                this.modal.alert(res.msg);
            }
        },(e)=>{
            this.modal.alert('远程调用错误! '+e);
        })
    };

    render() {
        if (!this.state.init) {
            return this.renderLoad()
        }
        return this.renderLogin()
    }

    renderLoad() {
        return (
            <div className='text-center text-danger mt-5 mb-5'>
                <Load>加载中</Load>
            </div>
        )
    }

    renderLogin() {
        return (
            <div className='ck-login'>
                <div className="card ck-login-window">
                    <div className="card-header text-info text-center">
                        <Icon icon='envelope-open'/> 通知系统
                    </div>
                    <div className="card-body">
                        <Input placeholder='用户名' data={this.state.page_data.user_name} onChange={this.changeHandler('user_name')}/>
                        <Input placeholder='密码' type='password' data={this.state.page_data.password} onChange={this.changeHandler('password')}/>
                        <Checkbox label='记住用户名' onChange={e=>{
                            let data = this.state.page_data;
                            data['remember'] = e.target.checked;
                            this.setState({
                                page_data:data
                            })
                        }} checked={this.state.page_data.remember}/>
                        <Button size='lg' block onClick={this.login}>确认登录</Button>
                    </div>
                </div>
                <Modal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

Login.propTypes = {

};

Login.defaultProps = {

};

export default Login;