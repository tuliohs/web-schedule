import React, { useCallback, useContext, useEffect, useState } from "react";

import DefaultContext from 'constants/data/DefaultContext'
import { obterScheduleItems, obterTemas, newCategory, removeCategoryId, editCategory } from 'api/mySchedule'
// components
import ControlledOpenSelect from 'components/Dropdowns/ControlledOpenSelect'
import StepMenu from '../StepMenu'
import ItemDialog from '../Topic/AddItemDialog'
import { submitDialog } from '../Topic/Topic'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const CardContent = ({ editHandler, category, removeHandler }) => {
    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">

                    <h6 className="text-xl font-semibold">{category?.title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{category?.description}</p>
                    <p className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">{category?.detail?.state}</p>

                    <div className="items-center flex flex-col">
                        <div className="mt-2 ml-4 flex flex-row justify-center" style={{ width: '10%', justifyContent: 'space-around' }}>
                            <i className="m-2 mt-2 mb-4 ">  < DeleteIcon onClick={() => removeHandler(category?._id)} /></i>
                            <i className="m-2 mt-2 mb-4 "> <ItemDialog type="edit"
                                receivedItems={category}
                                title="Edit Topic" addItemHandler={editHandler} /> </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Category() {

    const { setMessage } = useContext(DefaultContext);

    const [dados, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)

    //const [tabdata, setTabdata] = useState()
    const [currentCat, setCurrentCat] = useState(null)

    const getDados = useCallback(async () =>
        await obterScheduleItems().then(c => {
            setData(c.data)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() })), [])

    const addcatHandler = async ({ item, image }) => {
        await newCategory({ item: item, image: image, topicId: currentTopic })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getDados()
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }

    const removeCategoryHandler = async (id) => {
        console.log(id)
        submitDialog({
            clickYes: async () => await removeCategoryId({ categoryId: id })
                .then(res => {
                    setMessage({ type: 'sucess', text: res?.data?.message })
                    getDados()
                })
                .catch(e => setMessage({ type: 'danger', text: e }))
        })
    }
    const editCategoryHandler = async ({ item, image }) => {
        //item['_id'] = item._id
        await editCategory({ item: item, image: image })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getDados()
            })
            .catch(e => setMessage({ type: 'danger', text: e }))
    }

    useEffect(() => {
        const getDados = async () => await obterScheduleItems().then(c => {
            setData(c.data)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        const getTopics = async () => await obterTemas().then(c => setTopic(c.data)).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
        getDados()
        getTopics()
    }, [setMessage])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (currentTopic) return //não fazer ada quando já houver um item selecionado
        const a = async () => { setCurrentTopic(topic[0]?._id) }
        a()
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


    return (
        <>
            <StepMenu defaultStepNum={1} />
            {!dados ? null : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <div className="flex items-center text-center content-center flex-row justify-between flex-1 m-4"  >
                    {/*<DropdownButton name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} />*/}
                    <ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} />
                    <span className=" text-gray-800 flex ml-6 text-2xl font-bold">
                        {topic.filter(a => a._id === currentTopic)[0]?.description}
                    </span>
                    {/*---------BUTTON ADD CATEGORY--------------*/}
                    <div >
                        <ItemDialog btnLabel="Add Category" addItemHandler={addcatHandler} />
                    </div>
                </div>
                <div className="w-full mb-12 px-4 flex flex-wrap justify-center" >
                    {dados?.filter(w => w.topic?._id === currentTopic).map(c => (
                        <CardContent key={c._id} category={c}
                            removeHandler={removeCategoryHandler} editHandler={editCategoryHandler}
                        />
                    ))}
                </div>
            </div>}
        </>
    );
}
