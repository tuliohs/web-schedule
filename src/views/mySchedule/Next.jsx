import React, { useRef, useState } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'

//components
import ModalSmall from 'components/Modals/ModalSmall'

const CardContent = ({ title, item, revision }) => {
    //let active = date
    return (
        <div className="items-center justify-center relative flex ">
            <div style={{ maxWidth: '75rem' }} className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    {/*<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                    </div>*/}
                    <h6 className="text-xl font-semibold">{title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{item?.detail?.nextReview}</p>
                    <div className="mt-2 mb-4 text-gray-600">{item?.item?.title}</div>
                    <p className="mt-2 mb-4 text-gray-600">{item?.detail?.state}</p>
                    <div className="divhoverbutton" style={{ width: "20%" }}>
                        <a className="ahoverbutton" onClick={revision}>
                            <span className="spanhoverbutton">Revision</span></a>
                    </div>
                </div>
            </div>
        </div>)
}

export default function Next() {

    const focusTextArea = useRef(null)

    const [data, setData] = useState([{}])
    const [showModal, setShowModal] = useState(false)

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(null)

    const [curr, setCurr] = useState({})
    React.useEffect(() => {
        const aa = async () => {
            await obterNextSchedule()
                .then(c => {
                    //Order to next review
                    function compare(a, b) {
                        if (a.detail?.nextReview > b.detail?.nextReview) return 1;
                        if (b.detail?.nextReview > a.detail?.nextReview) return -1;

                        return 0;
                    }
                    setData(c.data.sort(compare))
                }).catch(e => console.log("err", e))
        }
        aa()
    }, [])

    return (
        <>
            <div>
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote}
                    setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    refer={focusTextArea}
                    action={async () => {
                        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
                        setShowModal(false)
                        setRevisionNote(null)
                    }} />
                {!data ? null : data.map(c => <CardContent item={c}
                    revision={() => {
                        //Alterando as propriedades para o item atual
                        setCurr({ categoryId: c.categoryId, itemId: c.item._id })
                        setShowModal(true)
                        console.log(focusTextArea)
                        //focusTextArea.current.focus()
                    }}
                />)}
            </div>
        </>
    );
}
