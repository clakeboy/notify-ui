/**
 * Created by clakeboy on 2017/12/3.
 */

import React from 'react';
import {GetComponent} from "../common/Funcs";
import Loader from '../components/Loader';
import {
    Button,
    Card,
} from '@clake/react-bootstrap4';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.setTitle('首页');
    }

    render() {
        return (
            <div className='ck-container'>
                <Card title='Header'>

                </Card>
            </div>
        );
    }
}

export default Main;