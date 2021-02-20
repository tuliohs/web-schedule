import React, { createContext, useState } from 'react'
import Context from './StoreContext'
import useStorage from 'utils/hooks/useStorage'
import { TUser } from 'api/user.api'

interface IDefaultProps {
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  user: TUser,
  setUser: React.Dispatch<React.SetStateAction<any>>,
  removeToken: any,
}

const StoreContext = createContext({} as IDefaultProps)
export default StoreContext;

export const StoreProvider: React.FC = ({ children }) => {
  const [token, setToken, removeToken] = useStorage('token')

  const [user, setUser] = useState({})
  return (
    <Context.Provider
      value={{
        token,
        setToken,
        removeToken,
        user,
        setUser
      }}
    >
      {children  /*is the component received*/}
    </Context.Provider>
  )
}

