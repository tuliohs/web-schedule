import React, { createContext } from 'react'
import Context from './StoreContext'
import useStorage from 'utils/hooks/useStorage'


const StoreContext = createContext({
  token: null,
  setToken: () => { },
})

export default StoreContext;

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage('token')
  return (
    <Context.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children  /*is the component received*/}
    </Context.Provider>
  )
}

