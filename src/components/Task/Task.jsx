import { useContext, useEffect, useState } from 'react'
import { ListContext } from '../../context/ListContext'
import { checkTask, unCheckTask, deleteTaskAction } from '../../actions/ListActions'
import './Task.scss'
import { deleteTaskApi } from './../../api/api';
import { changeTaskStatus } from '../../api/api';

const Task = (props) => {

    const { listData, listDataDispatch } = useContext(ListContext)
    const [taskToDelete, setTaskToDelete] = useState('')
    const [changeStatus, setChangeStatus] = useState(null)

    const chooseTaskClass = isChecked => isChecked ? "checked" : "unchecked"


    useEffect(() => {
        const changeStatusInDb = async (change, signal) => {
            try {
                await changeTaskStatus(change.status, change.id, signal)
                if(change.status){
                    listDataDispatch(checkTask(change.id))
                }else{
                    listDataDispatch(unCheckTask(change.id))
                }
            } catch (err) {

            }

        }
        const controller = new AbortController()
        if (!!changeStatus) {
            changeStatusInDb(changeStatus, controller.signal)
        }

        return () => {
            controller.abort()
        }
    }, [changeStatus])

    useEffect(() => {

        const deleteTaskFromDB = async (task, signal) => {
            try {
                await deleteTaskApi(task, signal)
                listDataDispatch(deleteTaskAction(task))
            } catch (err) {

            }

        }
        const controller = new AbortController()
        if (taskToDelete !== '') {
           
            deleteTaskFromDB(taskToDelete, controller.signal)
        }
        return () => {
            controller.abort()
        }
        
    }, [props, taskToDelete])

    const changeChecked = () => {
        if (props.data.completed) {
            setChangeStatus({
                id: props.data.id,
                status: false
            })
        } else {
            setChangeStatus({
                id: props.data.id,
                status: true
            })
        }
    }

    const deleteTask = (event) => {
        event.preventDefault()
        setTaskToDelete(props.data.id)
    }



    return (
        <div className="task-container">
            <form className="task-form">
                <input className="checkBox" type="checkbox" checked={props.data.completed} onChange={changeChecked}></input>
                <div className={chooseTaskClass(props.data.completed)}>{props.data.content}</div>
                <button onClick={deleteTask}>Delete</button>
            </form>
        </div>
    )


}

export default Task