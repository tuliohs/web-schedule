import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { newRevision } from './Revision'

import 'components/Buttons/buttonHover.css'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import AlertDynamic from 'components/Notifications/AlertDynamic'

//import https from 'https'
//const axRejUnauth = Axios.create({
//    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
//    //baseURL: "https://jsonplaceholder.typicode.com/",
//    withCredentials: false,
//    headers: {
//        'Access-Control-Allow-Origin': '*',
//        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//    }
//});

const defaultDescr = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp"
export const defaultStepItems = [
    {
        idCategory: 1,
        category: "Level One",
        items: [
            { id: 1, title: 'Personal pronouns', description: defaultDescr, priority: 'little' },
            { id: 2, title: 'This, that, these e those demonstrative pronouns.', description: defaultDescr, priority: 'little' },
            { id: 3, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' },
        ]
    },
    {
        idCategory: 2,
        category: "Level Two",
        items: [
            { id: 4, title: 'Personal pronouns', description: defaultDescr, priority: 'little' },
            { id: 5, title: 'This, that, these e those demonstrative pronouns.', description: defaultDescr, priority: 'little' },
            { id: 6, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' },
            { id: 7, title: 'Verbo to be', description: defaultDescr, priority: 'little' },
            { id: 8, title: 'Adjetivos: Comuns e Demonstrativos', description: defaultDescr, priority: 'little' },
            { id: 9, title: 'Advérbios de Frequência', description: defaultDescr, priority: 'little' },
            { id: 10, title: 'Comparativo e Superlativo', description: defaultDescr, priority: 'little' },
            { id: 11, title: '‘To be going to’ – frases básicas', description: defaultDescr, priority: 'little' },
            { id: 12, title: 'Quantificadores: ‘How much’, ‘how many’ e ‘very’ – frases básicas', description: defaultDescr, priority: 'little' },
            { id: 14, title: 'Substantivos Incontáveis mais Comuns', description: defaultDescr, priority: 'little' },
        ]
    },
    {
        idCategory: 3,
        category: "Level Three",
        items: [
            { id: 14, title: 'Personal pronouns', description: defaultDescr, priority: 'little' },
            { id: 15, title: 'This, that, these e those demonstrative pronouns.', description: defaultDescr, priority: 'little' },
            { id: 16, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' },
            { id: 17, title: 'Verbo to be', description: defaultDescr, priority: 'little' },
            { id: 18, title: 'Adjetivos: Comuns e Demonstrativos', description: defaultDescr, priority: 'little' },
        ]
    }

]

const CardContent = ({ categoryId, item, revision }) => {
    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="flex">

                        <div style={{ width: "80%", marginLeft: "10%" }}>
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                                <i className="fas fa-retweet"></i>
                            </div></div>

                        <Link className="relative w-auto pl-4 flex-initial"
                            to={{ pathname: "revision", state: { item: item, categoryId: categoryId } }}
                        >
                            < ExitToAppIcon />
                        </Link>
                    </div>
                    <h6 className="text-xl font-semibold">{item?.title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{item?.description}</p>
                    {/*<button class="button-rgb" type="button">NEW REVISION</button>*/}
                    <div className="divhoverbutton">
                        <a className="ahoverbutton" onClick={revision}><span className="spanhoverbutton">New Revision</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Schedule() {

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [revisonNote, setRevisionNote] = useState(null)
    const [curr, setCurr] = useState({})
    const atual = useRef(null)

    useEffect(() => {
        const url = "http://localhost:9090/v1/categorySchedule"
        Axios.get(url)
            .then(c => {
                console.log(c.data)
                setData(c.data)
            })
            .catch(e => console.log("err", e))
    }, [])

    return (
        <>
            {!data ? <h1>Loading ...</h1> : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <ModalSmall refer={atual} title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote} setText={setRevisionNote}
                    action={() => {
                        newRevision({ curr: curr, revisonNote: revisonNote })
                        setShowModal(false)
                    }} />
                {data.map(c => (
                    <>
                        <div className="w-full text-center relative" key={c._id}>
                            {/* Heading */}
                            <h6 className="text-white  uppercase font-bold  bg-blue-600 ">{c.description}</h6>
                            {/* Divider */}
                            <hr className="my-6 md:min-w-full" />
                        </div>
                        {c.items.map(x => (
                            <>
                                <CardContent item={x} categoryId={c._id} revision={() => {
                                    setCurr({ categoryId: c._id, itemId: x._id })
                                    setShowModal(true)
                                }
                                } />
                            </>
                        ))}

                    </>
                ))}
            </div>}
            <AlertDynamic showAlert={true} />
        </>
    );
}
