import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ToDoEmpty from './ToDoEmpty';
import ToDoLength from './ToDoLength';
import ToDoMax from './ToDoMax';

export default function ToDo() {
    const [show, setShow] = useState(false);
    const [length, setLength] = useState(false);
    const [max, setMax] = useState(false);
    const [disableHandler, setDisableHandler] = useState(false);
    const [draggedItemIndex, setDraggedItemIndex] = useState(-1);
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);

    function addTask() {
        if (taskInput.length > 0 && taskInput.length < 50) {
            console.log('Task Added:', taskInput);
            setTasks([...tasks, taskInput]);
            setTaskInput('');
        } else if (taskInput.length >= 50) {
            setTaskInput('');
            return setLength(true);
        } else if (taskInput.length === 0) {
            return setShow(true);
        }
    }

    function handleInputChange(e) {
        setTaskInput(e.target.value);
    }

    function deleteTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    useEffect(() => {
        if (tasks.length >= 10) {
            setMax(true);
            setDisableHandler(true);
        } else {
            setMax(false);
            setDisableHandler(false);
        }
    }, [tasks]);

    function handleDragStart(e, index) {
        e.dataTransfer.setData('text/plain', index.toString());
        e.currentTarget.classList.add('dragged');

        setDraggedItemIndex(index);

    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
    }

    function handleDrop(e, newIndex) {
        const oldIndex = e.dataTransfer.getData('text/plain');
        const updatedTasks = [...tasks];
        const [draggedItem] = updatedTasks.splice(oldIndex, 1);
        updatedTasks.splice(newIndex, 0, draggedItem);
        setTasks(updatedTasks);
        setDraggedItemIndex(-1);

    }

    function handleDragEnd() {
        setDraggedItemIndex(-1);
    }

    return (
        <div className='todo_app'>
            <ToDoEmpty show={show} setShow={setShow} />
            <ToDoLength length={length} setLength={setLength} />
            <ToDoMax max={max} setMax={setMax} />
            <div className="ToDo_position">
                <h1 className="text-center">Able To Do</h1>
                <br />
                <br />
                <div className="ToDo_div">
                    <input
                        type="text"
                        name="Task"
                        placeholder="Write your task here"
                        value={taskInput}
                        onChange={handleInputChange}
                        disabled={disableHandler}
                    />
                    <Button className="ToDo_btn" onClick={addTask} disabled={disableHandler}>
                        Add Task _<i className="bi bi-pencil"></i>
                    </Button>
                </div>
            </div>
            <br />
            <div className="todoListContainer">
                <ul className="no-bullets">
                    {tasks.length > 0 &&
                        tasks.map((task, index) => (
                            <div
                                className={`ToDo_div ${index === draggedItemIndex ? 'dragged' : ''}`}
                                key={index}
                                draggable
                                data-index={index}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                            >
                                <li key={index} className="ToDo_li">
                                    <div>
                                        <b>{task}</b>
                                    </div>
                                    <div>
                                        <i className="bi bi-x-square" onClick={() => deleteTask(index)}></i>
                                    </div>
                                </li>
                            </div>
                        ))}
                </ul>
            </div>
        </div>
    );
}