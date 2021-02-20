import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import { EEmpty } from 'constants/data/DefaultContext'
import { obterEmpty } from 'api/mySchedule'
//import Topic from 'views/customize/Topic/Topic';

interface EmptyProps {
    itemPageLength?: number
}

const Empty: FunctionComponent<EmptyProps> = ({ itemPageLength = 1 }) => {

    const [empType, setEmpType] = useState<EEmpty>(EEmpty.Valid)
    //-------Verifica se o contexo atual da pagina está empty
    //const [emptyPage, setEmptyPage] = useState<EEmpty>(EEmpty.Valid)
    const history = useHistory()


    const reqEmptype = useCallback(async () => obterEmpty()
        .then(c => { setEmpType(c?.data?.tipo) })
        .catch(e => console.log(e)), [])
    useEffect(() => {
        reqEmptype()
    }, [reqEmptype])

    const tipos = {
        Topic: {
            emptype: EEmpty.Topic, to: "/customize/lab/topic",
            emptyInPage: <p>Clique em "ADD TOPIC" e adicione um tema, pode ser qualquer coisa. </p>,
            emptyOutPage:
                (< div className="relative" ><p>Para começar vamos criar um topico, não se preocupe é facil </p>
                    <Link to={"/customize/lab/topic"} className="font-bold text-gray-800 mt-8">
                        clique aqui</Link></div>)
        },
        Category: {
            emptype: EEmpty.Category, to: "/customize/lab/category",
            emptyInPage: <p>Adicione a categoria</p>,
            emptyOutPage: ""
        },
        Item: {
            emptype: EEmpty.Item, to: "/customize/lab/item",
            emptyInPage: <p>Esse é o item que será revisado, vamos lá!</p>,
            emptyOutPage: ""
        },
        Review: {
            emptype: EEmpty.Review, to: "/myschedule/next",
            emptyInPage: <p>Next!</p>,
            emptyOutPage: ""
        },
    }

    const currentPagePath = history?.location?.pathname
    return (
        <>
            {empType === EEmpty.Valid ?
                ///SE TIVER SIDO VALIDADO PELO SERVIDOR MAS A PAGINA ATUAL ESTÁ COM ITEMS VAZIOS
                itemPageLength > 0 ? null :
                    (currentPagePath === tipos.Topic.to && tipos.Topic.emptyInPage)
                    || (currentPagePath === tipos.Category.to && tipos.Category.emptyInPage)
                    || (currentPagePath === tipos.Item.to && tipos.Item.emptyInPage)
                    || (currentPagePath === tipos.Review.to && tipos.Review.emptyInPage)

                    //Others Pages
                    || (currentPagePath === '/myschedule/schedule' && tipos.Topic.emptyOutPage)
                :

                empType === EEmpty.Topic ? (currentPagePath !== tipos.Topic.to ? tipos.Topic.emptyOutPage
                    : tipos.Topic.emptyOutPage) : null
                        ||
                        empType === EEmpty.Category ? (currentPagePath !== tipos.Category.to ?
                            <div><p>Agora vamos criar uma categoria que será vinculada ao seu topico, </p>
                                <Link to={tipos.Category.to} className="font-bold text-gray-800 mt-8">
                                    clique aqui
            </Link></div> : tipos.Category.emptyInPage) : null
                            ||
                            empType === EEmpty.Item ? (currentPagePath !== tipos.Item.to ?
                                <div><p>Você está quase lá! Você já pode criar os items a serem revisados</p>
                                    <Link to={tipos.Item.to} className="font-bold text-gray-800 mt-8">
                                        clique aqui
            </Link></div> : tipos.Item.emptyInPage) : null
                                ||
                                empType === EEmpty.Review ? (currentPagePath !== tipos.Review.to ?
                                    <div><p>Tudo pronto! agora é só começar suas revisões </p>
                                        <Link to={tipos.Review.to} className="font-bold text-gray-800 mt-8">
                                            clique aqui
            </Link></div> : tipos.Item.emptyInPage) : null
            }
        </>
    )
}

export default Empty