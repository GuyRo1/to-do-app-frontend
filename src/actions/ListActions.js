export const addTaskAction = (content, id) => ({
    type: 'ADD_TASK',
    payload: {
        content,
        id
    }
})

export const deleteTaskAction = (taskId) => ({
    type: 'DELETE_TASK',
    payload: {
        taskId
    }
})

export const checkTask = (taskId) => ({
    type: 'CHECK_TASK',
    payload: {
        taskId
    }
})

export const unCheckTask = (taskId) => ({
    type: 'UNCHECK_TASK',
    payload: {
        taskId
    }
})

export const initiaLizeListAction = () => ({
    type: 'INITIALIZE',
    payload: {
        status: "active",
        isEmpty: true,
        tasks: []
    }
})

export const initializeFromServerAction = (list) => ({
    type: 'INITIALIZE_FROM_SERVER',
    payload: {
        list
    }
})
