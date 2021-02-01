import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
import { obterEmpty } from 'api/mySchedule'

interface EmptyProps {

}


const Empty: FunctionComponent<EmptyProps> = () => {

    const [empType, setEmpType] = useState<EEmpty>(EEmpty.Valid)


    useEffect(() => {
        obterEmpty()
            .then(c => {
                setEmpType(c.data?.tipo)
            })
            .catch(e => console.log(e))
    }, [])
    return (
        <>

            {empType == EEmpty.Valid && null}
            {
                empType == EEmpty.Topic &&
                <div><p>Para começar vamos criar um topico, não se preocupe, pode ser qualquer coisa, </p>
                    <Link to="/customize/lab/topic" className="font-bold text-gray-800 mt-8">
                        clique aqui
                </Link>
                </div>
            }
            {
                empType == EEmpty.Category &&
                <div><p>Agora vamos criar uma categoria que será vinculada ao seu topico, </p>
                    <Link to="/customize/lab/category" className="font-bold text-gray-800 mt-8">
                        clique aqui
            </Link>
                </div>
            }
            {
                empType == EEmpty.Item &&
                <div><p>Para começar vamos criar um topic, não se preocupe, pode ser qualquer coisa, clique aqui </p>
                    <Link to="/customize/lab/item" className="font-bold text-gray-800 mt-8">
                        clique aqui
                </Link>
                </div>
            }
            {
                empType == EEmpty.Review &&
                <div><p>Para começar vamos criar um topic, não se preocupe, pode ser qualquer coisa, clique aqui </p>
                    <Link to="/myschedule/next" className="font-bold text-gray-800 mt-8">
                        clique aqui
                </Link>
                </div>
            }
        </>



    )
}

export default Empty