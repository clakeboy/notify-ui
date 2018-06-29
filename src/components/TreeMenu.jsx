/**
 * Created by clakeboy on 2018/6/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import '../assets/css/TreeMenu.less';
import {
    Icon
} from '@clake/react-bootstrap4';
import $ from 'jquery';

class TreeMenu extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'ck-tree-menu';

        return classNames(base,this.props.className);
    }

    openHandler = (e)=>{
        e.currentTarget.classList.toggle('open');
        // e.currentTarget.parentNode.querySelector('.sub-menu').classList.toggle('show');
        $(e.currentTarget.parentNode.querySelector('.sub-menu')).slideToggle(200);
    };

    render() {
        return (
            <div className={this.getClasses()}>
                <ul className='ck-tree-menu-elm'>
                    <li className='divider'>主页面</li>
                    <li className='active'>
                        <a href='#'>
                            <Icon className='icon' icon='home'/>
                            <span>首页</span>
                        </a>
                    </li>
                    <li className='parent'>
                        <a href='#' onClick={this.openHandler}>
                            <Icon className='icon' icon='address-card'/>
                            <span>这是个连接</span>
                        </a>
                        <ul className="sub-menu">
                            <li><a href="#">Flot</a>
                            </li>
                            <li><a href="#">中文大小</a>
                            </li>
                            <li><a href="#">Chart.js</a>
                            </li>
                            <li><a href="#">Morris.js</a>
                            </li>
                        </ul>
                    </li>
                    <li className='parent'>
                        <a href='#' onClick={this.openHandler}>
                            <Icon className='icon' icon='address-card'/>
                            <span>这是个连接2</span>
                        </a>
                        <ul className="sub-menu">
                            <li><a href="#">Flot</a>
                            </li>
                            <li><a href="#">Sparklines</a>
                            </li>
                            <li><a href="#">Chart.js</a>
                            </li>
                            <li><a href="#">Morris.js</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

TreeMenu.propTypes = {

};

TreeMenu.defaultProps = {

};

export default TreeMenu;