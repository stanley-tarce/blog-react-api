import React, { useRef, useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { CreateContext } from '../../ContextStore'
import { tasks_create } from '../../API/api'



function CreateCategory() {
    const { headers } = useContext(CreateContext)
    const navigate = useNavigate()
    const { category_id } = useParams()
    const taskNameRef = useRef(null)
    const taskDescriptionRef = useRef(null)
    const taskDateRef = useRef(null)
    const createTask = [
        { label: 'Title:', type: 'text', placeholder: 'Title', ref: taskNameRef, },
        { label: 'Description:', type: 'text', placeholder: 'Description', ref: taskDescriptionRef, },
        { label: 'Task Date:', type: 'date', placeholder: 'Enter Date', ref: taskDateRef }
    ]
    const submitCategory = (e) => {
        e.preventDefault()
        var data = {
            title: taskNameRef.current.value,
            description: taskDescriptionRef.current.value,
            task_date: taskDateRef.current.value.toString()
        }
        tasks_create(headers, category_id, data).then(response => console.log(response))
        return navigate(-1)
    }
    return (
        <div className="w-screen h-screen top-0 left-0 absolute z-10 flex justify-center items-center bg-main-modal-blur">
            <div className="w-[auto] h-[auto] bg-main-purple-light px-[30px] py-[50px] gap-3 flex flex-col justify-center items-start">
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

export default CreateCategory
