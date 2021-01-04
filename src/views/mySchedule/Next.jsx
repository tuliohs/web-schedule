import React, { useCallback, useRef, useState, useContext } from "react";
import { obterNextSchedule, newRevision } from 'api/mySchedule'
import moment from 'moment'

//components
import ModalSmall from 'components/Modals/ModalSmall'
import DefaultContext from 'constants/data/DefaultContext'
import Loading from 'utils/Loading'
import GamesIcon from '@material-ui/icons/Games';

export const LabelStateColor = ({ state, color }) => {
    return (<>
        <p className="mt-2 mb-4 text-gray-600">
            <i className={`fas fa-circle text-${color}-500 mr-2`}></i>
            {state}</p>
    </>)
}

const CardContent = ({ item, revision }) => {
    console.log(item)
    const expanndHandler = () => {

    }
    return (
        <div className="items-center justify-center relative flex ">

            <div style={{ maxWidth: '75rem' }} className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto flex flex-row">
                    {/*<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                    </div>*/}
                    {/*<h6 className="text-xl font-semibold">{title}</h6>*/}
                    <div style={{ width: '20%' }} className="mt-2 mb-4 text-gray-600"><b className="mr-2">{item?.item?.title}</b></div>

                    <p style={{ width: '30%' }} className="mt-2 mb-4 text-gray-600">Next Review:{' ' + moment(item?.detail?.nextReview).format('DD/MM/YYYY HH:mm')}</p>
                    <span style={{ width: '20%' }}>
                        <LabelStateColor state={item?.detail?.state} color={item?.detail?.color} />
                    </span>
                    <div className="divhoverbutton" style={{ width: "20%" }}>
                        <a className="ahoverbutton" href="#/" onClick={revision}>
                            <span className="spanhoverbutton">Revision</span></a>
                    </div>
                    <i style={{ marginLeft: 'auto', marginRight: 8 }} onClick={expanndHandler}><GamesIcon /></i>
                </div>

                <div className="px-4 py-5 ">
                    {item?.item?.description}
                </div>
            </div>
        </div>)
}


export default function Next() {

    const { setMessage, } = useContext(DefaultContext);
    const focusTextArea = useRef(null)

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const [revisionDate, setRevisionDate] = useState(new Date());
    const [revisonNote, setRevisionNote] = useState('')

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
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage])

    React.useEffect(() => {
        nextHandler()
    }, [nextHandler])

    const newReviewModal = async () => {
        setShowModal(false)
        await newRevision({ curr: curr, revisonNote: revisonNote, revisionDate: revisionDate })
            .then(c => setMessage({ type: 'sucess', text: c?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
        setRevisionNote(null)
        await nextHandler()
    }

    return (
        <>
            <div>
                <ModalSmall title="New Revision" setShowModal={setShowModal} showModal={showModal} text={revisonNote}
                    setText={setRevisionNote} revisionDate={revisionDate} setRevisionDate={setRevisionDate}
                    refer={focusTextArea}
                    action={newReviewModal}
                    item={data.filter(a => a?.item?._id === curr?.itemId).map(c => { return c?.item })}
                />

                {data?.map((c, index) => <CardContent item={c}
                    key={index}
                    revision={() => {
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
