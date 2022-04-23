

export const deleteTask = (list, taskId) => {
    const taskList = [...list]
    return taskList.filter(task => task.id !== taskId)
}

export const createTask = (content,id) => ({
    id,
    content,
    completed: false
})

export const changeTaskStatus = (list, taskId, status) => {
    const taskList = [...list]
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].completed = status
        }
    }
        return taskList
}
