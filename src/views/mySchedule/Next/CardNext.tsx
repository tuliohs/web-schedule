import React, { useCallback, useRef, useState, useContext, createRef, FunctionComponent } from "react";

import moment from 'moment'
import axios from 'axios'
import styled from 'styled-components'

//components
import HorizontalTimeLine from './HorizontalTimeLine'
import { TNext } from 'constants/Types'
import LabelStateColor from 'utils/LabelStateColor'

import PublicIcon from '@material-ui/icons/Public';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import HourglassFullTwoTone from '@material-ui/icons/HourglassFullTwoTone';

const Styles = styled.div`

/*
width: 75px;
height: 68px; 
    top: -3px;
    right: -3px; 
    */
width: 35px;
height: 38px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    right: -3px; 

.ribbon:hover{
    font-size: 8px;
    opacity:0.7;
}

.ribbon {
    padding: 0;
    font-size: 0px;
    display: block;
    font-family: 'Segoe UI',Arial, sans-serif;
    font-weight: 300;
    color: #fff;
    text-align: center;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    position: relative;
    padding: 7px 0;
    left: -5px;
    top: 15px;
    width: 120px;
    line-height: 3px; 
    -webkit-box-shadow: 0px 0px 3px rgb(0 0 0 / 30%);
    -moz-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 3px rgb(0 0 0 / 30%);
    opacity:0.4;
}

`


export type TCardNext = {
    item: TNext,
    revisionHanlder: any
}

const CardNext: FunctionComponent<TCardNext> = ({ item, revisionHanlder/*, showCard, setShowCard, current*/ }) => {
    const frameRef: any = createRef()
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
    //const handleClickTakeScreenShot = async () => {

    //    const displayMediaOptions = { video: { mediaSource: 'screen' } }
    //    let captureStream = null;
    //    const canvas = document.getElementById('fake')
    //    try {
    //        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    //        // get correct video track
    //        const track = captureStream.getVideoTracks()[0]
    //        // init Image Capture and not Video stream
    //        const imageCapture = new ImageCapture(track)
    //        // take first frame only
    //        const bitmap = await imageCapture.grabFrame()
    //        // destory video track to prevent more recording / mem leak
    //        track.stop()
    //        // this could be a document.createElement('canvas') if you want
    //        // draw weird image type to canvas so we can get a useful image
    //        canvas.width = bitmap.width
    //        canvas.height = bitmap.height
    //        const context = canvas.getContext('2d')
    //        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
    //        const image = canvas.toDataURL()
    //        // this turns the base 64 string to a [File] object
    //        const res = await fetch(image)
    //        const buff = await res.arrayBuffer()
    //        // clone so we can rename, and put into array for easy proccessing
    //        const file = [
    //            new File([buff], `photo_${new Date()}.jpg`, {
    //                type: 'image/jpeg',
    //            }),
    //        ]
    //        return console.log('file', file);

    //    } catch (err) { console.error("Error: " + err); }
    //    //finally { setFullPrint(false) }

    //}
    const searchWord = async () => {
        //e.preventDefault();
        const apiKey = 'AIzaSyA8vljIcmebx3rfSfxZ2fv_32CKTeHGp3A'
        const mechanism = '30fdb3668b1bd72bc'
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
        <div className="items-center relative justify-center  flex ">
            <div style={{ maxWidth: '75rem' }} className=" flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="transparent relative px-4 py-5 flex-auto flex flex-row flex-wrap">
                    <Styles >
                        <div className={"ribbon " + (item?.detail?.nextIsToday ? "bg-gray-900" : "bg-blue-600")}>{item?.detail?.nextIsToday && 'Today'}</div>
                    </Styles>
                    {/*<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                    </div>*/}
                    {/*<h6 className="text-xl font-semibold">{title}</h6>*/}
                    <div style={{ width: '12em' }} className="mt-2 mb-4 text-gray-600"><b className="mr-2">{item?.item?.title}</b></div>
                    <p style={{ width: '18em' }} className="mt-2 mb-4 text-gray-600">Next Review:{' ' + moment(item?.detail?.nextReview).format('DD/MM/YYYY HH:mm')}</p>

                    <span style={{ width: '12em' }}>
                        <LabelStateColor

                            state={item?.detail?.state} color={item?.detail?.color} />
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

                    {/*<form>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <input type="text" onChange={e => setWorldSearch(e.target.value)} placeholder="Search" className="px-2 py-1 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                            <button onClick={() => searchWord()} type="submit" className="absolute z-10 h-full leading-snug font-normal text-center text-gray-400 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-2 py-1">
                                <div> <i className=" fas fa-search"></i></div>
                            </button >
                        </div>
                    </form>*/}
                    {/*<div id="pesquisa">
                        {
                            itemsPesquisa?.map((c: any) => (
                                <div key={c?.cacheId}>
                                    <h1>{c?.title}</h1>
                                    <div>{c?.htmlSnippet}</div>
                                    <img alt="" src={c?.pagemap?.cse_image[0]?.src} />
                                </div>
                            ))
                        }
                    </div>*/}
                </div>
                {!showDetail && !showRevisions ? null :
                    <span className="mt-2 mb-2 text-gray-600 m-4">{'Description : ' + item?.item?.description}</span>}
                {!showDetail ? null : <div className="px-4 py-5 ">

                    <div className="items-right">
                        <i
                        //onClick={e => handleClickTakeScreenShot(e)}
                        ><ScreenShareIcon /></i>
                        {/*<img src={image} />*/}
                    </div>
                    {/*<div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabindex="-1" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;">*/}

                    <iframe ref={frameRef} id={item.item._id}
                        className="relative"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        //crossOrigin={'anonymous'}
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

export default CardNext