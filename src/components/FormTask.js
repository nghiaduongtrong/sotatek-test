import React, { Component } from 'react';
import DateUtil from '../utils/DateUtil';

const dateUtil = new DateUtil();

class FormTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {
                id: '',
                name: '',
                description: '',
                dueDate: dateUtil.format(new Date(), 'yyyy-MM-dd'),
                piority: 'normal',
                isCompleted: false
            },
            isError: false
        }
    }

    defaultData = {
        id: '',
        name: '',
        description: '',
        dueDate: dateUtil.format(new Date(), 'yyyy-MM-dd'),
        piority: 'normal',
        isCompleted: false
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState({ task: this.props.data });
        }
    }

    onChangePiority = (evt) => {
        this.setState({
            task: {
                ...this.state.task,
                piority: evt.target.value
            }
        });
    }

    onChangeDueDate = (evt) => {
        if (this.validateDueDate(evt.target.value)) {
            this.setState({
                task: {
                    ...this.state.task,
                    dueDate: evt.target.value
                }
            });
        }
    }

    onChangeName = (evt) => {
        const value = evt.target.value;
        this.setState({
            task: {
                ...this.state.task,
                name: value
            }
        });
    }

    onChangeDescription = (evt) => {
        const value = evt.target.value;
        this.setState({
            task: {
                ...this.state.task,
                description: value
            }
        });
    }

    onBlurInputName = (evt) => {
        const value = evt.target.value.trim();
        this.setState({
            task: {
                ...this.state.task,
                name: value
            }
        });
    }

    validateDueDate = (selectedDate) => {
        let dueDate = new Date(selectedDate);
        let now = new Date();
        now.setHours(0, 0, 0, 0);

        return dueDate > now;
    }

    submitForm = () => {
        const { name } = this.state.task;

        if (name === '') {
            this.setState({ isError: true });
        } else if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit({ ...this.state.task });

            this.setState({ isError: false });

            if (this.props.isResetAffterSubmit) {
                this.resetData();
            }
        }
    }

    resetData = () => {
        this.setState({ task: this.defaultData, isError: false });
    }

    render() {
        const { name, dueDate, piority, description } = this.state.task;
        const { isError } = this.state;
        const { submitText } = this.props;
        return (
            <form>
                <div className="form-group">
                    <input className="form-control" placeholder="Add new task ..." required onChange={this.onChangeName} value={name} onBlur={this.onBlurInputName} />
                    {isError && <label className="label-error">Task title is a required field</label>}
                </div>
                <div className="form-group">
                    <label className="font-weight-bold mb-2">Description</label>
                    <textarea className="form-control" rows="5" value={description} onChange={this.onChangeDescription}></textarea>
                </div>
                <div className="form-inline row mb-3">
                    <div className="form-group mr-3 col">
                        <label className="font-weight-bold mb-2">Due Date</label>
                        <input type="date" className="form-control" onChange={this.onChangeDueDate} value={dueDate} />
                    </div>
                    <div className="form-group col">
                        <label className="font-weight-bold mb-2">Piority</label>
                        <select className="form-control" value={piority} onChange={this.onChangePiority}>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="hight">Hight</option>
                        </select>
                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-fluid" onClick={this.submitForm}>{submitText}</button>
            </form>
        );
    }
}

export default FormTask;