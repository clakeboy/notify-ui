/**
 * Created by clakeboy on 2018/6/29.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Log extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.setTitle('任务日志');
    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>

            </div>
        );
    }
}

Log.propTypes = {

};

Log.defaultProps = {

};

export default Log;