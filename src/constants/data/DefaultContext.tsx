import React, { createContext } from 'react'

export type TMessage = {
    type: 'sucess' | 'danger' | 'info',
    text: string
}
export enum EEmpty {
    Topic = "Topic",
    Category = "Category",
    Item = "Item",
    Review = "Review",
    Valid = "Valid"
}
interface IDefaultProps {
    showAlert: boolean,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    message: TMessage,
    setMessage: React.Dispatch<React.SetStateAction<TMessage>>,
    empType: EEmpty,
    setEmpType: React.Dispatch<React.SetStateAction<EEmpty>>
}

export var DefaultContext = createContext({} as IDefaultProps)
export default DefaultContext

export const DefaultProvider = (children: IDefaultProps) => {
    return <DefaultContext.Provider value={children} />
}