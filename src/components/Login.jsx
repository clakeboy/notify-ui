/**
 * Created by clakeboy on 2018/6/29.
 */
import React from 'react';
import classNames from 'classnames/bind';
import '../assets/css/Login.less';

import {
    Icon,
    Input,
    Button
} from '@clake/react-bootstrap4';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page_data:{}
        }
    }

    componentDidMount() {

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
        if (this.state.page_data['user_name'] === 'admin' &&
            this.state.page_data['password'] === '123123') {
            this.props.setLogin({
                'user_name':'admin',
                'level_name':'管理员',
            },true);
        }
    };

    getClasses() {
        let base = 'ck-login';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <div className="card ck-login-window">
                    <div className="card-header text-info text-center">
                        <Icon icon='envelope-open'/> 通知系统
                    </div>
                    <div className="card-body">
                        <Input placeholder='用户名' onChange={this.changeHandler('user_name')}/>
                        <Input placeholder='密码' type='password' onChange={this.changeHandler('password')}/>
                        <Button size='lg' block onClick={this.login}>确认登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {

};

Login.defaultProps = {

};

export default Login;