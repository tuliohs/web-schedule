import React, { useCallback, useRef, useState, useContext } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'

import moment from 'moment'
import { Animated } from "react-animated-css";

//components
import ModalSmall from 'components/Modals/ModalSmall'
import DefaultContext from 'constants/data/DefaultContext'
import Loading from 'utils/Loading'
import HorizontalTimeLine from './HorizontalTimeLine'

import PublicIcon from '@material-ui/icons/Public';
import HourglassFullTwoTone from '@material-ui/icons/HourglassFullTwoTone';
//import Iframe from 'react-iframe'


export const LabelStateColor = ({ state, color }) => {
    return (<>
        <p className="mt-2 mb-4 text-gray-600">
            <i className={`fas fa-circle text-${color}-500 mr-2`}></i>
            {state}</p>
    </>)
}

const CardContent = ({ item, revisionHanlder, showCard, setShowCard, current }) => {
    //console.log(item)
    const [showDetail, setShowDetail] = useState(false)
    const [showRevisions, setShowRevisions] = useState(true)
    const detailHandler = () => {
        setShowDetail(!showDetail)
        setShowRevisions(false)
    }
    const reviewsHandler = () => {
        setShowRevisions(!showRevisions)
        setShowDetail(false)
    }

    return (
        <Animated animationIn="fadeIn" animationOut="slideOutUp" animationInDuration={0} animationOutDuration={700}
            isVisible={!showCard && current.itemId === item.item._id ? false : true}>
            <div className="items-center justify-center relative flex ">

                <div style={{ maxWidth: '75rem' }} className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto flex flex-row flex-wrap">
                        {/*<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                    </div>*/}
                        {/*<h6 className="text-xl font-semibold">{title}</h6>*/}
                        <div style={{ width: '12em' }} className="mt-2 mb-4 text-gray-600"><b className="mr-2">{item?.item?.title}</b></div>

                        <p style={{ width: '18em' }} className="mt-2 mb-4 text-gray-600">Next Review:{' ' + moment(item?.detail?.nextReview).format('DD/MM/YYYY HH:mm')}</p>
                        <span style={{ width: '12em' }}>
                            <LabelStateColor state={item?.detail?.state} color={item?.detail?.color} />
                        </span>
                        <div className="divhoverbutton" style={{ width: '12em' }}>
                            <a className="ahoverbutton" href="#/" onClick={revisionHanlder}>
                                <span className="spanhoverbutton">Revision</span></a>
                        </div>
                        <i style={{ marginLeft: 'auto', marginRight: 8 }} onClick={detailHandler}><PublicIcon /></i>
                        <i onClick={reviewsHandler}><HourglassFullTwoTone /></i>
                    </div>
                    {!showDetail && !showRevisions ? null : <span className="mt-2 mb-2 text-gray-600">{item?.item?.description}</span>}
                    {!showDetail ? null : <div className="px-4 py-5 ">

                        <iframe frameBorder="0" style={{ width: "100%", height: "25em" }}
                            src={`https://www.bing.com/search?q=${item?.item?.title?.replace(' ', '+')}`}>
                        </iframe>
                    </div>}
                    {/*<RevisionTimeSmall itemRevision={item.revisions} />*/}
                    {!showRevisions ? null : <HorizontalTimeLine itemRevision={item.revisions} />}
                </div>
            </div>
        </Animated>
    )
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function Next() {

    const { setMessage, } = useContext(DefaultContext);
    const focusTextArea = useRef(null)

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState('')

    const [showCard, setShowCard] = useState(true)
    const [showAnimation, setShowAnimation] = useState(false)

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
                setLoading(false)
                setShowAnimation(false)
                setShowCard(true)
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage])

    React.useEffect(() => {
        nextHandler()
    }, [nextHandler])

    const newReviewModal = useCallback(async () => {
        setShowModal(false)
        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        setRevisionNote(null)
        //implement animations
        setShowCard(false)
        await delay(900);
        setShowAnimation(true)
        await delay(900);

        console.log('ss')
        await nextHandler()

    }, [curr, revisionDate, revisonNote, setMessage])

    return (
        <>
            <div>
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote}
                    setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    refer={focusTextArea}
                    action={newReviewModal}
                    item={data.filter(a => a?.item?._id === curr?.itemId).map(c => { return c?.item })}
                />

                {data.filter(a => showAnimation ? a.item?._id !== curr.itemId : a.item?._id)

                    .map((c, index) => <CardContent item={c}
                        key={index}
                        current={curr}

                        showCard={showCard} setShowCard={setShowCard}
                        revisionHanlder={() => {
                            //Alterando as propriedades para o item atual
                            setCurr({ categoryId: c.categoryId, itemId: c.item._id })
                            setShowModal(true)
                            //focusTextArea.current.focus()
                        }}
                    />)}
                <Loading loading={loading} />
            </div>
        </>
    );
}
