import React, { useCallback, useContext, useEffect, useState } from "react";

import DefaultContext from 'constants/data/DefaultContext'
import { obterScheduleItems, obterTemas, newCategory, removeCategoryId, editCategory } from 'api/mySchedule'
// components
import ControlledOpenSelect from 'components/Dropdowns/ControlledOpenSelect'
import StepMenu from '../StepMenu'
import ItemDialog from '../ItemDialog'
import { submitDialog } from '../Topic/Topic'
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'
import CardCategory from './CardCategory'

import { useHistory, useLocation } from "react-router";
import { inputStreamRouter } from "api/schedule.api";
import { EPagePath } from "routes";


export default function Category() {

    const { setMessage } = useContext(DefaultContext);
    const history = useHistory()
    let location = useLocation()

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)
    const [loading, setLoading] = useState(true)
    const [switchState, setSwitchState] = React.useState(false)
    const [currentCat, setCurrentCat] = useState(null)

    const getDados = useCallback(async () =>
        await obterScheduleItems().then(c => {
            setData(c.data)
            setLoading(false)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() })), [setMessage])

    const addcatHandler = async ({ item, image }) => {
        await newCategory({ item: item, image: image, topicId: currentTopic })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                //console.log(res.data?.res._id)
                if (switchState)
                    history.push({
                        pathname: '/customize/lab/item',
                        state: { addDefault: true, categoryId: res.data?.res._id }
                    })
                else
                    getDados()
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }
    const removeCategoryHandler = async (id, title) => {
        submitDialog({
            clickYes: async () => await removeCategoryId({ categoryId: id })
                .then(res => {
                    setMessage({ type: 'sucess', text: res?.data?.message })
                    getDados()
                })
                .catch(e => setMessage({ type: 'danger', text: e }))
            , label: 'Are you sure want you to delete the category "' + title + '"'
        })
    }
    const editCategoryHandler = async ({ item, image }) => {
        await editCategory({ item: item, image: image })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getDados()
            }).catch(e => setMessage({ type: 'danger', text: e }))
    }
    useEffect(() => {
        const getTopics = async () => await obterTemas().then(c => {
            setTopic(c.data)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
        getDados()
        getTopics()
    }, [setMessage, getDados])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (currentTopic) return //não fazer ada quando já houver um item selecionado
        if (location.state?.topicId) // filtrando pelo location caso exista
            setCurrentTopic(location.state?.topicId)
        else setCurrentTopic(topic[0]?._id)
    }, [topic, currentTopic])

    useEffect(() => {// quando o tema for alterado => selecionar a primeira categoria como default
        if (currentCat) return //não fazer ada quando já houver um item selecionado
        const a = async () => { setCurrentCat(dados.filter(x => x.topic?._id === currentTopic).find(x => x !== undefined)?._id) }
        a()
    }, [currentTopic, dados, currentCat])

    //useEffect(() => {// quando a categoria for alterada => filtrar a tabela
    //    const a = async () => { setTabdata(dados.filter(x => x._id === currentCat && x.topic._id === currentTopic).map(a => { return a.items })) }
    //    a()
    //}, [currentCat, currentTopic, dados])
    useEffect(() => {
        const inpStrHandler = async () => await inputStreamRouter(EPagePath.Category)
        inpStrHandler()
    }, [])


    return (
        <>
            <StepMenu defaultStepNum={1} />
            {!dados ? <Loading /> : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <div className="flex items-center text-center content-center flex-row justify-between flex-1 m-4"  >
                    {/*<DropdownButton name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} />*/}
                    <ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} />
                    <span className=" text-gray-800 flex ml-6 text-2xl font-bold">
                        {topic.filter(a => a._id === currentTopic)[0]?.description}
                    </span>
                    {/*---------BUTTON ADD CATEGORY--------------*/}
                    <div >
                        <ItemDialog btnLabel="Add Category"
                            title="Add Category"
                            addItemHandler={addcatHandler}
                            switchState={switchState}
                            setSwitchState={setSwitchState}
                            labelSwitch="Default Item"
                        />
                    </div>
                </div>
                <div className="w-full mb-12 px-4 flex flex-wrap justify-center" >
                    {dados?.length === 0 ? <Loading loading={loading} /> : dados?.filter(w => w.topic?._id === currentTopic).map(c => (
                        <CardCategory key={c._id} category={c}
                            removeHandler={removeCategoryHandler}
                            editHandler={editCategoryHandler}
                            itemsAssociated={topic.map(c => ({ id: c._id, value: c.title }))}
                        />
                    ))}
                </div>
                {
                    !loading &&
                    <Empty itemPageLength={dados?.filter(w => w.topic?._id === currentTopic)?.length} />
                }
            </div>}
        </>
    );
}
