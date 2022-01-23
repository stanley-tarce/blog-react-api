import React, { useContext } from 'react'
import { CreateContext } from '../../ContextStore'
import { useNavigate } from 'react-router'

function AllTasks() {
    const { data, showAllTask } = useContext(CreateContext)
    const { tasks } = data
    const navigate = useNavigate()
    return (
        <div className='w-full h-full'>
            {tasks && showAllTask === true ? tasks.all.length !== 0 ? tasks.all.map(({ id, title, task_date }, index) => (
                <div key={index} className="w-full h-auto p-[10px] bg-main-blue rounded-md flex justify-between items-center" onClick={() => navigate(`${id}`)} >
                    <p className="w-auto font-roboto font-bold text-[20px]">{title}</p>
                    <p className="w-auto font-roboto font-bold text-[20px]">Task Date: {task_date}</p>
                </div>
            )) : <p>No Tasks</p> : tasks.todays.length !== 0 ? tasks.todays.map(({ id, title, task_date }, index) => (
                <div key={index} className="w-full h-auto p-[10px] bg-main-blue rounded-md flex justify-between items-center" onClick={() => navigate(`${id}`)} >
                    <p className="w-auto font-roboto font-bold text-[20px]">{title}</p>
                    <p className="w-auto font-roboto font-bold text-[20px]">Task Date: {task_date}</p>
                </div>
            )) : <p> No tasks</p>
            }
        </div>
    )
}

export default AllTasks
