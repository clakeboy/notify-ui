/**
 * Created by clakeboy on 2017/12/3.
 */

import React from 'react';
import {GetComponent} from "../common/Funcs";
import Loader from '../components/Loader';
import {
    Container,
    Input,
    InputGroup,
    Button,
    Card,
    CCheckbox,
    Checkbox,
    Table,
    Pagination,
    Dropdown,
    Select,
    Calendar,
    Modal,
} from '@clake/react-bootstrap4';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("main mount");
    }

    render() {
        return (
            <div className='ck-container'>
                <Card title='Header'>
                    <Button onClick={()=>{
                        this.modal.view({
                            title:'添加优惠券',
                            content:<Loader loadPath='/modal/map' import={GetComponent} data={{'name':'Clake'}}/>
                        })
                    }}>打开MODAL</Button>
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Card title='Header'>
                    dfasdfasdfasd
                </Card>
                <Modal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

export default Main;