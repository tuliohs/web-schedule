import React, { useEffect, useState, useContext, useCallback } from "react";

import { newTopic, removeTopicId, obterTemas } from 'api/mySchedule'

import DeleteIcon from '@material-ui/icons/Delete';

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
// components
import AddUserItem from './AddItemDialog'
import StepMenu from '../StepMenu'

const CardContent = ({ item, revision, removeHandler }) => {
    return (
        <div className="w-full  px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div style={{ justifyContent: 'center' }} className="items-center text-center flex">

                        <div className="items-center text-center" >
                            <div className="flex flex-wrap justify-center">
                                <div className=" sm:w-4/12 px-4">
                                    <img src={item.imageData} alt="..." className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-xl font-semibold">{item?.title}</h6>
                            <p className="mt-2 mb-4 text-gray-600">{item?.description}</p>
                            <p className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">{item?.detail?.state}</p>
                            {!item?.detail?.lastDateReview ? null : <p className="mt-2 mb-4 text-gray-600">{`Last Revision in ${item.detail.lastDateReview}`}</p>}
                            {/*<button class="button-rgb" type="button">NEW REVISION</button>*/}
                            <div className="divhoverbutton">
                                <a className="ahoverbutton" href="#/" onClick={revision}><span className="spanhoverbutton">Show Category</span></a>
                            </div>
                        </div>
                        <div style={{ width: '10%' }}>
                            < DeleteIcon onClick={() => removeHandler(item._id)} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default function Topic() {

    const [topic, setTopic] = useState([])

    const { setMessage } = useContext(DefaultContext);

    const getTopics = useCallback(async () => {//show topics without data
        await obterTemas()
            .then(c => {
                setTopic(c.data)
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage])

    useEffect(() => {

        getTopics()
    }, [getTopics])

    const addTopicHandler = async ({ item, image }) => {
        await newTopic({ item: item, image: image })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getTopics()
            })
            .catch(e => setMessage({ type: 'danger', text: e }))
    }

    const removeTopicHandler = async (id) => {
        await removeTopicId({ topicId: id })
            .then(() => {
                getTopics()
            })
    }

    return (
        <>
            <StepMenu defaultStepNum={0} />
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <div className=" mb-6"  >
                    {/*---------BUTTON ADD TOPIC*/}
                    <AddUserItem addItemHandler={addTopicHandler} />
                </div>
                <div className="w-full mb-12 px-4">
                    <div>
                        {!topic ? null : topic.map(c => <CardContent key={c._id} item={c} removeHandler={removeTopicHandler} />)}
                    </div>
                </div>
            </div>
        </>
    );
}
