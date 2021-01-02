import React, { useState, useContext, useCallback, useEffect } from "react";

import { getUser, changeUser } from 'api/user.api'

import DefaultContext from 'constants/data/DefaultContext'
// components
import CardSettings from "./CardSettings";
import CardProfile from "components/Cards/CardProfile.js";

const defaultValues = {
    userName: '',
    email: ''

}
export default function Settings() {
    const [values, setValues] = useState(defaultValues);
    const { setMessage, } = useContext(DefaultContext);

    const getUserHandler = useCallback(async () => {
        await getUser()
            .then(c => { setValues(c.data) })
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage])

    const changeUserHandler = useCallback(async () => {
        const dados = { content: values }
        await changeUser(dados)
            .then(c =>
                setMessage({ type: 'sucess', text: `n: ${c.data?.n}, nModified: ${c.data?.nModified}, ok: ${c.data?.ok}` }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage, values])

    useEffect(() => {
        getUserHandler()
    }, [getUserHandler])

    async function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <CardSettings onChange={onChange} values={values} onSave={changeUserHandler} />
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <CardProfile />
                </div>
            </div>
        </>
    );
}
