import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import moment from 'moment'
import { newRevision, obterScheduleItems, obterTemas } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import AlertDynamic from 'components/Notifications/AlertDynamic'
import DropdownButton from 'components/Dropdowns/DropdownButton'

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
                    {!item?.detail?.lastDateReview ? null : <p className="mt-2 mb-4 text-gray-600">Last Revision in <b>{moment(item.detail.lastDateReview).format('DD/MM/YYYY HH:mm')}</b></p>}
                    {/*<button class="button-rgb" type="button">NEW REVISION</button>*/}
                    <div className="divhoverbutton">
                        <a className="ahoverbutton" onClick={revision}><span className="spanhoverbutton">New Revision</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
const defaultMessage = { type: 'sucess', text: 'sucess' }
export default function Schedule() {

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(defaultMessage);
    const [topic, setTopic] = useState([])

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(null)

    const [curr, setCurr] = useState({})
    const [currentTopic, setCurrentTopic] = useState(null)
    const atual = useRef(null)

    useEffect(() => {
        const getItems = async () => await obterScheduleItems().then(c => setData(c.data)).catch(e => console.log("err", e))
        getItems()
        const getTopics = async () => await obterTemas().then(c => setTopic(c.data)).catch(e => console.log("err", e)) //show topics without data
        getTopics()
    }, [])

    useEffect(() => { //quando receber informações da api => selecionar o primeiro topico como default (Caso não haja nenhum intem previamente filtrado)
        if (currentTopic) return
        const a = async () => { setCurrentTopic(topic[0]?._id) }
        //const a = async () => { setCurrentTopic(dados.find(x => x !== undefined)?.topic?._id) }
        a()
    }, [topic])

    return (
        <>
            {!data ? <h1>Loading ...</h1> : <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <ModalSmall refer={atual} title="New Revision" setShowModal={setShowModal} showModal={showModal}
                    text={revisonNote} setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    action={async () => {
                        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
                            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
                            .catch(e => console.log("err", e))
                        setShowModal(false)
                        setShowAlert(true)
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
                <AlertDynamic showAlert={showAlert} setShowAlert={setShowAlert} message={message} />
            </div>}
        </>
    );
}
