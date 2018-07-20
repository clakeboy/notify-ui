/**
 * Created by clakeboy on 2018/6/28.
 */
import React from 'react';
import classNames from 'classnames/bind';
import '../assets/css/header.less';
import {
    Icon
} from '@clake/react-bootstrap4';
import Fetch from "../common/Fetch";
import PropTypes from "prop-types";
import LeftMenu from "./LeftMenu";
class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            back:false
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProp) {
        if (this.state.title !== nextProp.title) {
            let is_back = false;
            if (this.context.router.history.action === 'PUSH') {
                is_back = true;
            }
            this.setState({
                title: nextProp.title,
                back:is_back
            });
        }
    }

    logout = () => {
        Fetch('/serv/login/logout',{},(res)=>{
             if (res) {
                 this.props.setLogin(null,false);
             }
        });
    };

    getClasses() {
        let base = 'navbar navbar-expand fixed-top ck-top-header';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <nav className={this.getClasses()}>
                <div className='ck-header-left'>
                    <div className='page-title text-info'>
                        <Icon className='icon' icon='envelope-open'/>
                        通知系统
                    </div>
                </div>
                <div className='ck-header-right'>
                    {this.state.back?<div onClick={()=>{
                        this.context.router.history.goBack();
                    }} className='page-title back'>
                        <Icon icon='angle-left'/>
                        </div>:null}
                    <div className='page-title'>
                        {this.state.title}
                    </div>
                    <ul className="nav navbar-nav float-right user-nav">
                        <li className="nav-item dropdown">
                            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
                                <img src="http://img.tubaozhang.com/static/images/head/head_64_11.png" alt="Avatar"/>
                                <span className="user-name">{this.props.user.account}</span>
                            </a>
                            <div role="menu" className="dropdown-menu">
                                <div className="user-info">
                                    <div className="user-name">{this.props.user.account}</div>
                                    <div className="user-level">{this.props.user.user_name}</div>
                                </div>
                                <a href="#" className="dropdown-item" onClick={this.logout}>
                                    <Icon icon='power-off'/> 退出登录</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {

};

Header.defaultProps = {

};

Header.contextTypes = {
    router: PropTypes.object
};
export default Header;