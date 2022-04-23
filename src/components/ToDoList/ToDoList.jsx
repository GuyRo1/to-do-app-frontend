import './ToDoList.scss'
import List from '../List/List'
import AddTaskForm from '../AddTaskForm/AddTaskForm'
import { useContext, useMemo } from 'react'
import { ListContext } from '../../context/ListContext'
import { addTaskAction } from '../../actions/ListActions'

const ToDoList = () => {


    const { listData, listDataDispatch } = useContext(ListContext)

    const addTask = (task,taskId) => {
        listDataDispatch(addTaskAction(task,taskId))
    }

    const calcFinishedTasks = useMemo(() => listData.tasks.reduce((count, currentItem) => {
        if (currentItem.completed) {
            count++
        }
        return count
    }, 0)
        , [listData.tasks])

    const calcUnFinishedTasks = useMemo(() => listData.tasks.reduce((count, currentItem) => {
        if (!currentItem.completed) {
            count++
        }
        return count
    }, 0)
        ,
        [listData.tasks])

    return (
        <>
            <h1>To Do List 📋</h1>
            {!listData.isEmpty &&
                <div className="counter">
                    {`Finished tasks: ${calcFinishedTasks}, Unfinished tasks: ${calcUnFinishedTasks}`}
                </div>}
            <List data={listData} />
            <AddTaskForm addTask={addTask} />
        </>
    )

}

export default ToDoList;