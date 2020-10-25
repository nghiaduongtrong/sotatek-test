import React, { Component } from 'react';
import FormTask from './FormTask';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false
        }
    }

    onClickDetailButton = () => {
        this.setState({ isShowDetail: !this.state.isShowDetail });
    }

    onClickRemoveButton = () => {
        const task = this.props.data;
        if (typeof this.props.removeTask === 'function') {
            this.props.removeTask(task.id);
        }
    }

    onToggleCheckbox = () => {
        const task = this.props.data;
        if (typeof this.props.toggleIsCompletedTask === 'function') {
            this.props.toggleIsCompletedTask(task.id, !task.isCompleted);
        }
    }

    updateTask = (task) => {
        if (typeof this.props.updateTask === 'function') {
            this.props.updateTask(task);
        }
    }

    render() {
        const { isShowDetail } = this.state;
        const { data } = this.props;
        let detailClasses = ['todo-detail'];
        if (isShowDetail) {
            detailClasses.push('show');
        }
        return (
            <div className="mb-3 card">
                <div className="d-flex align-items-center">
                    <div className="col">
                        <label className="font-size-medium">
                            <input type="checkbox" onChange={this.onToggleCheckbox} checked={data.isCompleted}/>
                                {data.name}
                            </label>
                    </div>
                    <button type="button" className="btn btn-sm btn-info mr-3" onClick={this.onClickDetailButton}>Detail</button>
                    <button type="button" className="btn btn-sm btn-remove" onClick={this.onClickRemoveButton}>Remove</button>
                </div>
                <div className={detailClasses.join(' ')}>
                    <hr />
                    <FormTask 
                        data={data} 
                        onSubmit={this.updateTask}
                        submitText="Update"/>
                </div>
            </div>
        );
    }
}

export default Task;