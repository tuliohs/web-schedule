import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from 'constants/data/StoreContext'
import baseRouter from 'constants/config/baseRouter';

const RoutesPrivate = ({ roles = [], children, ...rest }) => {
  const { token, user } = useContext(StoreContext);

  //chage to "EQUAL TOKEN" to remove authorization
  return (
    <Route
      {...rest}
      render={() => !token
        ? <Redirect to={`${baseRouter}/auth/login`} />
        : (roles.length > 0 ? roles.indexOf(user?.role) : false)
          //if passing role then the user duty contain the role  
          ? <Redirect to={`${baseRouter}/myschedule`} />
          : (children)
      }
    />
  )
}

export default RoutesPrivate;