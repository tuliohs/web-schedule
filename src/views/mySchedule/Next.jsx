import React, { useCallback, useRef, useState, useContext } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'
import moment from 'moment'

//components
import ModalSmall from 'components/Modals/ModalSmall'
import AlertDynamic from 'components/Notifications/AlertDynamic'
import DefaultContext from 'constants/data/DefaultContext'

const CardContent = ({ item, revision }) => {
    console.log('item?.color', item?.detail?.color)
    //let active = date
    return (
        <div className="items-center justify-center relative flex ">
            <div style={{ maxWidth: '75rem' }} className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    {/*<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                    </div>*/}
                    {/*<h6 className="text-xl font-semibold">{title}</h6>*/}
                    <p className="mt-2 mb-4 text-gray-600"><b className="mr-2">Next Review:</b>{moment(item?.detail?.nextReview).format('DD/MM/YYYY HH:mm')}</p>
                    <div className="mt-2 mb-4 text-gray-600">{item?.item?.title}</div>
                    <p className="mt-2 mb-4 text-gray-600">
                        <i className={`fas fa-circle text-${item?.detail?.color}-500 mr-2`}></i>
                        {item?.detail?.state}</p>
                    <div className="divhoverbutton" style={{ width: "20%" }}>
                        <a className="ahoverbutton" href="#/" onClick={revision}>
                            <span className="spanhoverbutton">Revision</span></a>
                    </div>
                </div>
            </div>
        </div>)
}

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = React.useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}

const defaultMessage = { type: 'sucess', text: 'sucess' }
export default function Next() {

    const focusTextArea = useRef(null)

    const [data, setData] = useState([{}])
    const [showModal, setShowModal] = useState(false)

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState('')

    const [curr, setCurr] = useState({})
    const nextHandler = useCallback(async () => {
        await obterNextSchedule()
            .then(c => {
                //Order to next review
                function compare(a, b) {
                    if (a.detail?.nextReview > b.detail?.nextReview) return 1;
                    if (b.detail?.nextReview > a.detail?.nextReview) return -1;
                    return 0;
                }
                setData(c.data.sort(compare))
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [])

    React.useEffect(() => {
        nextHandler()
    }, [nextHandler])

    const newReviewModal = async () => {
        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        setShowAlert(true)
        setShowModal(false)
        setRevisionNote(null)
        await nextHandler()
    }

    return (
        <>
            <div>
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote}
                    setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    refer={focusTextArea}
                    action={newReviewModal} />
                {!data ? null : data.map(c => <CardContent item={c}
                    revision={() => {
                        //Alterando as propriedades para o item atual
                        setCurr({ categoryId: c.categoryId, itemId: c.item._id })
                        setShowModal(true)
                        //focusTextArea.current.focus()
                    }}
                />)}
            </div>
        </>
    );
}
