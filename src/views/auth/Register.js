import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';

import { register } from 'api/user.api'
import StoreContext from 'constants/data/StoreContext'
import DefaultContext from 'constants/data/DefaultContext'
import { Header, UserInput } from './auth.utils'
import { inputStreamRouter } from "api/schedule.api";
import { EPagePath } from "routes";

function initialState() {
  return { firstName: '', email: '', password: '', passwordRepeat: '' };
}

export default function Register() {

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
    if (!values.password && !values.passwordRepeat && !values.firstName && !values.email) {
      const message = 'All fields must be required'
      setMessage({ type: 'danger', text: message })
      return setError(message);
    }
    if (values.password !== values.passwordRepeat) {
      const message = 'The typed passwords are not the same'
      setMessage({ type: 'danger', text: message })
      return setError(message);
    }
    await register(values).then(a => {
      setUser(a.data?.user)
      setToken(a?.data?.token)
      return history.push('/auth/register/complet')
    }).catch(error => {
      setError(error.error)
      setMessage({ type: 'danger', text: error })
      setValues(initialState)
    });
  }

  useEffect(() => {
    const inpStrHandler = async () => await inputStreamRouter(EPagePath.Register)
    inpStrHandler()
  }, [])
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <Header title={"Sign up"/* with"*/} />

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  {/*<small>Or sign up with credentials</small>*/}
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
                  <UserInput label="Repeat Password" id="passwordRepeat" type="password" name="passwordRepeat"
                    onChange={onChange} value={values.passwordRepeat} placeholder="Repeat the password again"
                  />
                  {error && (
                    <div className="user-login__error">{error}</div>
                  )}
                  <div>
                    {/*<label className="inline-flex items-center cursor-pointer">
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
                    </label>*/}
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
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  //onClick={(e) => e.preventDefault()}
                  className="text-gray-300"
                >
                  <Link to="/auth/login" className="text-gray-300">
                    <small>Sign In</small>
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
