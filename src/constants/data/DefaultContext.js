import React, { useState, createContext } from 'react'

export const DefaultContext = createContext()

export default DefaultContext

//const defaultMessage = { type: 'sucess', text: 'sucess' }
export function DefaultProvider({ children }) {
    //const [showAlert, setShowAlert] = useState(true);
    //const [message, setMessage] = useState(defaultMessage);
    return (
        <DefaultContext.Provider
        >
            {children}
        </DefaultContext.Provider>
    )
}