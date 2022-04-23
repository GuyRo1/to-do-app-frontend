import { createContext, useReducer, useEffect } from 'react'
import listReducer, { ListInitialState } from '../reducers/listReducer'
import MainLoader from '../components/MainLoader/MainLoader'
import { initiaLizeListAction, initializeFromServerAction } from '../actions/ListActions'
import { getTaskList } from './../api/api';

export const ListContext = createContext()

const ListContextProvider = (props) => {

    const [listData, listDataDispatch] = useReducer(listReducer, ListInitialState)

    useEffect(() => {

        const getListFromServer = async (signal) => {
            try {
                const list = await getTaskList(signal)
                listDataDispatch(initializeFromServerAction(list))
            } catch (err) {
                listDataDispatch(initiaLizeListAction())
            }
        }

        const controller = new AbortController()
        getListFromServer(controller.signal)
        return () => {
            controller.abort()
        }
    }, [listDataDispatch])


    return (
        <>
            <>
                {
                    listData.status !== 'pending' ?
                        <ListContext.Provider value={{ listData, listDataDispatch }}>
                            {props.children}
                        </ListContext.Provider> :
                        <MainLoader />
                }
            </>
        </>
    )
}

export default ListContextProvider