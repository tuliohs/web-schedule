import React, { createRef, useCallback, useContext, useEffect, useState } from "react";

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
import { useLocation } from "react-router";
import { inputStreamRouter } from "api/schedule.api";
import { EPagePath } from "routes";

export default function ItemsScreen() {

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tabdata, setTabdata] = useState()
    const [currentCat, setCurrentCat] = useState(null)
    const [itemCurrentAction, setItemCurrentAction] = useState({})

    const { setMessage } = useContext(DefaultContext);
    let location = useLocation()
    const buttonItem = createRef(null)

    const getDados = useCallback(async () => await obterScheduleItems().then(c => {
        setData(c.data)
    }).catch(e => setMessage({ type: 'danger', text: e?.toString() })), [setMessage])

    const selectFirstCategory = useCallback(async () => {
        setCurrentCat(dados.filter(x => x.topic?._id === currentTopic).find(x => x !== undefined)?._id)
    }, [currentTopic, dados])
    const selectFirstTopic = useCallback(async () => {
        setCurrentTopic(topic[0]?._id)
    }, [topic])

    useEffect(() => {
        const getTopics = async () => await obterTemas().then(c => {
            setTopic(c.data)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
        getDados()
        getTopics()
    }, [setMessage, getDados])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (!currentTopic) selectFirstTopic()
        else selectFirstCategory()
        //const a = async () => { setCurrentTopic(dados.find(x => x !== undefined)?.topic?._id) }
    }, [topic, currentTopic, selectFirstTopic, selectFirstCategory])

    useEffect(() => {// quando o tema for alterado => selecionar a primeira categoria como default
        if (!currentCat)
            selectFirstCategory()
    }, [currentTopic, dados, currentCat, selectFirstCategory])

    useEffect(() => {// quando a categoria for alterada => filtrar a tabela
        const filterTable = async () => {
            setTabdata(dados.filter(x => x?._id === currentCat && x.topic?._id === currentTopic).map(a => { return a.items }))
            if (currentCat) //voltar para a categoria quando adicionar um item
                setCurrentCat(currentCat)
        }
        filterTable()
    }, [currentCat, currentTopic, dados])

    useEffect(() => {
        if (location.state?.addDefault) {

            setCurrentCat(location.state?.categoryId)
            buttonItem.current && buttonItem.current.click()
            //location.state.addDefault=false
        }

    }, [buttonItem])

    //const addcatHandler = async (e) => {
    //    await newCategory({ title: e?.title, description: e?.description, topicId: currentTopic })
    //        .then(res => {
    //            setMessage({ type: 'sucess', text: res?.data?.message })            
    //            getDados()
    //        }).catch(er => setMessage({ type: 'danger', text: er?.toString() }))
    //}
    const addItemHandler = async ({ item, image }) => {
        if (location?.state?.addDefault)
            location.state.addDefault = false;
        await addItem({
            filter: { categoryId: currentCat }, content: { title: item?.title, description: item?.description, iconName: item?.iconName, level: item?.level }
        })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getDados()
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }

    const removeItemHandler = async () => {
        submitDialog({
            clickYes: async () => await removeItem({ categoryId: currentCat, itemId: itemCurrentAction._id })
                .then(res => {
                    setMessage({ type: 'sucess', text: res?.data?.message })
                    getDados()
                })
                .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
            , label: 'Are you sure want you to delete the item "' + itemCurrentAction?.title + '"'
        })
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
    const _category = dados?.filter(a => a._id === currentCat)[0]?.title ?? '...'
    const topic_category = `${_topic || ''}> ${_category}`

    useEffect(() => {
        const inpStrHandler = async () => await inputStreamRouter(EPagePath.Item)
        inpStrHandler()
    }, [])

    return (
        <>
            <StepMenu defaultStepNum={2} />
            {
                !dados ? <Loading loading={loading} /> : <div className="flex flex-wrap justify-center">
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
                                buttonItem={buttonItem}
                                title="Items" data={Object.values(tabdata[0] || {})} />}
                            {tabdata?.length === undefined ? <Loading loading={loading} /> : null}
                        </div>
                        {!loading && <Empty itemPageLength={!tabdata ? 0 : tabdata[0]?.length} />}
                    </div>
                </div>
            }
        </>
    );
}
