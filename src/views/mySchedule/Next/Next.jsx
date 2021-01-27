import React, { useCallback, useRef, useState, useContext, createRef } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'

import moment from 'moment'
import axios from 'axios'
import { EditorState /*, convertToRaw*/ } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
//import { Animated } from "react-animated-css";

//components
import ModalSmall from 'components/Modals/ModalSmall'
import DefaultContext from 'constants/data/DefaultContext'
import HorizontalTimeLine from './HorizontalTimeLine'
import Loading from 'utils/Loading'

import PublicIcon from '@material-ui/icons/Public';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import HourglassFullTwoTone from '@material-ui/icons/HourglassFullTwoTone';

export const LabelStateColor = ({ state, color }) => {
    return (<>
        <p className="mt-2 mb-4 text-gray-600">
            <i className={`fas fa-circle text-${color}-500 mr-2`}></i>
            {state}</p>
    </>)
}

const CardContent = ({ item, revisionHanlder/*, showCard, setShowCard, current*/ }) => {
    //console.log(item)

    const frameRef = createRef()
    const [showDetail, setShowDetail] = useState(false)
    const [showRevisions, setShowRevisions] = useState(false)
    //const [fullPrint, setFullPrint] = useState(false)
    const [worldSearch, setWorldSearch] = useState('')
    //const [image, setImage] = useState(null)
    const [itemsPesquisa, setItemsPesquisa] = useState([])

    const detailHandler = () => {
        setShowDetail(!showDetail)
        setShowRevisions(false)
    }
    const reviewsHandler = () => {
        setShowRevisions(!showRevisions)
        setShowDetail(false)
    }
    const handleClickTakeScreenShot = async () => {

        const displayMediaOptions = { video: { mediaSource: 'screen' } }
        let captureStream = null;
        const canvas = document.getElementById('fake')
        //setFullPrint(true)
        try {
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            // get correct video track
            const track = captureStream.getVideoTracks()[0]
            // init Image Capture and not Video stream
            const imageCapture = new ImageCapture(track)
            // take first frame only
            const bitmap = await imageCapture.grabFrame()
            // destory video track to prevent more recording / mem leak
            track.stop()
            // this could be a document.createElement('canvas') if you want
            // draw weird image type to canvas so we can get a useful image
            canvas.width = bitmap.width
            canvas.height = bitmap.height
            const context = canvas.getContext('2d')
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
            const image = canvas.toDataURL()
            // this turns the base 64 string to a [File] object
            const res = await fetch(image)
            const buff = await res.arrayBuffer()
            // clone so we can rename, and put into array for easy proccessing
            const file = [
                new File([buff], `photo_${new Date()}.jpg`, {
                    type: 'image/jpeg',
                }),
            ]
            //setImage()
            return console.log('file', file);

        } catch (err) { console.error("Error: " + err); }
        //finally { setFullPrint(false) }

    }
    const searchWord = async (e) => {
        e.preventDefault();
        const apiKey = 'AIzaSyA8vljIcmebx3rfSfxZ2fv_32CKTeHGp3A'
        const mechanism = '30fdb3668b1bd72bc'
        console.log('worldSearch', worldSearch)
        let go = worldSearch.replace(' ', '+')
        await axios.get(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${mechanism}&q=${go}`)
            .then(c => {
                setItemsPesquisa(c?.data?.items)
                console.log(c?.data?.items)
            })
    }
    const onClickReview = () => {
        setShowDetail(false)
        setShowRevisions(false)
        revisionHanlder()
    }
    return (
        //<Animated animationIn="fadeIn" animationOut="slideOutUp" animationInDuration={0} animationOutDuration={700}
        //    isVisible={!showCard && current.itemId === item.item._id ? false : true}>
        <div className="items-center justify-center relative flex ">

            <div style={{ maxWidth: '75rem' }} className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                {/*<canvas id="fake"></canvas>*/}
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

                    {/*<form method="get" title="Search Form" action="https://cse.google.com/cse/publicurl">
                        <div>
                            <input type="text" id="q" name="q" title="Search this site" alt="Search Text" maxlength="256" />
                            <input type="hidden" id="cx" name="cx" value="013626029654558379071:ze3tw4csia4" />
                            <input type="image" id="searchSubmit" name="submit" src="https://www.flaticon.com/free-icon/active-search-symbol_34148" alt="Go" title="Submit Search Query" />
                        </div>
                    </form>*/}
                    <button
                        className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        type="button"
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        onClick={onClickReview}
                    >New Revision</button>
                    <i style={{ marginLeft: 'auto', marginRight: 8 }} onClick={detailHandler}><PublicIcon /></i>
                    <i onClick={reviewsHandler}><HourglassFullTwoTone /></i>

                    <form>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <input type="text" onChange={e => setWorldSearch(e.target.value)} placeholder="Search" className="px-2 py-1 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                            <button onClick={e => searchWord(e)} type="submit" className="z-10 h-full leading-snug font-normal text-center text-gray-400 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-2 py-1">
                                <i className="fas fa-search"></i>
                            </button >
                        </div>
                    </form>
                    <div id="pesquisa">
                        {
                            itemsPesquisa?.map(c => (
                                <div key={c?.cacheId}>
                                    <h1>{c?.title}</h1>
                                    <div>{c?.htmlSnippet}</div>
                                    <img alt="" src={c?.pagemap?.cse_image[0]?.src} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                {!showDetail && !showRevisions ? null :
                    <span className="mt-2 mb-2 text-gray-600 m-4">{'Description : ' + item?.item?.description}</span>}
                {!showDetail ? null : <div className="px-4 py-5 ">

                    <div className="items-right">
                        <i onClick={e => handleClickTakeScreenShot(e)}><ScreenShareIcon /></i>
                        {/*<img src={image} />*/}
                    </div>
                    {/*<div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabindex="-1" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;">*/}

                    <iframe ref={frameRef} id={item.item._id}
                        className="relative"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        crossOrigin={'anonymous'}
                        frameBorder="0" style={{ width: "100%", height: "25em" }}
                        key={item.item._id} title={item.item._id}
                        src={`https://www.bing.com/search?q=${item?.item?.title?.replace(' ', '+')}`}>
                    </iframe>
                    {/*</div>*/}
                </div>}
                {/*<RevisionTimeSmall itemRevision={item.revisions} />*/}
                {!showRevisions ? null : <HorizontalTimeLine itemRevision={item.revisions} />}
            </div>
        </div>
    )
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function Next() {

    const { setMessage, } = useContext(DefaultContext);
    const focusTextArea = useRef(null)

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false);

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
        await newRevision({ curr: curr, revisonNote: stateToHTML(revisonNote.getCurrentContent()), revisionDate: revisionDate })
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
                {/*<ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />*/}
                {data.length === 0 ? <Loading /> : data.filter(a => showAnimation ? a.item?._id !== curr.itemId : a.item?._id)
                    .map((c, index) => <CardContent item={c}
                        key={index}
                        current={curr}

                        showCard={showCard} setShowCard={setShowCard}
                        revisionHanlder={() => {
                            //Alterando as propriedades para o item atual
                            callModal({ categoryId: c.categoryId, itemId: c.item._id })
                            //focusTextArea.current.focus()
                        }}
                    />)}
            </div>
        </>
    );
}
