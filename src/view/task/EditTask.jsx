/**
 * Created by clakeboy on 2018/7/1.
 */
import React from 'react';
import {
    Icon,
    Input,
    Button,
    Select,
    TextArea,
    Checkbox
} from '@clake/react-bootstrap4';

class EditTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : {
                task_name:'',
                time_rule:'',
                once:false,
                notify_method:'GET',
                notify_url:'',
                notify_data:''
            }
        };

        this.methodList = [
            'GET',
            'POST',
            'JSON',
        ];
    }

    componentDidMount() {

    }

    changeHandler(name){
        return (val)=>{
            let data = this.state.data;
            data[name] = val;
            this.setState({
                data:data
            })
        };
    }

    save() {
        console.log(this.state.data)

    }

    render() {
        return (
            <div>
                <div className='form-row'>
                    <Input className='col-6' label='任务名称' data={this.state.data.task_name} onChange={this.changeHandler('task_name')}/>
                    <Input className='col-6' label='时间规则' data={this.state.data.time_rule} onChange={this.changeHandler('time_rule')} placeholder='* * * * * *'/>
                </div>
                <div className='form-row'>
                    <Select className='col-2' label='通知方法'
                            data={this.methodList}
                            onChange={e=>{
                                let data = this.state.data;
                                data['notify_method'] = e.target.value;
                                this.setState({
                                    data:data
                                })
                            }}
                            value={this.state.data.notify_method}/>
                    <Input className='col-10' label='通知地址' data={this.state.data.notify_url} onChange={this.changeHandler('notify_url')}/>
                </div>
                <TextArea label='通知数据' data={this.state.data.notify_data} onChange={this.changeHandler('notify_data')} rows={5}/>
                <div>
                    <Checkbox label='通知一次' onChange={e=>{
                        let data = this.state.data;
                        data['once'] = e.target.checked;
                        this.setState({
                            data:data
                        })
                    }} checked={this.state.data.once}/>
                    <Button className='float-right' icon='save' onClick={()=>this.save()}>保存</Button>
                </div>
            </div>
        );
    }
}

EditTask.propTypes = {

};

EditTask.defaultProps = {

};

export default EditTask;