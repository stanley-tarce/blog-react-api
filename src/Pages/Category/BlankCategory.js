import React, { useContext, useEffect } from 'react';
import { CreateContext } from '../../ContextStore'
import { useNavigate } from 'react-router-dom'
import thinkinglogo from '../../assets/undraw_through_the_window_-51-ew.svg'

function BlankCategory() {
    const { data } = useContext(CreateContext)
    let { categories } = data
    const navigate = useNavigate()
    useEffect(() => {
        categories.length !== 0 ? navigate(`${categories[0].id}`) : navigate('')
    },
        [categories])
    return <div className='w-full h-full flex flex-col justify-center items-center gap-3'>
        <h1 className='text-[16px] font-medium'>Welcome to Journal!</h1>
        <img src={thinkinglogo} />
        <h1 className='text-[16px] font-medium'>Looks like you dont have any categories yet. Feel free to add one!</h1>
    </div>;
}

export default BlankCategory;
