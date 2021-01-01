import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from 'constants/data/StoreContext'

const RoutesPrivate = ({ children, ...rest }) => {
  const { token } = useContext(StoreContext);

  //chage to "EQUAL TOKEN" to remove authorization
  return (
    <Route
      {...rest}
      render={() => token
        ? (children)
        : <Redirect to="/auth/login" />
      }
    />
  )
}

export default RoutesPrivate;