import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import moment from 'moment'
import { newRevision, obterScheduleItems, obterTemas } from 'api/mySchedule'

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import ControlledOpenSelect from 'components/Dropdowns/ControlledOpenSelect'
import { LabelStateColor } from '../Next/Next'
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'
import DefaultDropDown from './DefaultDropDown'
export const items = [
    { id: 1, value: "Beginner" },
    { id: 2, value: "Easy" },
    { id: 3, value: "Normal" },
    { id: 4, value: "Hard" },
    { id: 5, value: "Challenging" }]
const CardContent = ({ categoryId, item, revision }) => {
    const [level, setLevel] = useState('')
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
                    {/*<DefaultDropDown items={items} firsrOrDefault={true} state={level} setState={setLevel} />*/}

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
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [topic, setTopic] = useState([])
    const [loading, setLoading] = useState(true)

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(null)

    const [curr, setCurr] = useState({})
    const [currentTopic, setCurrentTopic] = useState(null)
    const atual = useRef(null)

    const callModal = () => {
        setRevisionDate(new Date())
        setShowModal(true)
    }
    useEffect(() => {
        const getItems = async () => await obterScheduleItems().then(c => setData(c.data)).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
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
                    text={revisonNote} setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    item={data.filter(a => a?._id === curr?.categoryId)[0]?.items.filter(c => c?._id === curr?.itemId)}
                    action={async () => {
                        setShowModal(false)
                        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
                            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
                            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
                    }} />
                <div className="relative" style={{ marginLeft: 0, marginRight: 'auto' }} >
                    <ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />

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
                                    <CardContent key={index} item={x} categoryId={c._id} revision={() => {
                                        setCurr({ categoryId: c._id, itemId: x._id })
                                        callModal()
                                    }} />
                                ))}
                            </div>
                        </div>
                    ))}
            </div>}
            <Empty />
        </>
    );
}
