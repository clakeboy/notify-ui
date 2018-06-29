/**
 * Created by clakeboy on 2018/6/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Map extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props)
    }

    getClasses() {
        let base = 'ck-container';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>
                this is map component {this.props.data.name}
            </div>
        );
    }
}

Map.propTypes = {

};

Map.defaultProps = {

};

export default Map;