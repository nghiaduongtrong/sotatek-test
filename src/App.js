import React, { Component } from 'react';
import FormTask from './components/FormTask';
import Task from './components/Task';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            taskSearched: [],
            isShowBulkAction: false,
            keySearch: ''
        }
    }

    addNewTask = (task) => {
        let taskListData = [...this.state.taskList];
        task.id = uuidv4();
        taskListData.push(task);

        this.setState({ taskList: taskListData });
    }

    removeTask = (taskId) => {
        const taskListData = [...this.state.taskList];
        for (const [index, task] of taskListData.entries()) {
            if (task.id === taskId) {
                taskListData.splice(index, 1);
            }
        }

        this.setState({ taskList: taskListData });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.taskList !== prevState.taskList) {
            const taskListData = this.state.taskList;
            let isShowBulkAction = false;
            for (let i = 0; i < taskListData.length; i++) {
                if (taskListData[i].isCompleted) {
                    isShowBulkAction = true;
                    break;
                }
            }

            let taskSearched = this.searchTask(this.state.keySearch);
            taskSearched = this.sortTask(taskSearched); 

            this.setState({ isShowBulkAction, taskSearched });
        }
    }

    toggleIsCompletedTask = (taskId, value) => {
        const taskListData = [...this.state.taskList];
        for (const task of taskListData) {
            if (task.id === taskId) {
                task.isCompleted = value;
            }
        }

        this.setState({ taskList: taskListData });
    }

    updateTask = (taskUpdate) => {
        let taskListData = [...this.state.taskList];
        for (const [index, task] of taskListData.entries()) {
            if (task.id === taskUpdate.id) {
                taskListData[index] = taskUpdate;
            }
        }

        this.setState({ taskList: taskListData });
    }

    removeTaskCompleted = () => {
        const taskListData = this.state.taskList.filter(task => task.isCompleted === false);
        this.setState({ taskList: taskListData });
    }

    onChangeSearchTask = (evt) => {
        const keyword = evt.target.value;
        let taskSearched = this.searchTask(keyword);
        taskSearched = this.sortTask(taskSearched); 

        this.setState({ taskSearched: taskSearched, keySearch: keyword });
    }

    searchTask = (keyword) => {
        const taskSearched = this.state.taskList.filter(task => task.name.includes(keyword));
        return taskSearched;
    }

    sortTask = (arr) => {
        arr.sort((a, b) => {
            const dueDateA = new Date(a.dueDate);
            const dueDateB = new Date(b.dueDate);

            if (dueDateA > dueDateB) {
                return 1;
            }
            if (dueDateA < dueDateB) {
                return -1;
            }
            return 0;
        });

        return arr;
    }

    render() {
        const { taskSearched, isShowBulkAction } = this.state;
        return (
            <div className="row">
                <div className="col">
                    <h3 className="text-center">New Task</h3>
                    <FormTask
                        onSubmit={this.addNewTask}
                        submitText="Add"
                        isResetAffterSubmit={true} />
                </div>
                <hr className="mr-3 ml-3" />
                <div className="col">
                    <h3 className="text-center">To Do List</h3>
                    <div className="form-group">
                        <input className="form-control" placeholder="Search ..." onChange={this.onChangeSearchTask} />
                    </div>

                    {taskSearched.map((task, index) => (
                        <Task
                            key={uuidv4()}
                            data={task}
                            removeTask={this.removeTask}
                            toggleIsCompletedTask={this.toggleIsCompletedTask}
                            updateTask={this.updateTask} />
                    ))}

                    <hr />
                    {isShowBulkAction && <div className="row align-items-center action-container">
                        <div className="col">Bulk Action:</div>
                        <button type="button" className="btn btn-info mr-3">Done</button>
                        <button type="button" className="btn btn-remove" onClick={this.removeTaskCompleted}>Remove</button>
                    </div>}

                </div>
            </div>
        );
    }
}

export default App;