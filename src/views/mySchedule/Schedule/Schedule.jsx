import React, { useEffect, useRef, useState, useContext, useCallback } from "react";

import { newRevision, obterScheduleItems, obterTemas } from 'api/mySchedule'
import { EditorState } from "draft-js";

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import ControlledOpenSelect from 'components/Dropdowns/ControlledOpenSelect'
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'
import CardSchedule from './CardSchedule'

export default function Schedule() {

    const { setMessage, } = useContext(DefaultContext);
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [topic, setTopic] = useState([])
    const [loading, setLoading] = useState(true)

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(EditorState.createEmpty())

    const [curr, setCurr] = useState({})
    const [currentTopic, setCurrentTopic] = useState(null)
    const atual = useRef(null)

    const callModal = () => {
        setRevisionDate(new Date())
        setShowModal(true)
        setRevisionNote(EditorState.createEmpty())
    }
    const getItems = useCallback(async () => await obterScheduleItems().then(c => setData(c.data)).catch(e => setMessage({ type: 'danger', text: e?.toString() })), [setMessage])



    useEffect(() => {
        getItems()
        const getTopics = async () => await obterTemas().then(c => {
            setTopic(c.data)
            setLoading(false)
        }).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
        getTopics()
    }, [setMessage])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (currentTopic) return
        const a = async () => { setCurrentTopic(topic[0]?._id) }
        //const a = async () => { setCurrentTopic(dados.find(x => x !== undefined)?.topic?._id) }
        a()
    }, [topic, currentTopic])

    return (
        <>
            {data.length === 0 ? <Loading loading={loading} /> : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <ModalSmall refer={atual} title="New Revision" setShowModal={setShowModal} showModal={showModal}
                    revisionDate={revisionDate} editorState={revisonNote} setEditorState={setRevisionNote}
                    setRevisionDate={setRevisionDate}
                    item={data.filter(a => a?._id === curr?.categoryId)[0]?.items.filter(c => c?._id === curr?.itemId)}
                    action={async () => {
                        setShowModal(false)
                        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
                            .then(c => {
                                setMessage({ type: 'sucess', text: c?.data?.message })
                                getItems()
                            })
                            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
                    }} />
                <div className="relative" style={{ marginLeft: 0, marginRight: 'auto' }} >
                    <ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.title }))} />

                </div>
                {data.filter(a => a?.topic?._id === currentTopic)
                    .map((c, index) => (
                        <div key={index} className="w-full text-center relative">
                            {/* Heading */}
                            <h6 className="text-white  uppercase font-bold  bg-blue-600 ">{c.description}</h6>
                            {/* Divider */}
                            <hr className="my-6 md:min-w-full" />
                            <div className="flex justify-center items-center flex-wrap">
                                {c.items.map((x, index) => (
                                    <CardSchedule key={index} item={x} categoryId={c._id}
                                        setMessage={setMessage}
                                        revision={() => {
                                            setCurr({ categoryId: c._id, itemId: x._id })
                                            callModal()
                                        }} />
                                ))}
                            </div>
                        </div>
                    ))}
            </div>}
            <Empty itemPageLength={data.filter(a => a?.topic?._id === currentTopic)?.length} />
        </>
    );
}
