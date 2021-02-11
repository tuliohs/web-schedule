import React, { createContext } from 'react'
import { IMessage } from 'components/Notifications/AlertDynamic'

export enum EEmpty {
    Topic = "Topic",
    Category = "Category",
    Item = "Item",
    Review = "Review",
    Valid = "Valid"
}
interface IDefaultProps extends IMessage {
    empType: EEmpty,
    setEmpType: React.Dispatch<React.SetStateAction<EEmpty>>,
}

export var DefaultContext = createContext({} as IDefaultProps)
export default DefaultContext

export const DefaultProvider = (children: IDefaultProps) => {
    return <DefaultContext.Provider value={children} />
}