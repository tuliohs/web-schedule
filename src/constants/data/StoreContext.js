import React, { createContext, useState } from 'react'
import Context from './StoreContext'
import useStorage from 'utils/hooks/useStorage'


const StoreContext = createContext({
  token: null,
  setToken: () => { },
})

export default StoreContext;

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage('token')
  const [userId, setUserId] = useStorage('userid')

  const [user, setUser] = useState({})
  return (
    <Context.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        userId,
        setUserId
      }}
    >
      {children  /*is the component received*/}
    </Context.Provider>
  )
}

