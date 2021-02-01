import React, { useCallback, useContext, useEffect, useState } from "react";

import { obterScheduleItems, obterTemas, addItem, removeItem, changeItem, } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
// components
import TableEdit from "./TableEdit";
import ControlledOpenSelect from "components/Dropdowns/ControlledOpenSelect";
import StepMenu from '../StepMenu'
import { submitDialog } from '../Topic/Topic'
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'

export default function ItemsScreen() {

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)
    const [loading, setLoading] = useState(true)

    const { setMessage } = useContext(DefaultContext);

    const [tabdata, setTabdata] = useState()
    const [currentCat, setCurrentCat] = useState(null)
    const [itemCurrentAction, setItemCurrentAction] = useState({})

    const getDados = useCallback(async () => await obterScheduleItems().then(c => {
        setData(c.data)
    }).catch(e => setMessage({ type: 'danger', text: e?.toString() })), [setMessage])

    const selectFirstCategory = async () => { setCurrentCat(dados.filter(x => x.topic?._id === currentTopic).find(x => x !== undefined)?._id) }
    const selectFirstTopic = async () => { setCurrentTopic(topic[0]?._id) }

    useEffect(() => {
        const getTopics = async () => await obterTemas().then(c => {
            setTopic(c.data)
            setLoading(false)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
        getDados()
        getTopics()
    }, [setMessage, getDados])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (!currentTopic) selectFirstTopic()
        else selectFirstCategory()
        //const a = async () => { setCurrentTopic(dados.find(x => x !== undefined)?.topic?._id) }
    }, [topic, currentTopic])

    useEffect(() => {// quando o tema for alterado => selecionar a primeira categoria como default
        if (!currentCat)
            selectFirstCategory()
    }, [currentTopic, dados, currentCat])

    useEffect(() => {// quando a categoria for alterada => filtrar a tabela
        const filterTable = async () => { setTabdata(dados.filter(x => x?._id === currentCat && x.topic?._id === currentTopic).map(a => { return a.items })) }
        filterTable()
    }, [currentCat, currentTopic, dados])

    //const addcatHandler = async (e) => {
    //    await newCategory({ title: e?.title, description: e?.description, topicId: currentTopic })
    //        .then(res => {
    //            setMessage({ type: 'sucess', text: res?.data?.message })            
    //            getDados()
    //        }).catch(er => setMessage({ type: 'danger', text: er?.toString() }))
    //}
    const addItemHandler = async ({ item, image }) =>
        await addItem({ filter: { categoryId: currentCat }, content: { title: item?.title, description: item?.description } })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getDados()
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))

    const removeItemHandler = async () =>
        submitDialog({
            clickYes: async () => await removeItem({ categoryId: currentCat, itemId: itemCurrentAction._id })
                .then(res => {
                    setMessage({ type: 'sucess', text: res?.data?.message })
                    getDados()
                })
                .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        })

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
    const _category = dados?.filter(a => a._id === currentCat)[0]?.title ?? '...'
    const topic_category = _topic || '' + '> ' + _category

    return (
        <>
            <StepMenu defaultStepNum={2} />
            {
                !dados ? <Loading /> : <div className="flex flex-wrap justify-center">
                    <div className="flex justify-between flex-row flex-1 m-4 aling-center text-center items-center" >
                        <div className="flex justify-between flex-row p-6 flex-wrap">
                            <div className="m-2"><ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} /></div>
                            <div className="m-2"><ControlledOpenSelect name='Category' state={currentCat} setState={setCurrentCat} items={dados.filter(x => x.topic?._id === currentTopic).map(a => ({ id: a._id, value: a.title }))} /></div>
                        </div>
                        <span className=" text-gray-800 flex ml-6 text-2xl font-bold">
                            {topic_category}
                        </span>
                        {/*---------BUTTON ADD CATEGORY*/}
                        {/*<div className="relative inline-flex align-middle m-2">
                            <AddUserItem label="Add Category" addItemHandler={addcatHandler} />
                        </div>*/}
                    </div>
                    <div className="w-full mb-12 px-4">
                        <div>
                            {!tabdata ? null : <TableEdit addItemHandler={addItemHandler}
                                removeItemHandler={removeItemHandler}
                                setItemCurrentAction={setItemCurrentAction}
                                changeItemHandler={changeItemHandler}
                                title="Items" data={Object.values(tabdata[0] || {})} />}
                            {tabdata?.length === 0 ? <Loading loading={loading} /> : null}
                        </div>
                        <Empty />
                    </div>
                </div>
            }
        </>
    );
}
