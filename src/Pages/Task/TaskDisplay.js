import React, { useContext, useEffect } from 'react'
import { CreateContext } from '../../ContextStore'
import { useNavigate, useParams, useLocation } from 'react-router'
import { tasks_index, tasks_today } from '../../API/api'

function AllTasks() {
    const { data, showAllTask, headers, setData } = useContext(CreateContext)
    const location = useLocation()
    const { category_id } = useParams()
    const { tasks } = data
    const navigate = useNavigate()
    const fetchData = Promise.all([tasks_index(headers, category_id), tasks_today(headers, category_id)])
    useEffect(() => {
        fetchData.then(
            response => {
                const [tasks, todays_task] = response
                setData({
                    ...data,
                    tasks: { all: tasks.data, todays: todays_task.data }
                })
            }
        )
    }, [location.pathname])
    return (
        <div className='w-full h-full'>
            {tasks && showAllTask === true ? tasks?.all.length !== 0 ? tasks?.all.map(({ id, title, task_date }, index) => (
                <div key={index} className="w-full h-auto p-[10px] bg-main-blue rounded-md flex justify-between items-center" onClick={() => navigate(`${id}`)} >
                    <p className="w-auto font-roboto font-bold text-[20px]">{title}</p>
                    <p className="w-auto font-roboto font-bold text-[20px]">Task Date: {task_date}</p>
                </div>
            )) : <p>No Tasks</p> : tasks?.todays.length !== 0 ? tasks?.todays.map(({ id, title, task_date }, index) => (
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
