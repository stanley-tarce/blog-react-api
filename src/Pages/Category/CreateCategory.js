import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router'
import { categories_create, categories_index } from '../../API/api'
import { CreateContext } from '../../ContextStore'
import toast from 'react-hot-toast'
function CreateCategory() {
    const categoryNameRef = useRef()
    const navigate = useNavigate()
    const { headers, setData, data } = useContext(CreateContext)
    const createCategory = [
        { label: 'Name:', type: 'text', placeholder: 'Science', ref: categoryNameRef, },
    ]
    const submitCategory = (e) => {
        e.preventDefault()
        var data = { name: categoryNameRef.current.value }
        categories_create(headers, data).then(re => {
            toast.success("Category created successfully")
            categories_index(headers).then(response => {
                setData({ ...data, categories: response.data })
            }).then(response => navigate('/main'))
        })
    }

    return (
        <div className="w-screen h-screen top-0 left-0 absolute z-10 flex justify-center items-center bg-main-modal-blur">
            <div className="w-[400px] h-[200px]  rounded-md bg-white p-10 gap-3 flex flex-col justify-center items-start">
                {createCategory.map(({ label, ...others }) => (
                    <div className="w-full h-auto flex flex-col gap-3 text-[14px]">
                        <label className="text-[14px] w-auto h-auto">{label}</label>
                        <input className="outline-none border-[1px] border-solid border-main-purple p-[10px] rounded-[5px]" {...others} />
                    </div>
                ))}
                <div className="w-full h-auto flex justify-start items-center gap-3">
                    <button onClick={(e) => submitCategory(e)} className="w-full h-[50px] bg-main-purple text-white px-2 rounded-[5px] hover:bg-purple-500">Create Category</button>
                    <button onClick={(e) => navigate(-1)} className="w-full h-[50px] bg-main-purple text-white text-[14px]  px-2 rounded-[5px] hover:bg-purple-500">Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default CreateCategory
