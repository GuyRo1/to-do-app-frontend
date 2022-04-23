import { useEffect } from 'react'
import './List.scss'
import Task from '../Task/Task'

const List = (props) => {


   

    return (
        <div className="List-Container">
            {
                !props.data.isEmpty ?
                    <ul>
                        {
                            props.data.tasks.map((task, index) => (
                                <li key={task.id}>
                                    <Task index={index} data={task} />
                                </li>
                            ))
                        }
                    </ul> :
                    <h2>Your list is empty</h2>
            }
        </div >
    )
}

export default List

