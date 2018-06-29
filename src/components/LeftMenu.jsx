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
    }

    componentDidMount() {

    }

    getClasses() {
        let base = 'ck-left-main';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                <TreeMenu/>
            </div>
        );
    }
}

LeftMenu.propTypes = {

};

LeftMenu.defaultProps = {

};

export default LeftMenu;