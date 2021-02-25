import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import { login } from 'api/user.api'
import { Header, UserInput } from './auth.utils'

import StoreContext from 'constants/data/StoreContext'
import DefaultContext from 'constants/data/DefaultContext'

function initialState() {
  return { email: '', password: '' };
}

export default function Login() {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);

  const { setMessage, } = useContext(DefaultContext);
  const { setToken, setUser } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }
  async function onSubmit(event) {
    event.preventDefault();
    await login(values).then(a => {
      setUser(a.data?.user)
      setToken(a?.data?.token)
      return history.push('/myschedule/schedule')
    }).catch(er => {
      //console.log(er.message)
      setError(er?.toString())
      setMessage({ type: 'danger', text: er?.toString() })
      setValues(initialState);
    });
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <Header title={"Sign in"/* with"*/} />
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  {/*<small>Or sign in with credentials</small>*/}
                </div>
                <form onSubmit={e => onSubmit(e)}>
                  <UserInput label="Email" id="a" name="email" type="text"  //change type for the email
                    onChange={onChange} value={values.email} placeholder="Email"
                  />
                  <UserInput label="Password" id="password" name="password" type={"password"}
                    onChange={onChange} value={values.password} placeholder="Password"
                  />
                  {error && (
                    <div className="user-login__error">{error}</div>
                  )}
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Remember me
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    //onClick={onSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forgotpass" className="text-gray-300">
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-gray-300">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
