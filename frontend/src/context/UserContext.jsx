import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser')
        if (storedUser) {
            // {
                setUser(JSON.parse(storedUser));
            // } 
            // catch (error) {
            //     console.error('Error parsing stored user data:', error);
            //     localStorage.removeItem('authUser');  // Clear invalid data
            // }
        }
    }, [])
    useEffect(() => {
        if (user) {
            localStorage.setItem('authUser', JSON.stringify(user));
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}