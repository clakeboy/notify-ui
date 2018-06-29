/**
 * Created by clakeboy on 2018/6/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import '../assets/css/header.less';
import {
    Icon
} from '@clake/react-bootstrap4';
class Header extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

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
                    <div className='page-title'>
                        首页
                    </div>
                    <ul className="nav navbar-nav float-right user-nav">
                        <li className="nav-item dropdown">
                            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
                                <img src="http://img.tubaozhang.com/static/images/default_head.jpg" alt="Avatar"/>
                                <span className="user-name">管理员</span>
                            </a>
                            <div role="menu" className="dropdown-menu">
                                <div className="user-info">
                                    <div className="user-name">管理员</div>
                                </div>
                                <a href="#" className="dropdown-item">
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

export default Header;