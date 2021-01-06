import React, { useState, useContext } from "react";
import { useLocation } from 'react-router-dom'
import { obterRevisionsId, newRevision, obterAllRevision } from 'api/mySchedule'

import DefaultContext from 'constants/data/DefaultContext'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import RevisionTimeLine from './RevisionTimeLine'

const CardContent = ({ title, description, revision }) => {
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
            <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i className="fas fa-retweet"></i>
                </div>
                <h6 className="text-xl font-semibold">{title}</h6>
                <p className="mt-2 mb-4 text-gray-600">{description}</p>
                {title ? <div className="divhoverbutton" style={{ width: "20%" }}>
                    <a className="ahoverbutton" href="#/" onClick={revision}>
                        <span className="spanhoverbutton">New Revision</span></a>
                </div> : null}

            </div>
        </div>)
}

export default function Revision() {
    let location = useLocation();

    const { setMessage } = useContext(DefaultContext);

    const [data, setData] = useState([{}])
    const [showModal, setShowModal] = useState(false)

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(null)

    const [curr, setCurr] = useState({})

    React.useEffect(() => {
        const aa = async () => {
            if (location?.state?.item?._id)
                await obterRevisionsId(location)
                    .then(c => {
                        setData(c.data)
                    }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
            else
                await obterAllRevision()
                    .then(c => {
                        setData(c.data)
                    }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))

        }
        aa()
    }, [location, setMessage])


    const newRevisionHandler = async () => {
        setShowModal(false)
        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        setRevisionNote(null)
    }


    return (
        <>
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                {/*Modal para criar uma nova revisão*/}
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote}
                    setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    action={newRevisionHandler} />
                <CardContent revision={() => {
                    //Alterando as propriedades para o item atual
                    setCurr({ categoryId: location.state?.categoryId, itemId: location.state?.item._id })
                    setShowModal(true)
                    //focusTextArea.current.focus()
                }}
                    title={location.state?.item.title} description={location.state?.item.description} />
                {
                    !data ? null : <RevisionTimeLine itemRevision={data} />
                }
            </div>
        </>
    );
}
