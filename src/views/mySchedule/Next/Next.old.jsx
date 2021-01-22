import React, { useCallback, useRef, useState, useContext, createRef, useEffect } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'

import moment from 'moment'
//import { Animated } from "react-animated-css";

//components
import ModalSmall from 'components/Modals/ModalSmall'
import DefaultContext from 'constants/data/DefaultContext'
import Loading from 'utils/Loading'
import HorizontalTimeLine from './HorizontalTimeLine'

import html2canvas from 'html2canvas'
import * as htmlToImage from 'html-to-image';
import domtoimage from 'dom-to-image'

import axios from 'axios'

import PublicIcon from '@material-ui/icons/Public';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import HourglassFullTwoTone from '@material-ui/icons/HourglassFullTwoTone';

import captureFrame from 'capture-frame'
//import Iframe from 'react-iframe'


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
    const [image, setImage] = useState(null)
    const detailHandler = () => {
        setShowDetail(!showDetail)
        setShowRevisions(false)
    }
    const reviewsHandler = () => {
        setShowRevisions(!showRevisions)
        setShowDetail(false)
    }


    const captureSnapshot = (e) => {
        const video = e
        video.setAttribute('crossOrigin', 'anonymous');
        console.log(video);

        const buf = captureFrame(video);
        const image = document.createElement('img');
        image.setAttribute('crossOrigin', 'anonymous');
        image.setAttribute('src', window.URL.createObjectURL(new window.Blob([buf])));


        console.log('captured frame src', image);
        this.setState({ image: image.src });
    }


    const handleClickTakeScreenShot = async (e) => {
        //e.preventDefault();

        //const {
        //    cropPositionTop,
        //    cropPositionLeft,
        //    cropWidth,
        //    cropHeigth
        //} = this.state;

        //Html2canvas(document.getElementById('id'),
        //    { scale: 2, logging: false, useCORS: true, allowTaint: false, proxy: 'cross-domain url' }
        //).then(function (canvas) { document.body.appendChild(canvas); })

        //const body = document.getElementById(item.item._id)//frameRef?.current//.find('body')[0];
        //var x = body;
        //console.log(new URL(x.src).origin);

        const body = frameRef?.current//.find('body')[0];
        console.log('body', body)

        //await axios.post('http://localhost:4000/shot', {
        //    fileName: item.item._id,
        //    url: "https://brasilescola.uol.com.br/ingles/possessive-pronouns.htm"
        //}).then(a => ('ok', a))
        //    .catch(e => console.log('err', e))

        //domtoimage.toPng(body)
        //    .then(function (dataUrl) {
        //        //var img = new Image();
        //        //img.src = dataUrl;
        //        console.log(dataUrl)
        //        //document.body.appendChild(img);
        //    })
        //    .catch(function (error) {
        //        console.error('oops, something went wrong!', error);
        //    });

        //var domElement = document.getElementById('my-node');
        //htmlToImage.toJpeg(body)
        //    .then(function (dataUrl) {
        //        console.log(dataUrl);
        //        //download(dataUrl, 'image.jpeg');
        //    })
        //    .catch(function (error) {
        //        console.error('oops, something went wrong!', error);
        //    });

        await html2canvas(body).then(function (canvas) {
            console.log('aq', canvas.toDataURL())
            //var link = document.createElement("a");
            //document.body.appendChild(link);
            //link.download = "manpower_efficiency.jpg";
            //link.href = canvas.toDataURL();
            //link.target = '_blank';
            //link.click();
        }).catch(e => console.log('ht2 er', e))

        //html2canvas(body,
        //    { scale: 2, logging: false, useCORS: true, allowTaint: false, proxy: 'cross-domain url' }
        //).then(canvas => {
        //    let croppedCanvas = document.createElement("canvas");
        //    let croppedCanvasContext = croppedCanvas.getContext("2d");

        //    //croppedCanvas.width = cropWidth;
        //    //croppedCanvas.height = cropHeigth; 
        //    croppedCanvasContext.drawImage(
        //        canvas,
        //        0,
        //        1000
        //        //0, //cropPositionLeft,
        //        //0, //cropPositionTop,
        //        //0, //cropWidth,
        //        //0, //cropHeigth,
        //        //0,
        //        //0,
        //        //cropWidth,
        //        //cropHeigth
        //    );

        //    //this.props.onEndCapture(croppedCanvas.toDataURL());
        //    //console.log(croppedCanvas)
        //    console.log(croppedCanvas.toDataURL())
        //    setImage(croppedCanvas.toDataURL())
        //});


    };

    useEffect(() => {
        //window.addEventListener("message", function (event) {
        //    //You must check your origin!
        //    //if (event.origin !== "http://localhost:3000")
        //    //    return;
        //    //Get the data
        //    var data = event.data;
        //    console.log(data.curURL)
        //}, false);
    }, [])
    let pxy = 'https://cors-anywhere.herokuapp.com/'
    return (
        //<Animated animationIn="fadeIn" animationOut="slideOutUp" animationInDuration={0} animationOutDuration={700}
        //    isVisible={!showCard && current.itemId === item.item._id ? false : true}>
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
                    <button
                        className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        type="button"
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        onClick={revisionHanlder}
                    >New Revision</button>
                    {/*<div className="divhoverbutton" style={{ width: '12em' }}>
                        <a className="ahoverbutton" href="#/" onClick={revisionHanlder}>
                            <span className="spanhoverbutton"></span></a>
                    </div>*/}
                    <img
                        src=""
                    />
                    <i style={{ marginLeft: 'auto', marginRight: 8 }} onClick={detailHandler}><PublicIcon /></i>
                    <i onClick={reviewsHandler}><HourglassFullTwoTone /></i>
                </div>
                {!showDetail && !showRevisions ? null :
                    <span className="mt-2 mb-2 text-gray-600 m-4">{'Description : ' + item?.item?.description}</span>}
                {!showDetail ? null : <div className="px-4 py-5 ">
                    <div className="items-right">
                        <i onClick={e => handleClickTakeScreenShot(e)}><ScreenShareIcon /></i>
                        <img src={image} />
                    </div>

                    <iframe ref={frameRef} id={item.item._id}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        onLoad={() => {

                            //some custom settings
                            //this.width = screen.width; this.height = screen.height; this.passing = 0; this.frameBorder = "0";

                            //var iframe = frameRef?.current
                            //var href = iframe.contentWindow.location.href;
                            //var origin = iframe.contentWindow.location.origin;
                            //var url = iframe.contentWindow.location.url;
                            //var path = iframe.contentWindow.location.pathname;

                            //console.log("href: ", href)
                            //console.log("origin: ", origin)
                            //console.log("path: ", path)
                            //console.log("url: ", url)
                        }}
                        crossOrigin={'anonymous'}
                        frameBorder="0" style={{ width: "100%", height: "25em" }}
                        key={item.item._id} title={item.item._id}
                        //src={`https://www.bing.com/search?q=${item?.item?.title?.replace(' ', '+')}`}>

                        src={'http://localhost:5002'}>

                        //src={`${pxy}https://www.bing.com/search?q=${item?.item?.title?.replace(' ', '+')}`}>

                    </iframe>
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

        await nextHandler()

    }, [curr, revisionDate, revisonNote, setMessage, nextHandler])

    return (
        <>
            <div>
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote}
                    setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    refer={focusTextArea}
                    action={newReviewModal}
                    item={data.filter(a => a?.item?._id === curr?.itemId).map(c => { return c?.item })}
                />
                {/*<ControlledOpenSelect name='Topic' state={currentTopic} setState={setCurrentTopic} items={topic.map(a => ({ id: a._id, value: a.description }))} />*/}

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
