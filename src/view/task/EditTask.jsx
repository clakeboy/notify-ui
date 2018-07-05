/**
 * Created by clakeboy on 2018/7/1.
 */
import React from 'react';
import {
    Input,
    Button,
    Select,
    TextArea,
    Checkbox,
    Modal,
} from '@clake/react-bootstrap4';
import Fetch from "../../common/Fetch";
import PropTypes from "prop-types";

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
        this.initEdit(this.props.taskId)
    }

    componentWillReceiveProps(nextProps) {
        this.initEdit(nextProps.taskId)
    }

    initEdit(task_id) {
        if (task_id) {
            this.loadTask(task_id);
        } else {
            this.setState({
                data : {
                    task_name:'',
                    time_rule:'',
                    once:false,
                    notify_method:'GET',
                    notify_url:'',
                    notify_data:'',
                    time_rule_sec:'0',
                    time_rule_min:'*',
                    time_rule_hor:'*',
                    time_rule_day:'*',
                    time_rule_mon:'*',
                    time_rule_wek:'*',
                }
            });
        }
    }

    loadTask(task_id) {
        this.modal.loading('加载中...');
        Fetch('/serv/task/find',{id:task_id},(res)=>{
            if (res.status) {
                let time_rule = res.data.time_rule.split(' ');
                res.data.time_rule_sec = time_rule[0];
                res.data.time_rule_min = time_rule[1];
                res.data.time_rule_hor = time_rule[2];
                res.data.time_rule_day = time_rule[3];
                res.data.time_rule_mon = time_rule[4];
                res.data.time_rule_wek = time_rule[5];
                this.setState({
                    data:res.data
                },()=>{
                    this.modal.close();
                })
            } else {
                this.modal.alert('获取任务信息失败!\n'+res.msg);
            }
        },(e)=>{
            this.modal.alert('远程调用出错! '+e);
        });
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
        console.log(this.state.data);
        let remote_url = '/serv/task/insert';
        if (this.state.data.id) {
            remote_url = '/serv/task/update';
        }

        let time_rule = [];
        time_rule.push(this.state.data.time_rule_sec);
        time_rule.push(this.state.data.time_rule_min);
        time_rule.push(this.state.data.time_rule_hor);
        time_rule.push(this.state.data.time_rule_day);
        time_rule.push(this.state.data.time_rule_mon);
        time_rule.push(this.state.data.time_rule_wek);
        this.state.data.time_rule = time_rule.join(" ");

        Fetch(remote_url,this.state.data,(res)=>{
            if (res.status) {
                this.modal.alert({
                    content:'编辑任务信息成功!',
                    callback:()=>{
                        this.props.callback('save done');
                    }
                });
            } else {
                this.modal.alert('编辑任务信息出错!'+res.msg);
            }
        },(e)=>{
            this.modal.alert('远程调用出错! '+e);
        })
    }

    render() {
        return (
            <div>
                <div className='form-row'>
                    <Input className='col-6' label='任务名称' data={this.state.data.task_name} onChange={this.changeHandler('task_name')}/>
                    <Input className='col-1' label='秒' data={this.state.data.time_rule_sec} onChange={this.changeHandler('time_rule_sec')} placeholder='秒'/>
                    <Input className='col-1' label='分' data={this.state.data.time_rule_min} onChange={this.changeHandler('time_rule_min')} placeholder='分'/>
                    <Input className='col-1' label='时' data={this.state.data.time_rule_hor} onChange={this.changeHandler('time_rule_hor')} placeholder='时'/>
                    <Input className='col-1' label='天' data={this.state.data.time_rule_day} onChange={this.changeHandler('time_rule_day')} placeholder='天'/>
                    <Input className='col-1' label='月' data={this.state.data.time_rule_mon} onChange={this.changeHandler('time_rule_mon')} placeholder='月'/>
                    <Input className='col-1' label='周天' data={this.state.data.time_rule_wek} onChange={this.changeHandler('time_rule_wek')} placeholder='周天'/>
                </div>
                <div className='form-row'>
                    <Select className='col-2' label='通知方法'
                            data={this.methodList}
                            onSelect={e=>{
                                console.log(e.target.value);
                                let data = this.state.data;
                                data['notify_method'] = e.target.value;
                                this.setState({
                                    data:data
                                })
                            }}
                            value={this.state.data.notify_method}/>
                    <Input className='col-10' label='通知地址' placeholder='URL 地址' data={this.state.data.notify_url} onChange={this.changeHandler('notify_url')}/>
                </div>
                <div className='form-group form-row'>
                    <Checkbox className='ml-1 mr-5' label='通知一次' onChange={e=>{
                        let data = this.state.data;
                        data['once'] = e.target.checked;
                        this.setState({
                            data:data
                        })
                    }} checked={this.state.data.once}/>
                    <Checkbox className='text-danger' label='禁用' onChange={e=>{
                        let data = this.state.data;
                        data['disable'] = e.target.checked;
                        this.setState({
                            data:data
                        })
                    }} checked={this.state.data.disable}/>
                </div>
                <TextArea label='通知数据 (JSON字符串)' data={this.state.data.notify_data} onChange={this.changeHandler('notify_data')} rows={5}/>
                <div>
                    <Button className='float-right' icon='save' onClick={()=>this.save()}>保存</Button>
                </div>
                <Modal ref={c=>this.modal=c}/>
            </div>
        );
    }
}

EditTask.propTypes = {

};

EditTask.defaultProps = {

};

EditTask.contextTypes = {
    router: PropTypes.object
};

export default EditTask;