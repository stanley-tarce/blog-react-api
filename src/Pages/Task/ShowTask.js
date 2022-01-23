import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { CreateContext } from '../../ContextStore'
import { tasks_delete, tasks_show, tasks_update } from '../../API/api'




function ShowTask() {
    const location = useLocation()
    const { headers } = useContext(CreateContext)
    const navigate = useNavigate()
    const { category_id, task_id } = useParams()
    const [updateTask, setUpdateTask] = useState({
        title: '',
        description: '',
        task_date: '',
    })
    useEffect(() => { //Fetching data from API TASKS SHOW
        tasks_show(headers, category_id, task_id).then(res => {
            console.log(res)
            setUpdateTask({ title: res.data.title, description: res.data.description, task_date: res.data.task_date })
        })
    }, [location.pathname])

    const taskButtons = [
        { name: 'Update Task', onClick: () => setDisabled(!disabled) },
        { name: 'Delete Task', onClick: () => deleteTask() },
    ]
    const [disabled, setDisabled] = useState(true)
    const createTask = [
        { label: 'Title:', type: 'text', placeholder: 'Title', disabled: disabled, value: updateTask.title, onChange: (e) => setUpdateTask({ ...updateTask, title: e.target.value }) },
        { label: 'Description:', type: 'text', placeholder: 'Description', disabled: disabled, value: updateTask.description, onChange: (e) => setUpdateTask({ ...updateTask, description: e.target.value }) },
        { label: 'Task Date:', type: 'date', placeholder: 'Enter Date', disabled: disabled, value: updateTask.task_date, onChange: (e) => setUpdateTask({ ...updateTask, task_date: e.target.value }) },
    ]
    const deleteTask = () => {
        tasks_delete(headers, category_id, task_id).then(res => console.log(res))
        return navigate(-1)
    }
    const submitCategory = (e) => {
        e.preventDefault()
        var data = {
            ...updateTask
        }
        tasks_update(headers, category_id, task_id, data).then(response => console.log(response))
        return navigate(-1)
    }
    return (
        <div className="w-screen h-screen top-0 left-0 absolute z-10 flex justify-center items-center bg-main-modal-blur">
            <div className="w-[auto] h-[auto] bg-main-purple-light px-[30px] py-[50px] gap-3 flex flex-col justify-center items-start">
                <div className="w-full h-auto flex justify-between items-center">
                    {taskButtons.map(({ name, ...others }, index) => (
                        <button key={index} className="w-full h-[50px] bg-main-purple text-white text-center text-[18px] font-bold px-2 rounded-[5px] hover:bg-purple-500" {...others}>{name}</button>
                    ))}
                </div>
                {createTask.map(({ label, ...others }) => (
                    <div className="w-full h-auto flex flex-col gap-3">
                        <label className="text-[18px] w-auto h-auto">{label}</label>
                        <input className="outline-none border-[1px] border-solid border-main-purple p-[10px] rounded-[5px]" {...others} />
                    </div>
                ))}
                <button onClick={(e) => submitCategory(e)} className="w-full h-[50px] bg-main-purple text-white text-[18px] font-bold px-2 rounded-[5px] hover:bg-purple-500">Create Task</button>
                <button onClick={(e) => navigate(-1)} className="w-full h-[50px] bg-main-purple text-white text-[18px] font-bold px-2 rounded-[5px] hover:bg-purple-500">Cancel</button>
            </div>
        </div>
    )
}

export default ShowTask
