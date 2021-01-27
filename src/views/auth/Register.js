import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import { register } from 'api/user.api.js'
import StoreContext from 'constants/data/StoreContext'
import { Header, UserInput } from './auth.utils'

function initialState() {
  return { firstName: '', email: '', password: '' };
}

export default function Register() {

  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken, setUser } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }
  function onSubmit(event) {
    event.preventDefault();
    register(values).then(a => {
      setUser(a.data?.user)
      setToken(a?.data?.token)
      return history.push('/myschedule/schedule')
    }).catch(error => {
      setError(error.error)
      setValues(initialState)
    });
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <Header title="Sign up with" />

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form >
                  <UserInput label="First Name" id="firstName" type="text" name="firstName"
                    onChange={onChange} value={values.firstName} placeholder="First Name"
                  />
                  <UserInput label="Email" id="email" type="email" name="email"
                    onChange={onChange} value={values.email} placeholder="Email"
                  />
                  <UserInput label="Password" id="password" type="password" name="password"
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
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-blue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={onSubmit}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
