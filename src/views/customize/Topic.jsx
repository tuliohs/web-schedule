import React, { createRef, useEffect, useState } from "react";

import { obterScheduleItems, obterTemas } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
// components
import TableEdit from "views/customize/TableEdit";
import Dropdown from "views/customize/Dropdown";

export default function Topic() {

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)

    const valor = createRef()

    const [tabdata, setTabdata] = useState()

    const [currentCat, setCurrentCat] = useState(null)

    useEffect(() => {
        const aa = async () => await obterScheduleItems().then(c => {
            setData(c.data)
        }).catch(e => console.log("err", e))
        const getTopics = async () => await obterTemas().then(c => setTopic(c.data)).catch(e => console.log("err", e)) //show topics without data
        aa()
        getTopics()
    }, [])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default
        const a = async () => { setCurrentTopic(dados.find(x => x !== undefined)?.topic?._id) }
        a()
    }, [dados])

    useEffect(() => {// quando o tema for alterado => selecionar a primeira categoria como default
        const a = async () => { setCurrentCat(dados.filter(x => x.topic._id === currentTopic).find(x => x !== undefined)?._id) }
        a()
    }, [currentTopic])


    useEffect(() => {// quando a categoria for alterada => filtrar a tabela
        const a = async () => { setTabdata(dados.filter(x => x._id === currentCat && x.topic._id === currentTopic).map(a => { return a.items })) }
        a()
    }, [currentCat, currentTopic])

    return (
        <>
            {!dados ? null : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <div style={{ flex: 1, flexDirection: 'row', margin: 30 }}>
                    <Dropdown name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />
                    <Dropdown name='Category' state={currentCat} refer={valor} setState={setCurrentCat} items={dados.filter(x => x.topic._id === currentTopic).map(a => ({ id: a._id, value: a.description }))} />
                </div>
                <div className="w-full mb-12 px-4">
                    <div>
                        {!tabdata ? null : <TableEdit title="Schedule Items" data={Object.values(tabdata[0] || {})} />}
                    </div>
                </div>
            </div>}
        </>
    );
}
