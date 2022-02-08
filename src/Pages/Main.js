import React, { useContext, useEffect } from 'react'
import { CreateContext } from '../ContextStore'
import { categories_index, sign_out } from '../API/api'
import { Outlet, useNavigate, useLocation } from 'react-router'
import drawlogo from '../assets/drawsvg.svg'
import inventory from '../assets/inventory.svg'
import logoutsvg from '../assets/settings_power.svg'
import CreateCategory from './Task/CreateTask'
function Main() {
    const { headers, setHeaders, user, setUser, data, setData } = useContext(CreateContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let timer = setTimeout(() => {
            categories_index(headers).then(response => {
                console.log(response.data)
                if (response.data.length !== 0) {
                    setData(data => ({ ...data, categories: [...response.data] }))
                    console.log(response.data)
                }

            })
        }, 1000)
        return () => { clearTimeout(timer) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const logout = () => {
        sign_out(headers).then(response => {
            console.log(response)
            setUser({})
            setData({ categories: [], tasks: {} })
            setHeaders({})

        })
        return navigate('/')
    }
    const { categories } = data

    return (
        <div className="w-screen h-screen flex justify-start items-start">
            <div className="h-full w-[16%] bg-white flex flex-col justify-start items-center gap-3 text-slate-800 ">
                <p className="w-[85%] h-[50px] font-bold bg-main-purple-xs border-[1px] border-purple-500 flex justify-start px-3 items-center gap-3 text-[14px] mt-[15px] rounded-md"><img src={drawlogo} alt="draw" />Journal</p>


                <div className="w-[85%] h-full flex flex-col justify-start items-center gap-3">
                    <p className='w-full h-[50px] flex justify-start items-center font-medium text-[15px] px-3 bg-main-purple-xs border-purple-500 border-[1px] rounded-md gap-3'><img src={inventory} alt="draw" />Categories</p>
                    <div className="w-[100%] grow flex flex-col justify-start items-end bg-white gap-3 ">
                        {categories.length !== 0 ? categories.map(({ id, name }, index) => (<div onClick={() => navigate(`${id}`)} className="w-[90%] h-[40px] flex justify-start items-center cursor-pointer  hover:bg-main-purple-xs border-purple-500 border-[1px] text-[14px] px-4 rounded-md" id={id} key={index}>{name}</div>)) : <p className='w-full h-[50px] flex justify-start items-center text-[14px] px-3'>No Data</p>}
                    </div>
                    <p onClick={() => navigate(`create`)} className="w-full h-[50px] flex justify-start items-center font-medium text-[15px] ml-[5px] border-[1px] border-purple-500     overflow-hidden px-3 cursor-pointer  bg-main-purple-xs rounded-md">Add New Category</p>
                    <p onClick={() => logout()} className='w-full h-[50px] flex justify-start items-center  font-medium text-[15px] ml-[5px] border-purple-500 border-[1px] px-3 cursor-pointer  bg-main-purple-xs rounded-md mb-3 gap-3'><img src={logoutsvg} />Logout</p>
                </div>

            </div>
            <div className="h-full w-[84%]">
                <Outlet />
            </div>
        </div>
    )
}

export default Main
