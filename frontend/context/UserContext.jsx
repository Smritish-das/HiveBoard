import {createContext, useState, } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

function UserProvider ({children}){
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('token')
        if(!saved || saved === 'undefined') return null
        try{
            return JSON.parse(saved)
        }catch{
            return null
        }
    })
    const [token, setToken] = useState(null)

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem('token');
        navigate('/login')
    }

    return(
        <UserContext.Provider value = { {user, setUser, token, setToken, logout}}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider}