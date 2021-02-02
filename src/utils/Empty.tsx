import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import { EEmpty } from 'constants/data/DefaultContext'
import { obterEmpty } from 'api/mySchedule'

interface EmptyProps {

}

const Empty: FunctionComponent<EmptyProps> = () => {

    const [empType, setEmpType] = useState<EEmpty>(EEmpty.Valid)
    const history = useHistory()


    const reqEmptype = useCallback(async () => obterEmpty()
        .then(c => { setEmpType(c?.data?.tipo) })
        .catch(e => console.log(e)), [])
    useEffect(() => {
        reqEmptype()
    }, [reqEmptype])

    const tipos = {
        Topic: { emptype: EEmpty.Topic, to: "/customize/lab/topic" },
        Category: { emptype: EEmpty.Category, to: "/customize/lab/category" },
        Item: { emptype: EEmpty.Item, to: "/customize/lab/item" },
        Review: { emptype: EEmpty.Review, to: "/myschedule/next" },
    }

    return (
        <>
            {empType === EEmpty.Valid && null}
            {
                empType === EEmpty.Topic && (history?.location?.pathname !== tipos.Topic.to ?
                    < div ><p>Para começar vamos criar um topico, não se preocupe é facil </p>
                        <Link to={tipos.Topic.to} className="font-bold text-gray-800 mt-8">
                            clique aqui
                </Link></div> : < div >
                        <p>Clique em "ADD TOPIC" e adicione um tema, pode ser qualquer coisa. </p>
                    </div>)
            }
            {
                empType === EEmpty.Category && (history?.location?.pathname !== tipos.Category.to ?
                    <div><p>Agora vamos criar uma categoria que será vinculada ao seu topico, </p>
                        <Link to={tipos.Category.to} className="font-bold text-gray-800 mt-8">
                            clique aqui
            </Link></div> : < div >
                        <p>Adicione a categoria</p>
                    </div>)
            }
            {
                empType === EEmpty.Item && (history?.location?.pathname !== tipos.Item.to ?
                    <div><p>Você está quase lá! Voê já pode criar os items a serem revisados</p>
                        <Link to={tipos.Item.to} className="font-bold text-gray-800 mt-8">
                            clique aqui
            </Link></div> : < div >
                        <p>Esse é o item que será revisado, vamos lá!</p>
                    </div>)
            }
            {
                empType === EEmpty.Review && (history?.location?.pathname !== tipos.Review.to ?
                    <div><p>Tudo pronto! agora é só começar suas revisões </p>
                        <Link to={tipos.Review.to} className="font-bold text-gray-800 mt-8">
                            clique aqui
            </Link></div> : < div >
                        <p>Next!</p>
                    </div>)
            }
        </>



    )
}

export default Empty