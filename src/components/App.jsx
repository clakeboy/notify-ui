/**
 * Created by clakeboy on 2017/12/3.
 */
import React from 'react';
import {GetComponent} from "../common/Funcs";
import Loader from './Loader';
import '../assets/css/main.less';
import Header from "./Header";
import LeftMenu from "./LeftMenu";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='ck-main'>
                <Header/>
                <div className='ck-left'>
                    <LeftMenu/>
                </div>
                <div className='ck-content'>
                    <div className='ck-content-router'>
                        <Loader loadPath={this.props.location.pathname} import={GetComponent} {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}