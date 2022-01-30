import React, { useContext, useEffect } from 'react'
import { CreateContext } from '../ContextStore'
import { categories_index, sign_out } from '../API/api'
import { Outlet, useNavigate, useLocation } from 'react-router'
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
        <div className="w-screen h-screen flex justify-start items-start  ">
            <div className="h-full w-[16%]  bg-white flex flex-col justify-start items-center gap-[30px]border-r-shadow border-r-2">
                <p className="w-full h-[50px] border-b-shadow border-b-2 flex justify-start px-3 items-center gap-1 text-[15px] ">Journal for: <b>{user.email.split('@')[0]}</b></p>

                <div className="w-full h-full flex flex-col justify-start items-center">
                    <p className="w-full h-[50px] flex justify-start items-center font-medium text-[15px] px-3 ">Categories</p>
                    <div className="w-[100%] grow flex flex-col justify-start items-center bg-white">
                        {categories.length !== 0 ? categories.map(({ id, name }, index) => (<div onClick={() => navigate(`${id}`)} className="w-full h-[50px] flex justify-start items-center cursor-pointer hover:text-white hover:bg-main-purple-light text-[14px] px-3" id={id} key={index}>{name}</div>)) : <p className='w-full h-[50px] flex justify-start items-center text-[14px] px-3'>No Data</p>}
                    </div>
                    <p onClick={() => navigate(`create`)} className="w-full h-[50px] flex justify-start items-center font-medium text-[15px] ml-[5px] overflow-hidden border-b-shadow border-b-2 px-3 cursor-pointer hover:text-main-purple-light">Add New Category</p>
                    <p onClick={() => logout()} className="w-full h-[50px] flex justify-start items-center  font-medium text-[15px] ml-[5px] overflow-hidden border-b-shadow border-b-2 px-3 cursor-pointer hover:text-main-purple-light">Logout</p>
                </div>

            </div>
            <div className="h-full w-[84%]">
                <Outlet />
            </div>
        </div>
    )
}

export default Main
