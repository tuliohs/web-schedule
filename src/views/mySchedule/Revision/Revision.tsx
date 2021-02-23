import React, { useState, useContext, useEffect, FunctionComponent } from "react";
import { useLocation } from 'react-router-dom'
import { obterRevisionsId, newRevision, obterAllRevision } from 'api/mySchedule'
import { EditorState } from "draft-js";

import DefaultContext from 'constants/data/DefaultContext'
// components
import ModalSmall from 'components/Modals/ModalSmall'
import RevisionTimeLine from './RevisionTimeLine'
import Loading from 'utils/Loading'
import Empty from "utils/Empty";

//const CardContent = ({ title, description, revision }) => {
//    return (
//        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//            <div className="px-4 py-5 flex-auto">
//                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
//                    <i className="fas fa-retweet"></i>
//                </div>
//                <h6 className="text-xl font-semibold">{title}</h6>
//                <p className="mt-2 mb-4 text-gray-600">{description}</p>
//                {title ? <div className="divhoverbutton" style={{ width: "20%" }}>
//                    <a className="ahoverbutton" href="#/" onClick={revision}>
//                        <span className="spanhoverbutton">New Revision</span></a>
//                </div> : null}

//            </div>
//        </div>)
//}

type TRevision = {
    revisionDate: string,
    note: string
}

type TCurrentItem = {

    categoryId: string,
    itemId: string,
    title: string,
    description: string,
    revisions?: Array<TRevision>
}
const Revision: FunctionComponent<TCurrentItem> = () => {
    let location: any = useLocation();

    const { setMessage } = useContext(DefaultContext);

    const [data, setData] = useState([{}])
    const [showModal, setShowModal] = useState(false)

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState(EditorState.createEmpty())
    const [loading] = useState(false)

    const emptyValues: TCurrentItem = { categoryId: "", itemId: "", title: "", description: "", }
    const [currentItem, setCurrentItem] = useState<TCurrentItem>(emptyValues)
    useEffect(() => {
        if (currentItem === emptyValues) {
            setCurrentItem({
                categoryId: location.state?.categoryId,
                itemId: location.state?.item._id,
                title: location.state?.item.title,
                description: location.state?.item.description
            })
        }
    }, [location, currentItem])

    React.useEffect(() => {
        const aa = async () => {
            if (location.state?.item && !data && currentItem)
                setData(location.state?.item.revisions)
            else if (currentItem !== emptyValues && currentItem?.categoryId !== undefined)
                await obterRevisionsId(currentItem)
                    .then(c => {
                        setData(c.data)
                        //Alterando as propriedades para o item atual
                        //setCurrentItem({ categoryId: location.state?.categoryId, itemId: location.state?.item._id })
                    }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
            else if (!location.state?.item && currentItem === emptyValues)
                await obterAllRevision()
                    .then(c => {
                        setData(c.data)
                    }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        }
        aa()
    }, [location, setMessage, currentItem])

    const newRevisionHandler = async () => {
        setShowModal(false)
        await newRevision({ curr: currentItem, revisonNote: revisonNote, revisionDate: revisionDate })
            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }
    const callModal = () => {
        setRevisionDate(new Date())
        setShowModal(true)
        setRevisionNote(EditorState.createEmpty())
    }

    return (
        <>
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                {/*Modal para criar uma nova revisão*/}
                <ModalSmall title="New Revision" setShowModal={setShowModal}
                    showModal={showModal}
                    revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    action={newRevisionHandler}
                    editorState={revisonNote} setEditorState={setRevisionNote}
                />
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                            <i className="fas fa-retweet"></i>
                        </div>
                        <h6 className="text-xl font-semibold">{currentItem.title}</h6>
                        <p className="mt-2 mb-4 text-gray-600">{currentItem.description}</p>
                        {currentItem?.title ? <button className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                            type="button"
                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                            onClick={callModal}
                        >New Revision</button>

                            : null}
                    </div>
                </div>
                {
                    data?.length === 0 ? <Loading loading={loading} /> : <RevisionTimeLine itemRevision={data} />
                }
                {!loading && <Empty itemPageLength={data?.length} />}
            </div>
        </>
    );
}
export default Revision