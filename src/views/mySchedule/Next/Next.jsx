import React, { useCallback, useRef, useState, useContext } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'

import { EditorState /*, convertToRaw*/ } from "draft-js";
//import { Animated } from "react-animated-css";
import moment from 'moment'

//components
import ModalSmall from 'components/Modals/ModalSmall'
import DefaultContext from 'constants/data/DefaultContext'
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'
import CardNext from './CardNext'
import { inputStreamRouter } from "api/schedule.api";
import { EPagePath } from "routes";

const delay = ms => new Promise(res => setTimeout(res, ms));



const Next = () => {

    const { setMessage, } = useContext(DefaultContext);
    const focusTextArea = useRef(null)

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(EditorState.createEmpty())

    const [showCard, setShowCard] = useState(true)
    const [showAnimation, setShowAnimation] = useState(false)

    const callModal = ({ categoryId, itemId }) => {
        setCurr({ categoryId: categoryId, itemId: itemId })
        setRevisionDate(new Date())
        setShowModal(true)
        setRevisionNote(EditorState.createEmpty())
    }
    const [curr, setCurr] = useState({})
    const nextHandler = useCallback(async () => {
        await obterNextSchedule()
            .then(c => {
                //Order to next review
                //function compare(a, b) {
                //    if (a.detail?.nextReview > b.detail?.nextReview) return 1;
                //    if (b.detail?.nextReview > a.detail?.nextReview) return -1;
                //    return 0;
                //}
                //setData(c.data.sort(compare))
                setData(c.data)
                setLoading(false)
                setShowAnimation(false)
                setShowCard(true)
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage])

    React.useEffect(() => {
        nextHandler()
    }, [nextHandler])


    React.useEffect(() => {
        const inpStrHandler = async () => await inputStreamRouter(EPagePath.Next)
        inpStrHandler()
    }, [])

    const newReviewModal = useCallback(async () => {
        setShowModal(false)
        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.message }))
        setRevisionNote(null)
        //implement animations
        setShowCard(false)
        await delay(900);
        setShowAnimation(true)
        await delay(900);

        await nextHandler()

    }, [curr, revisionDate, revisonNote, setMessage, nextHandler])

    return (
        <>
            <div>
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} editorState={revisonNote}
                    setEditorState={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    refer={focusTextArea}
                    action={newReviewModal}
                    item={data.filter(a => a?.item?._id === curr?.itemId).map(c => { return c?.item })}
                />
                <div className="text-right mb-4 relative">
                    <span className="font-italic">today : {moment().format("DD/MM/yyyy")}</span>

                </div>
                {/*<ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />*/}
                {data.length === 0 ? <Loading loading={loading} /> : data.filter(a => showAnimation ? a.item?._id !== curr.itemId : a.item?._id)
                    .map((c, index) => <CardNext item={c}
                        key={index}
                        current={curr}

                        showCard={showCard} setShowCard={setShowCard}
                        revisionHanlder={() => {
                            //Alterando as propriedades para o item atual
                            callModal({ categoryId: c.categoryId, itemId: c.item._id })
                            //focusTextArea.current.focus()
                        }}
                    />)}
                {!loading && <Empty itemPageLength={data?.length} />}
            </div>
        </>
    );
}
export default React.memo(Next)