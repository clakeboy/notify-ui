/**
 * Created by clakeboy on 2017/12/3.
 */
import React from 'react';
import {GetComponent,GetQuery} from "../common/Funcs";
import Loader from './Loader';
import '../assets/css/main.less';
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Login from "./Login";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login:false,
            title:'',
        };
        // this.user = {
        //     account:'Clake',
        //     user_name:'管理员'
        // }
    }

    componentDidMount() {

    }

    setLogin = (user,is_login) => {
        this.user = user;
        this.setState({
            login:is_login
        });
    };

    setTitle = (title)=>{
        this.setState({
            title:title
        });
        document.title = title + ' - 通知系统';
    };

    render() {
        if (!this.state.login) {
            return <Login setLogin={this.setLogin}/>
        }
        return (
            <div className='ck-main'>
                <Header setLogin={this.setLogin} title={this.state.title} user={this.user}/>
                <div className='ck-left'>
                    <LeftMenu/>
                </div>
                <div className='ck-content'>
                    <div className='ck-content-router'>
                        <Loader loadPath={this.props.location.pathname} query={GetQuery(this.props.location.search)} import={GetComponent} setTitle={this.setTitle} user={this.user} {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}