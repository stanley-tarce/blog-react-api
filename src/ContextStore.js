import React, { useState, createContext } from 'react'
export const CreateContext = createContext()
function ContextStore({ children }) {
    const [headers, setHeaders] = useState({})
    const [user, setUser] = useState({})
    const [data, setData] = useState({
        categories: [],
        tasks: {}
    })
    let context = {
        headers,
        user,
        data,

        setHeaders,
        setUser,
        setData
    }
    return (
        <CreateContext.Provider value={context}>
            {children}
        </CreateContext.Provider>
    )
}

export default ContextStore
