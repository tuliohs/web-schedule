import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import Axios from 'axios'


import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

// components
import ModalSmall from 'components/Modals/ModalSmall'

const defaultDescr = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp"
export const currentItem = { id: 3, title: 'Greetings (cumprimentos).', description: defaultDescr, priority: 'little' }

const CardContent = ({ title, description, revision }) => {
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
            <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i className="fas fa-retweet"></i>
                </div>
                <h6 className="text-xl font-semibold">{title}</h6>
                <p className="mt-2 mb-4 text-gray-600">{description}</p>
                <div className="divhoverbutton" style={{ width: "20%" }}>
                    <a className="ahoverbutton" onClick={revision}><span className="spanhoverbutton">New Revision</span></a>
                </div>
            </div>
        </div>)
}

export function TimeLine({ itemRevision }) {
    console.log(itemRevision)
    return (
        <VerticalTimeline>
            {itemRevision.map(c =>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }  }
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date={c.revisionDate}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<OfflineBoltIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Creative Director</h3>
                    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                    <p>{c.note}</p>
                </VerticalTimelineElement>
            )}
            {/*last element for complementary content*/}
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            //icon={<StarIcon />}
            />
        </VerticalTimeline>)
}


export function EmptyRevision() {
    return (
        <div className="px-4 py-5 flex-auto ">
            <h6 className="text-xl font-semibold">The history of your revisions will appear here</h6>
        </div>
    )
}

export const newRevision = async ({ curr, revisonNote }) => {
    console.log('cursor', curr)
    const url = "http://localhost:9090/v1/categorySchedule/review"
    await Axios.put(url, {
        filter: {
            categoryId: curr.categoryId,
            itemId: curr.itemId
        },
        content: {
            note: revisonNote,
            revisionDate: "01-01-2021"
        }
    })
        .then(c => {
            console.log(c.data)
            //setData(c.data)
        })
        .catch(e => console.log("err", e))
}

export default function Revision() {
    let location = useLocation();
    const [data, setData] = useState([{}])
    const [showModal, setShowModal] = useState(false)
    const [revisonNote, setRevisionNote] = useState(null)
    const [curr, setCurr] = useState({})

    React.useEffect(() => {
        console.log(location.state)
        if (!location.state) return
        const url = `http://localhost:9090/v1/categorySchedule/review/${location.state?.categoryId}/${location.state?.item._id}`
        Axios.get(url)
            .then(c => {
                console.log(c.data)
                setData(c.data)
            })
            .catch(e => console.log("err", e))
    }, [])

    return (
        <>
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                {/*Modal para criar uma nova revisão*/}
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote} setText={setRevisionNote}
                    action={async () => {
                        await newRevision({ curr: curr, revisonNote: revisonNote })
                        setShowModal(false)
                    }} />
                <CardContent revision={() => {
                    //Alterando as propriedades para o item atual
                    setCurr({ categoryId: location.state?.categoryId, itemId: location.state?.item._id })
                    setShowModal(true)
                }} title={location.state?.item.title} description={location.state?.item.description} />
                {
                    !data ?
                        <EmptyRevision /> :
                        <TimeLine itemRevision={data} />
                }

            </div>
        </>
    );
}
