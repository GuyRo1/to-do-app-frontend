import './AddTaskForm.scss'
import { useState, useEffect } from 'react'
import { createNewTask } from '../../api/api'

const AddTaskForm = (props) => {

    const [taskInput, setTaskInput] = useState('')
    const [taskToCreate, setTaskToCreate] = useState('')
    const controller = new AbortController()

    useEffect(() => {
        return () => {
            controller.abort()
        }
    }, [])

    useEffect(() => {

    }, [])

    useEffect(() => {

        const saveTaskToDB = async (task, signal) => {
            const newTaskId = await createNewTask(task, signal)
            props.addTask(task, newTaskId)
            setTaskToCreate('')
        }

        if (taskToCreate !== '') {
            const controller = new AbortController()
            saveTaskToDB(taskToCreate, controller.signal)
        }

        return () => {
            controller.abort()
        }
    }, [taskToCreate])

    const onSubmit = (event) => {
        event.preventDefault()
        setTaskToCreate(taskInput)
        setTaskInput('')
    }



    return (
        <div className="add-task-container">
            <form className="add-task-form">
                <input value={taskInput} type="text" onChange={(event) => {
                    setTaskInput(event.target.value)
                }}
                ></input>
                <button type="submit" disabled={(() => taskInput === "")()} onClick={onSubmit}>Add task</button>
            </form>
        </div>
    )
}

export default AddTaskForm