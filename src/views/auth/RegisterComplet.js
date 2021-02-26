import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import StoreContext from 'constants/data/StoreContext'
import CardSettings from "../customize/Profile/CardSettings";
import { getUser, changeUser } from 'api/user.api'
import DefaultContext from 'constants/data/DefaultContext'
import { inputStreamRouter } from "api/schedule.api";
import { EPagePath } from "routes";

const defaultValues = {
  email: ''
}
export default function RegisterComplet() {
  const [values, setValues] = useState(defaultValues);
  const { setMessage, } = useContext(DefaultContext);
  const { setUser } = useContext(StoreContext);
  const history = useHistory();

  const [error, setError] = useState(null);

  const getUserHandler = useCallback(async () => {
    await getUser()
      .then(c => { setValues(c.data?.values) })
      .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
  }, [setMessage])

  const changeUserHandler = useCallback(async () => {
    const dados = { content: values }
    await changeUser(dados)
      .then(c => {
        setMessage({ type: 'sucess', text: `n: ${c.data?.n}, nModified: ${c.data?.nModified}, ok: ${c.data?.ok}` })
        setUser(values)
        return history.push('/customize/lab/topic')
      })
      .catch(e => {
        setMessage({ type: 'danger', text: e?.toString() })
        setError(e?.toString())
      })
  }, [setMessage, values, setUser, setError, history])

  useEffect(() => {
    getUserHandler()
  }, [getUserHandler])

  useEffect(() => {
    const inpStrHandler = async () => await inputStreamRouter(EPagePath.CompletRegister)
    inpStrHandler()
  }, [])

  async function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">

              <div className="text-gray-500 text-center mb-3 font-bold">
                {/*<small>Or sign up with credentials</small>*/}
              </div>
              <CardSettings
                title="Complete Your Registration" showImage={true}
                setValues={setValues} onChange={onChange} values={values}
                onSave={changeUserHandler}
                linkLater='/customize/lab/topic' />
              {error && (
                <div className="user-login__error">{error}</div>
              )}
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
