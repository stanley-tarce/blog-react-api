import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams, Outlet, useLocation } from 'react-router-dom'
import { CreateContext } from '../../ContextStore'
import { categories_delete, tasks_index, tasks_today, categories_index } from '../../API/api'
import toast from 'react-hot-toast';




function ShowCategory() {
    const navigate = useNavigate()
    const { headers, data, setData, setUpdateCategory, setShowAllTask } = useContext(CreateContext)
    const { category_id } = useParams()
    const location = useLocation()
    const mainCategoryButtons = [
        {
            name: 'Update Category', click: () => {
                setUpdateCategory(data.categories.filter(category => category.id === category_id)[0].name)
                return navigate('update')
            }
        },
        {
            name: 'Delete Category', click: () => {
                categories_delete(headers, category_id).then(res => toast.success(res.data.message)).then(r => {
                    categories_index(headers).then(res => setData({ ...data, categories: res.data })).then(r => navigate('/main'))
                })
            },
        }]
    const mainTaskButtons = [
        { name: 'Create Task', click: () => navigate(`create`) },
        { name: "Show Today's Task", click: () => setShowAllTask(false) },
        { name: 'Show All Task', click: () => setShowAllTask(true) }
    ]


    let category = data.categories.filter(category => category.id === category_id)[0]
    return (
        <div className="w-full h-full bg-[#F8F9FA] flex flex-col justify-start items-center" >
            <div className="w-[95%] h-[50px] flex justify-between items-center px-3 gap-1 mt-2 border-[1px] border-purple-500  bg-main-purple-xs rounded-md ">
                <p className="w-auto h-auto font-roboto font-bold text-[14px] p-2 rounded-md ">{category?.name}</p>
                <div className='w-auto h-[100%] flex gap-3'>
                    {mainCategoryButtons.map(({ name, click }, index) =>
                        <button key={index} onClick={click}
                            className="w-auto h-[100%] text-[14px] hover:text-main-purple-light cursor-pointer">
                            {name}</button>)}
                </div>


            </div>
            <div className="w-[95%] h-[calc(95%-50px)] flex flex-col justify-start items-start mt-3 border-[1px] border-main-purple bg-main-purple-xs p-3 rounded-md">
                <div className="w-full h-[50px] flex justify-between items-center px-3">
                    <p className="w-auto h-full font-roboto font-bold text-[14px] flex justify-center items-center">Tasks</p>
                    <div className="w-auto h-full flex justify-center items-center gap-3">
                        {mainTaskButtons.map(({ name, click }, index) =>
                            <button key={index} onClick={click}
                                className="w-auto h-[100%] text-[14px] hover:text-main-purple-light cursor-pointer">
                                {name}</button>)}
                    </div>
                </div>
                <div className="w-full h-full grow-1 flex flex-col justify-start items-start gap-[10px]">
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default ShowCategory