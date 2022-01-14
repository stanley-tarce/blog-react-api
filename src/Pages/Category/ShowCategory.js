import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams, Outlet, useLocation } from 'react-router-dom'
import { CreateContext } from '../../ContextStore'
import { categories_delete, tasks_index, tasks_today, } from '../../API/api'



function ShowCategory() {
    const { headers, data, setData } = useContext(CreateContext)
    const { category_id } = useParams()
    const location = useLocation()
    const mainCategoryButtons = [
        { name: 'Update Category', click: () => navigate('updatecategory') },
        {
            name: 'Delete Category', click: () => {
                categories_delete(headers, category_id).then(res => console.log(res))
                return navigate('/main')
            }
        }]
    const mainTaskButtons = [
        { name: 'Create Task', click: () => navigate(`taskcreate`) },
        { name: "Show Today's Task", click: () => !location.pathname.includes('today') ? navigate(`today`) : console.log("Already on Today") },
        { name: 'Show All Task', click: () => navigate(``) }
    ]
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
    let category = data.categories.filter(category => category.id === category_id)[0]
    return (
        <div className="w-full h-full" >
            <div className="w-full h-[50px] flex justify-between items-center px-3 border-b-shadow border-b-2 gap-1">
                <p className="w-auto h-auto  font-roboto font-bold text-[14px] mr-[60px]">{category && category.name}</p>
                <div className='w-auto h-[100%] flex gap-3'>
                    {mainCategoryButtons.map(({ name, click }, index) =>
                        <button key={index} onClick={click}
                            className="w-auto h-[100%] text-[14px] hover:text-main-purple-light cursor-pointer">
                            {name}</button>)}
                </div>


            </div>
            <div className="w-full h-[calc(100%-50px)] flex flex-col justify-start items-start">
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