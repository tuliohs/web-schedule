import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import 'components/Buttons/buttonHover.css'
// components
import ModalSmall from 'components/Modals/ModalSmall'

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

const CardContent = ({ id, title, description, revision }) => {
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
                            to={{ pathname: "revision", state: { id: id, description: description, title: title, } }}
                        >
                            < ExitToAppIcon />
                        </Link>
                    </div>
                    <h6 className="text-xl font-semibold">{title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{description}</p>
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

    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([])
    const actionModal = () => setShowModal(!showModal)
    useEffect(() => {
        const url = "http://45.90.108.173:9090/v1/categorySchedule"
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
                {data.map(c => (
                    <>
                        <div className="w-full text-center relative">
                            {/* Heading */}
                            <h6 className="text-white  uppercase font-bold  bg-blue-600 ">{c.description}</h6>
                            {/* Divider */}
                            <hr className="my-6 md:min-w-full" />
                        </div>
                        {c.items.map(x => <CardContent id={x.id} title={x.title} description={x.description} revision={actionModal} />)}
                        <ModalSmall setShowModal={setShowModal} showModal={showModal} />
                    </>
                ))}
            </div>}
        </>
    );
}
