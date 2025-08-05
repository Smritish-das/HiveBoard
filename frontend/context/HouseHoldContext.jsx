import { useState,useEffect } from 'react'
import { createContext } from 'react'


const HouseholdContext = createContext()

function HousholdProvider({ children }){
    const [currentHousehold, setCurrentHousehold] = useState(() => {
        const saved = localStorage.getItem('household')
        if (!saved || saved === "undefined") return null
        try {
            return JSON.parse(saved)
        } catch {
            return null
        }
    })
    const [households, setHouseholds] = useState([])
    const [task, setTask] = useState(() => {
        const saved = localStorage.getItem('tasks')
        if (!saved || saved === "undefined") return null
        try {
            return JSON.parse(saved)
        } catch {
            return{ todo: [], inProgress: [], done: [] };
        }
    })
    const [note, setNote] = useState(() => {
        const saved = localStorage.getItem('notes')
        if (!saved || saved === "undefined") return []
        try {
            return JSON.parse(saved)
        } catch {
            return []
        }
    })
    const [grocery, setGrocery] = useState(() => {
        const saved = localStorage.getItem('groceries')
        if (!saved || saved === "undefined") return []
        try {
            return JSON.parse(saved)
        } catch {
            return []
        }
    })

    useEffect(() => {
        if (task !== null) {
            localStorage.setItem('tasks', JSON.stringify(task))
        }
        if (note !== null) {
            localStorage.setItem('notes', JSON.stringify(note))
        }
        if (grocery !== null) {
            localStorage.setItem('groceries', JSON.stringify(grocery))
        }
         if (currentHousehold !== null) {
            localStorage.setItem('household', JSON.stringify(currentHousehold))
        }
    }, [task, note, grocery,currentHousehold])

    return(
        <HouseholdContext.Provider value={{currentHousehold, setCurrentHousehold, households, setHouseholds, task,setTask, note, setNote, grocery, setGrocery}}>
            { children }
        </HouseholdContext.Provider>
    )
}

export  { HouseholdContext, HousholdProvider}