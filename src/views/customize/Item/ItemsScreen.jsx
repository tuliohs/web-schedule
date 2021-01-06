import React, { useContext, useEffect, useState } from "react";

import { obterScheduleItems, obterTemas, addItem, removeItem, changeItem, newCategory } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
// components
import TableEdit from "./TableEdit";
//import DropdownButton from "components/Dropdowns/DropdownButton";
import ControlledOpenSelect from "components/Dropdowns/ControlledOpenSelect";
import AddUserItem from '../AddItemDialog'
import StepMenu from '../StepMenu'

export default function ItemsScreen() {

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)

    const { setMessage } = useContext(DefaultContext);

    const [tabdata, setTabdata] = useState()
    const [currentCat, setCurrentCat] = useState(null)
    const [itemCurrentAction, setItemCurrentAction] = useState({})

    useEffect(() => {
        const getDados = async () => await obterScheduleItems().then(c => {
            //setTabdata({})
            setData(c.data)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        const getTopics = async () => await obterTemas().then(c => setTopic(c.data)).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
        getDados()
        getTopics()
    }, [setMessage])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (currentTopic) return //não fazer ada quando já houver um item selecionado
        const a = async () => { setCurrentTopic(topic[0]?._id) }
        //const a = async () => { setCurrentTopic(dados.find(x => x !== undefined)?.topic?._id) }
        a()
    }, [topic, currentTopic])

    useEffect(() => {//'''SEMPRE''''  quando o tema for alterado => selecionar a primeira categoria como default
        //if (currentCat) return
        const a = async () => { setCurrentCat(dados.filter(x => x.topic._id === currentTopic).find(x => x !== undefined)?._id) }
        a()
    }, [currentTopic, dados])


    useEffect(() => {// quando a categoria for alterada => filtrar a tabela
        const a = async () => { setTabdata(dados.filter(x => x._id === currentCat && x.topic._id === currentTopic).map(a => { return a.items })) }
        a()
    }, [currentCat, currentTopic, dados])

    const addcatHandler = async (e) => {
        await newCategory({ title: e?.title, description: e?.description, topicId: currentTopic })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                const getDados = async () => await obterScheduleItems().then(c => {
                    //setTabdata({})
                    setData(c.data)
                }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
                getDados()
            }).catch(er => setMessage({ type: 'danger', text: er?.toString() }))
    }
    const addItemHandler = async (e) => {
        await addItem({ filter: { categoryId: currentCat }, content: { title: e.title, description: e.description } })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                const getDados = async () => await obterScheduleItems().then(c => {
                    //setTabdata({})
                    setData(c.data)
                }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
                getDados()
            })
    }
    const removeItemHandler = async (e) => {
        await removeItem({ categoryId: currentCat, itemId: itemCurrentAction._id })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                const getDados = async () => await obterScheduleItems().then(c => {
                    setData(c.data)
                }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
                getDados()
            })
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }
    const changeItemHandler = async ({ columnId, value, }) => {
        let itemSend = itemCurrentAction
        itemSend[columnId] = value
        const filter = { categoryId: currentCat, itemId: itemCurrentAction._id }
        const content = itemSend
        await changeItem({ filter: filter, content: content })
            .then(e => console.log(e))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }

    const _topic = topic.filter(a => a._id === currentTopic)[0]?.title
    const _category = dados.filter(a => a._id === currentCat)[0]?.title ?? '...'
    const topic_category = _topic + ' > ' + _category

    return (
        <>
            <StepMenu defaultStepNum={2} />
            {
                !dados ? null : <div className="flex flex-wrap justify-center">
                    <div className="flex justify-between flex-row flex-1 m-4 aling-center text-center items-center" >
                        <div>
                            <ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} />
                            <ControlledOpenSelect name='Category' state={currentCat} setState={setCurrentCat} items={dados.filter(x => x.topic._id === currentTopic).map(a => ({ id: a._id, value: a.title }))} />
                        </div>

                        <span className=" text-gray-800 flex ml-6 text-2xl font-bold">
                            {topic_category}
                        </span>
                        {/*---------BUTTON ADD CATEGORY*/}
                        <div className="relative inline-flex align-middle m-2">
                            <AddUserItem label="Add Category" addItemHandler={addcatHandler} />
                        </div>
                    </div>
                    <div className="w-full mb-12 px-4">
                        <div>
                            {!tabdata ? null : <TableEdit addItemHandler={addItemHandler}
                                removeItemHandler={removeItemHandler}
                                setItemCurrentAction={setItemCurrentAction}
                                changeItemHandler={changeItemHandler}
                                title="Items" data={Object.values(tabdata[0] || {})} />}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
