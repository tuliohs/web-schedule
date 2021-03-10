import React, { useState, useContext, FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";

import { recoveryPass } from 'api/user.api'
import { Header, UserInput } from './auth.utils'

import DefaultContext from 'constants/data/DefaultContext'
import { inputStreamRouter } from "api/schedule.api";
import { EPagePath } from "routes";
import baseRouter from "constants/config/baseRouter";

function initialState() {
  return { email: '', emailRepeat: '' };
}

const ForgotPass: FunctionComponent = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState('');

  const { setMessage } = useContext(DefaultContext);

  const onChange: Function = (event: any): void => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }
  const onSubmit: Function = async (event: any) => {
    event.preventDefault();
    if (values.email !== values.emailRepeat)
      return setError('The typed emails are not the same');
    await recoveryPass(values).then(a => {
      setMessage({ type: 'sucess', text: a.data.message, timeExpire: 20 })
      //return history.push(`${baseRouter}/myschedule/schedule`)
    }).catch(er => {
      //console.log(er.message)
      setError(er?.toString())
      setMessage({ type: 'danger', text: er?.toString() })
      setValues(initialState);
    });
  }

  useEffect(() => {
    const inpStrHandler = async () => await inputStreamRouter(EPagePath.ForgetPass)
    inpStrHandler()
  }, [])
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">

              <Header title="Password Recovery" />
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  {/*<small>Or sign in with credentials</small>*/}
                </div>
                <form onSubmit={e => onSubmit(e)}>
                  <UserInput label="Email" id="email" name="email" type="text"  //change type for the email
                    onChange={onChange} value={values.email} placeholder="Email"
                  />
                  <UserInput label="Repeat Email" id="emailRepeat" name="emailRepeat" type="text"  //change type for the email
                    onChange={onChange} value={values.emailRepeat} placeholder="Repeat the email again"
                  />
                  {error && (
                    <div className="user-login__error">{error}</div>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={e => onSubmit(e)}
                    >
                      Send
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
                  <Link to={`${baseRouter}/auth/login`} className="text-gray-300">
                    <small>Sign In</small>
                  </Link>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to={`${baseRouter}/auth/register`} className="text-gray-300">
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

export default ForgotPass