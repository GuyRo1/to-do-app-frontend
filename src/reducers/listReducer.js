import { changeTaskStatus, createTask, deleteTask } from '../utils/tasksOperations'

export const ListInitialState = { status: "pending" }

const ListReducer = (listData, action) => {

    switch (action.type) {
        case 'ADD_TASK': {
            const tasks = [...listData.tasks]
            tasks.push(createTask(action.payload.content,action.payload.id))
            return { status: listData.status, isEmpty: false, tasks: [...tasks] }
        }

        case 'DELETE_TASK': {
            const changedTasks = [...deleteTask(listData.tasks, action.payload.taskId)]
            return { status: listData.status, isEmpty: changedTasks.length === 0, tasks: changedTasks }
        }

        case 'CHECK_TASK': {
            const tasks = [...listData.tasks]
            const changedTasks = [...changeTaskStatus([...tasks], action.payload.taskId, true)]
            return { status: listData.status, isEmpty: listData.isEmpty, tasks: changedTasks }
        }

        case 'UNCHECK_TASK': {
            const tasks = [...listData.tasks]
            const changedTasks = [...changeTaskStatus([...tasks], action.payload.taskId, false)]
            return { status: listData.status, isEmpty: listData.isEmpty, tasks: changedTasks }
        }
        case 'INITIALIZE': {
            return action.payload
        }
        case 'INITIALIZE_FROM_SERVER': {
            return {
                status:"active",
                isEmpty: action.payload.list.length === 0 ? true : false,
                tasks: [...action.payload.list]
            }
        }

        default:
            return { isEmpty: listData.isEmpty, tasks: [...listData.tasks] }
    }
}

export default ListReducer