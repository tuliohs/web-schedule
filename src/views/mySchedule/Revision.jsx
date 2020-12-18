import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import { obterRevisionsId, newRevision } from 'api/mySchedule'

// components
import ModalSmall from 'components/Modals/ModalSmall'
import TimeLine from './RevisionTimeLine'

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
                    <a className="ahoverbutton" onClick={revision}>
                        <span className="spanhoverbutton">New Revision</span></a>
                </div>
            </div>
        </div>)
}

export function EmptyRevision() {
    return (
        <div className="px-4 py-5 flex-auto ">
            <h6 className="text-xl font-semibold">The history of your revisions will appear here</h6>
        </div>
    )
}

export default function Revision() {
    let location = useLocation();
    const [data, setData] = useState([{}])
    const [showModal, setShowModal] = useState(false)
    const [revisonNote, setRevisionNote] = useState(null)
    const [curr, setCurr] = useState({})

    React.useEffect(() => {
        const aa = async () => {
            if (!location.state) return
            await obterRevisionsId(location)
                .then(c => {
                    console.log(c.data)
                    setData(c.data)
                })
                .catch(e => console.log("err", e))
        }
        aa()
    }, [location])

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
