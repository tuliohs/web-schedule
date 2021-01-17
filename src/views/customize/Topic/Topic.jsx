import React, { useEffect, useState, useContext, useCallback } from "react";

import { newTopic, removeTopicId, obterTemas, editTopic } from 'api/mySchedule'

import DeleteIcon from '@material-ui/icons/Delete';

import 'components/Buttons/buttonHover.css'
import DefaultContext from 'constants/data/DefaultContext'
// components
import ItemDialog from '../ItemDialog'
import StepMenu from '../StepMenu'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const submitDialog = async ({ clickYes }) => {
    return confirmAlert({
        //title: 'Confirm to submit',
        message: 'Are you sure want you to delete.',
        buttons: [
            { label: 'Yes', onClick: () => clickYes() },
            { label: 'No', onClick: () => { return false } }
        ]
    });
};

const CardContent = ({ topic, removeHandler, editHandler }) => {
    return (
        <div className="w-full  px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div style={{ justifyContent: 'center' }} className="items-center text-center flex">

                        <div className="items-center text-center" >
                            <div className="flex flex-wrap justify-center">
                                <div className=" sm:w-4/12 px-4">
                                    <img src={topic?.imageData} alt="..." className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>
                        </div>
                        <div className="items-center flex flex-col">
                            <h6 className="text-xl font-semibold">{topic?.title}</h6>
                            <p className="mt-2 mb-4 text-gray-600">{topic?.description}</p>
                            <div className="mt-2 ml-4 flex flex-row justify-center" style={{ width: '10%', justifyContent: 'space-around' }}>
                                <i className="m-2 mt-2 mb-4 ">  < DeleteIcon onClick={() => removeHandler(topic._id)} /></i>
                                <i className="m-2 mt-2 mb-4 "> <ItemDialog type="edit"
                                    title='Edit Topic' receivedItems={topic}
                                    addItemHandler={editHandler} /> </i>
                            </div>
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
        submitDialog({
            clickYes: async () => await removeTopicId({ topicId: id })
                .then(res => {
                    setMessage({ type: 'sucess', text: res?.data?.message })
                    getTopics()
                })
                .catch(e => setMessage({ type: 'danger', text: e }))
        })
    }
    const editTopicHandler = async ({ item, image }) => {
        //item['_id'] = item._id
        await editTopic({ item: item, image: image })
            .then(res => {
                setMessage({ type: 'sucess', text: res?.data?.message })
                getTopics()
            })
            .catch(e => setMessage({ type: 'danger', text: e }))
    }


    return (
        <>
            <StepMenu defaultStepNum={0} />
            <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
                <div className=" mb-6"  >
                    {/*---------BUTTON ADD TOPIC*/}
                    <ItemDialog addItemHandler={addTopicHandler}
                        title='Add Topic'
                        subTitle='Add new topic to started memorize  '
                        btnLabel="Add Topic"
                    />
                </div>

                <div className="w-full mb-12 px-4">
                    <div>
                        {!topic ? null : topic.map(c => <CardContent key={c._id} topic={c} removeHandler={removeTopicHandler} editHandler={editTopicHandler} getTopics={getTopics} />)}
                    </div>
                </div>
            </div>
        </>
    );
}
