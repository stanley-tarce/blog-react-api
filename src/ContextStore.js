import React, { useState, createContext } from 'react'
export const CreateContext = createContext()
function ContextStore({ children }) {
    const [headers, setHeaders] = useState({})
    const [user, setUser] = useState({})
    const [data, setData] = useState({
        categories: [],
        tasks: { all: [], today: [] }
    })
    const [showAllTask, setShowAllTask] = useState(true)
    const [updateCategory, setUpdateCategory] = useState('')
    let context = {
        headers,
        user,
        data,
        updateCategory,
        showAllTask,

        setHeaders,
        setUser,
        setData,
        setUpdateCategory,
        setShowAllTask
    }

    return (
        <CreateContext.Provider value={context}>
            {children}
        </CreateContext.Provider>
    )
}

export default ContextStore
