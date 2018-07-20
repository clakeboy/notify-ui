/**
 * Created by clakeboy on 2018/6/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import '../assets/css/Left.less';
import TreeMenu from "./TreeMenu";

class LeftMenu extends React.PureComponent {
    constructor(props) {
        super(props);

        this.menu = [
            {
                key:'',
                text:'系统',
                step:true
            },
            {
                key:'system',
                text:'系统管理',
                icon:'cogs',
                children:[
                    {
                        key:'user_manage',
                        text:'后台用户管理',
                        icon:'home',
                        link:'/system/account'
                    },
                    // {
                    //     key:'menu_manage',
                    //     text:'后台菜单管理',
                    //     icon:'home',
                    //     link:'/system/menu'
                    // }
                ]
            },
            {
                key:'',
                text:'主菜单',
                step:true
            },
            {
                key:'index',
                text:'首页',
                icon:'home',
                link:'/'
            },
            {
                key:'notify',
                text:'通知任务管理',
                icon:'tasks',
                children:[
                    {
                        key:'task_manage',
                        text:'任务列表',
                        icon:'home',
                        link:'/task/manage'
                    },
                    {
                        key:'task_log',
                        text:'任务日志',
                        icon:'home',
                        link:'/task/log'
                    }
                ]
            }
        ];
    }

    menuClickHandler = (item)=>{
        let path = {
            pathname:item.link
        };
        this.context.router.history.replace(path);
    };

    componentDidMount() {

    }

    getClasses() {
        let base = 'ck-left-main';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <TreeMenu data={this.menu} onClick={this.menuClickHandler}/>
            </div>
        );
    }
}

LeftMenu.propTypes = {

};

LeftMenu.defaultProps = {

};

LeftMenu.contextTypes = {
    router: PropTypes.object
};

export default LeftMenu;