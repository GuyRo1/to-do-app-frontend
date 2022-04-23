import axios from 'axios'

export const getTaskList = async (signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'get',
            url: `${apiUrl}/to-do`,
            signal,
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("no data")
        return response.data.toDoList
    } catch (err) {
        throw err
    }
}

export const createNewTask = async (task,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'put',
            url: `${apiUrl}/to-do`,
            signal,
            data:{
                task
            }
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("no course with this id")
        return response.data.id
    } catch (err) {
        throw err
    }
}

export const deleteTaskApi = async (id,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'delete',
            url: `${apiUrl}/to-do/${id}`,
            signal,
           
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("no course with this id")
        return true
    } catch (err) {
        throw err
    }
}

export const changeTaskStatus = async (status,id,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'patch',
            url: `${apiUrl}/to-do/${id}`,
            signal,
            data:{
                completed:status
            }
           
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("no course with this id")
        return true
    } catch (err) {
        throw err
    }
}