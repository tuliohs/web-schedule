import React, { createRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { obterScheduleItems, obterTemas, addItem, removeItem, changeItem, newCategory } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
// components
import Dropdown from "views/customize/Dropdown";
import AddItemDialog from '../AddItemDialog'
import StepMenu from '../StepMenu'

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
                    <p className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">{item?.detail?.state}</p>
                    {!item?.detail?.lastDateReview ? null : <p className="mt-2 mb-4 text-gray-600">{`Last Revision in ${item.detail.lastDateReview}`}</p>}
                    {/*<button class="button-rgb" type="button">NEW REVISION</button>*/}
                    <div className="divhoverbutton">
                        <a className="ahoverbutton" onClick={revision}><span className="spanhoverbutton">New Revision</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Category() {

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)

    const valor = createRef()

    const [tabdata, setTabdata] = useState()

    const [currentCat, setCurrentCat] = useState(null)

    const [itemChange, setItemChange] = useState({})

    const addcatHandler = async (e) => {
        await newCategory({ title: e?.title, description: e?.description, topicId: currentTopic })
            .then(() => {
                const getDados = async () => await obterScheduleItems().then(c => {
                    //setTabdata({})
                    setData(c.data)
                }).catch(e => console.log("err", e))
                getDados()
            })
    }

    useEffect(() => {
        const getDados = async () => await obterScheduleItems().then(c => {
            setData(c.data)
        }).catch(e => console.log("err", e))
        const getTopics = async () => await obterTemas().then(c => setTopic(c.data)).catch(e => console.log("err", e)) //show topics without data
        getDados()
        getTopics()
    }, [])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (currentTopic) return
        const a = async () => { setCurrentTopic(topic[0]?._id) }
        a()
    }, [topic])

    useEffect(() => {// quando o tema for alterado => selecionar a primeira categoria como default
        if (currentCat) return
        const a = async () => { setCurrentCat(dados.filter(x => x.topic._id === currentTopic).find(x => x !== undefined)?._id) }
        a()
    }, [currentTopic, dados])


    useEffect(() => {// quando a categoria for alterada => filtrar a tabela
        const a = async () => { setTabdata(dados.filter(x => x._id === currentCat && x.topic._id === currentTopic).map(a => { return a.items })) }
        a()
    }, [currentCat, currentTopic, dados])


    const color = 'teal-'
    const grau = 500
    return (
        <>
            <StepMenu defaultStepNum={1} />
            {!dados ? null : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <div style={{ flex: 1, flexDirection: 'row', margin: 30, display: 'flex' }} >
                    <Dropdown name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />
                    {/*<Dropdown name='Category' state={currentCat} refer={valor} setState={setCurrentCat} items={dados.filter(x => x.topic._id === currentTopic).map(a => ({ id: a._id, value: a.description }))} />*/}
                    {/*---------BUTTON ADD CATEGORY*/}

                    <div style={{ marginLeft: 'auto', marginRight: '15px' }} className="relative inline-flex align-middle m-2">
                        <button
                            className={`text-white font-bold uppercase text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-${color + grau} active:bg-${color + (grau + 100)} ease-linear transition-all duration-150`}
                            type="button"
                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        >
                            <i className="fas px-6">
                                <AddItemDialog addItemHandler={addcatHandler} />
                            </i>
                            Add Category
                        </button>
                    </div>
                </div>
                <div className="w-full mb-12 px-4">
                    {dados.filter(w => w.topic._id === currentTopic).map(c => (
                        <CardContent
                            item={c}
                        />
                    ))}
                </div>
            </div>}
        </>
    );
}
