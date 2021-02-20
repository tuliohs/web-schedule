import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import { EEmpty } from 'constants/data/DefaultContext'
import { obterEmpty } from 'api/mySchedule'
//import Topic from 'views/customize/Topic/Topic';

interface EmptyProps {
    itemPageLength: number
}

//Caminho das páginas
export enum EPagePath {
    Topic = "/customize/lab/topic",
    Explore = "/explore/factory",
    Category = "/customize/lab/category",
    Item = "/customize/lab/item",
    Review = "/myschedule/revision",
    Next = "/myschedule/next",
    Schedule = "/myschedule/schedule",
}

//Verifica se o constexto está vazio e sugere inserção de conteudo
const Empty: FunctionComponent<EmptyProps> = ({ itemPageLength = 0 }) => {

    const [empType, setEmpType] = useState<EEmpty>(EEmpty.Valid)
    //-------Verifica se o contexo atual da pagina está empty
    //const [emptyPage, setEmptyPage] = useState<EEmpty>(EEmpty.Valid)
    const history = useHistory()

    const reqEmptype = useCallback(async () => {

        await obterEmpty()
            .then(c => { setEmpType(c?.data?.tipo) })
            .catch(e => console.log(e))
    }, [itemPageLength])
    useEffect(() => {
        reqEmptype()
    }, [reqEmptype])

    const badgeStyle = "text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1"
    const pStyle = "text-xl font-semibold"

    const CliqueAqui: FunctionComponent<{ to: EPagePath }> = ({ to }) => { return <Link to={to} className={badgeStyle}>clique aqui</Link> }

    const badgeSimple = "font-bold text-gray-800 mt-8"
    const exploreClick = (<p>Ou {(" ")} <Link to={EPagePath.Explore} className={badgeSimple}>clique aqui</Link>{" e explore topicos existentes."}</p>)

    const tipos = {
        Topic: {
            emptype: EEmpty.Topic, to: EPagePath.Topic,
            emptyInPage: (<div className={pStyle}><p >Clique em "ADD TOPIC" e adicione um tema, pode ser qualquer coisa. </p> {exploreClick}</div>),
            emptyOutPage:
                (< div className={pStyle} ><p>Para começar vamos criar um topico, não se preocupe é facil </p>
                    <CliqueAqui to={EPagePath.Topic} />
                    {exploreClick}
                </div>)
        },
        Category: {
            emptype: EEmpty.Category, to: EPagePath.Category,
            emptyInPage: <p className={pStyle}>Adicione a categoria</p>,
            emptyOutPage: (<div className={pStyle}><p>Agora vamos criar uma categoria que será vinculada ao seu topico, </p>
                <CliqueAqui to={EPagePath.Category} /> </div>)
        },
        Item: {
            emptype: EEmpty.Item, to: EPagePath.Item,
            emptyInPage: <p className={pStyle}>Esse é o item que será revisado, vamos lá! Crie um item legal.</p>,
            emptyOutPage: (<div className={pStyle}><p>Você está quase lá! Já pode criar os items a serem revisados</p>
                <CliqueAqui to={EPagePath.Item} /></div>)
        },
        Review: {
            emptype: EEmpty.Review, to: EPagePath.Next,
            emptyInPage: <p className={pStyle}>Next! New Revision!</p>,
            emptyOutPage: (<div className={pStyle}><p>Tudo pronto! agora é só começar suas revisões </p>
                <CliqueAqui to={EPagePath.Next} /></div>)
        },
        Outros: {
            factory: <p className={pStyle}>Selecione a opção fork em um dos topicos</p>
        }
    }

    const currentPagePath = history?.location?.pathname
    return (
        <div className={empType === EEmpty.Valid ? "" : "bottom-0 fixed bg-teal-500 text-white p-2"}>
            {empType === EEmpty.Valid ?
                ///SE TIVER SIDO VALIDADO PELO SERVIDOR MAS A PAGINA ATUAL ESTÁ COM ITEMS VAZIOS
                itemPageLength > 0 ? null :
                    (currentPagePath === tipos.Topic.to && tipos.Topic.emptyInPage)
                    || (currentPagePath === tipos.Category.to && tipos.Category.emptyInPage)
                    || (currentPagePath === tipos.Item.to && tipos.Item.emptyInPage)
                    || (currentPagePath === tipos.Review.to && tipos.Review.emptyInPage)

                    //Others Pages
                    || (currentPagePath === EPagePath.Schedule && tipos.Topic.emptyOutPage) :

                empType === EEmpty.Topic ? (
                    currentPagePath === tipos.Topic.to ? tipos.Topic.emptyInPage
                        //se está na pagina Explore
                        : (currentPagePath === EPagePath.Explore ?
                            tipos.Outros.factory
                            : tipos.Topic.emptyOutPage)) : null
                                ||
                                empType === EEmpty.Category ? (currentPagePath !== tipos.Category.to ?
                                    tipos.Category.emptyOutPage : tipos.Category.emptyInPage) : null
                                        ||
                                        empType === EEmpty.Item ? (currentPagePath !== tipos.Item.to ?
                                            tipos.Item.emptyOutPage : tipos.Item.emptyInPage) : null
                                                ||
                                                empType === EEmpty.Review ? (currentPagePath !== tipos.Review.to ?
                                                    tipos.Review.emptyOutPage : tipos.Review.emptyInPage) : null
            }
        </div>
    )
}

export default Empty