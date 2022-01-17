import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { categories_update } from '../../API/api'
import { CreateContext } from '../../ContextStore'
import toast from 'react-hot-toast'
function UpdateCategory() {

    const { category_id } = useParams()
    const navigate = useNavigate()
    const { headers, data } = useContext(CreateContext)
    const { categories } = data
    const categoryDetail = () => {
        var container = []
        for (let i = 0; i < categories.length; i++) {

            if (categories[i].id === category_id) {
                container = [...categories]
            }
        }
        return container
    }
    const [update, setUpdate] = useState(categoryDetail()[0].name)
    const createCategory = [
        { label: 'Name:', type: 'text', value: update },
    ]
    const submitCategory = (e) => {
        e.preventDefault()
        var data = { name: update }
        categories_update(headers, category_id, data).then(response => toast.success(response.data.message))

        return navigate(-1)
    }
    return (
        <div className="w-screen h-screen top-0 left-0 absolute z-10 flex justify-center items-center bg-main-modal-blur">
            <div className="w-[400px] h-[200px] bg-white px-[30px] py-[50px] gap-3 flex flex-col justify-center items-start">
                {createCategory.map(({ label, ...others }) => (
                    <div className="w-full h-auto flex flex-col gap-3">
                        <label className="text-[14px] w-auto h-auto">{label}</label>
                        <input onChange={(e) => setUpdate(e.target.value)} className="outline-none border-[1px] border-solid border-main-purple p-[10px] rounded-[5px]" {...others} />
                    </div>
                ))}
                <div className="w-full h-auto flex justify-start items-center gap-3">
                    <button onClick={(e) => submitCategory(e)} className="w-full h-[50px] bg-main-purple text-white text-[14px] font-bold px-2 rounded-[5px] hover:bg-purple-500">Update Category</button>
                    <button onClick={(e) => navigate(-1)} className="w-full h-[50px] bg-main-purple text-white text-[14px] font-bold px-2 rounded-[5px] hover:bg-purple-500">Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default UpdateCategory
