import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import moment from 'moment'
import { newRevision, obterScheduleItems, obterTemas } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
import StoreContext from 'constants/data/StoreContext'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import DropdownButton from 'components/Dropdowns/DropdownButton'
import { LabelStateColor } from './Next'

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
                    <LabelStateColor state={item?.detail?.state} color={item?.detail?.color} />
                    {!item?.detail?.lastDateReview ? null : <p className="mt-2 mb-4 text-gray-600">Last Revision in <b>{moment(item.detail.lastDateReview).format('DD/MM/YYYY HH:mm')}</b></p>}
                    {/*<button class="button-rgb" type="button">NEW REVISION</button>*/}
                    <div className="divhoverbutton">
                        <a className="ahoverbutton" href="#/" onClick={revision}><span className="spanhoverbutton">New Revision</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function Schedule() {

    const { setMessage, } = useContext(DefaultContext);
    const { token, } = useContext(StoreContext);
    console.log(token, 'token')
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [topic, setTopic] = useState([])

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(null)

    const [curr, setCurr] = useState({})
    const [currentTopic, setCurrentTopic] = useState(null)
    const atual = useRef(null)

    useEffect(() => {
        const getItems = async () => await obterScheduleItems().then(c => setData(c.data)).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        getItems()
        const getTopics = async () => await obterTemas().then(c => setTopic(c.data)).catch(e => setMessage({ type: 'danger', text: e?.toString() })) //show topics without data
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
            {!data ? <h1>Loading ...</h1> : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <ModalSmall refer={atual} title="New Revision" setShowModal={setShowModal} showModal={showModal}
                    text={revisonNote} setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    action={async () => {
                        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
                            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
                            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
                        setShowModal(false)
                    }} />
                <div className="w-full">
                    <DropdownButton name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />

                </div>
                {data.filter(a => a?.topic?._id === currentTopic)
                    .map(c => (
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
                                    }} />
                                </>
                            ))}

                        </>
                    ))}
            </div>}
        </>
    );
}
