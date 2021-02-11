import React, { useEffect, useState, useContext, useCallback } from "react";

import { newTopic, removeTopicId, obterTemas, editTopic } from 'api/mySchedule'

import { Link } from 'react-router-dom'

import 'components/Buttons/buttonHover.css'
import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
// components
import ItemDialog from '../ItemDialog'
import StepMenu from '../StepMenu'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'
import DefaultButton from 'components/Buttons/DefaultButton'

import DialogContentText from '@material-ui/core/DialogContentText'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'

import DeleteIcon from '@material-ui/icons/Delete';

const Writes = {
    en: {
        messageTopicPublicTrue: "Will be public",
        messageTopicPublicFalse: "it will only be private",
        messageAuhorTrue: "Authorship will be shown",
        messageAuhorFalse: "Authorship will no longer be shown",
    },
    pt: {
        messageTopicPublicTrue: "Ficará Publico",
        messageTopicPublicFalse: "Será somente privado",
        messageAuhorTrue: "A autoria será mostrada",
        messageAuhorFalse: "A autoria não será mais mostrada",
    }
}

export const submitDialog = async ({ clickYes, label }) => {
    return confirmAlert({
        //title: 'Confirm to submit',
        message: 'Are you sure want you to delete ' + label,
        buttons: [
            { label: 'Yes', onClick: () => clickYes() },
            { label: 'No', onClick: () => { return false } }
        ]
    });
};

const CardContent = ({ topic, removeHandler, editHandler, setMessage }) => {
    const [switchPublic, setSwitchPublic] = useState(topic.public)
    const [switchShowAuthor, setSwitchShowAuthor] = useState(topic.showAuthor)

    const changePublic = () => {
        topic['public'] = !topic.public
        if (!topic.public) {  //desabilitar show autor caso o topcio não seja publico
            topic['showAuthor'] = false
            setSwitchShowAuthor(false)
        }
        setSwitchPublic(!switchPublic)
        editHandler({ item: topic, image: { imageData: topic.imageData, imageName: topic.imageName } })
            .then(res => {
                let msgPublic = topic['public'] ? Writes.en.messageTopicPublicTrue : Writes.en.messageTopicPublicFalse
                let msgType = topic['public'] ? 'sucess' : 'info'
                setMessage({ type: msgType, text: msgPublic })
            })
            .catch(e => setMessage({ type: 'danger', text: e }))
    }
    const changeShowAuthor = () => {
        topic['showAuthor'] = !topic.showAuthor
        setSwitchShowAuthor(!switchShowAuthor)
        editHandler({ item: topic, image: { imageData: topic.imageData, imageName: topic.imageName } })
            .then(res => {
                let msgAuthor = topic['showAuthor'] ? Writes.en.messageAuhorTrue : Writes.en.messageAuhorFalse
                let msgType = topic['showAuthor'] ? 'sucess' : 'info'
                setMessage({ type: msgType, text: msgAuthor })
            })
            .catch(e => setMessage({ type: 'danger', text: e }))
    }
    return (
        <div className="w-full  px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div style={{ justifyContent: 'center' }} className="items-center  text-center flex">

                        <div className="items-center text-center" >
                            <div className="flex flex-wrap justify-center">
                                <div className=" sm:w-4/12 px-4">
                                    <img src={topic?.imageData} className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>
                        </div>
                        <div className="items-center flex flex-col">
                            <h6 className="text-xl font-semibold">{topic?.title}</h6>
                            <p className="mt-2 mb-4 text-gray-600">{topic?.description}</p>
                            <div className="mt-2 ml-4 flex flex-row justify-center" style={{ width: '10%', justifyContent: 'space-around' }}>
                                <i className="m-2 mt-2 mb-4 ">  < DeleteIcon onClick={() => removeHandler(topic._id, topic?.title)} /></i>
                                <i className="m-2 mt-2 mb-4 "> <ItemDialog type="edit"
                                    title='Edit Topic' receivedItems={topic}
                                    addItemHandler={editHandler}
                                /> </i>
                            </div>
                            <Link className="relative w-auto pl-4 flex-initial"
                                to={{ pathname: "category", state: { topicId: topic._id } }}
                            >
                                <DefaultButton label="Show Categories" fontSize="xs"
                                    theme={{ color: "white", grau: "200", fontColor: "gray-600" }}
                                    padding="px-2" upper={false}
                                />
                            </Link>

                        </div>
                        <div className="items-center flex flex-col">
                            <DialogContentText>Public</DialogContentText>
                            <Tooltip title="Public">
                                <Switch
                                    color="primary"
                                    size="small"
                                    checked={topic?.public}
                                    onChange={changePublic}
                                    value="addMultiple"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </Tooltip>
                            {switchPublic &&
                                <><DialogContentText >Show Authorship</DialogContentText>
                                    <Tooltip title="Public">
                                        <Switch
                                            size="small"
                                            color="primary"
                                            checked={topic?.showAuthor}
                                            onChange={changeShowAuthor}
                                            value="addMultiple"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </Tooltip></>
                            }

                        </div>


                    </div>

                </div>
            </div>


        </div>
    )
}
export default function Topic() {

    const [topic, setTopic] = useState([])
    const [loading, setLoading] = useState(true)

    const { setMessage, empType, setEmpType } = useContext(DefaultContext);

    const getTopics = useCallback(async () => {//show topics without data
        await obterTemas()
            .then(c => {
                setLoading(false)
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
                if (empType === EEmpty.Topic)
                    setEmpType(EEmpty.Category)
            })
            .catch(e => setMessage({ type: 'danger', text: e }))
    }

    const removeTopicHandler = async (id, title) => {
        submitDialog({
            clickYes: async () => await removeTopicId({ topicId: id })
                .then(res => {
                    setMessage({ type: 'sucess', text: res?.data?.message })
                    getTopics()
                    if (topic.length === 0)
                        setEmpType(EEmpty.Category)
                })
                .catch(e => setMessage({ type: 'danger', text: e }))
            , label: 'the topic "' + title + '"'
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
                <div className=" mb-6 flex"  >
                    <span className=" text-gray-800 flex mr-5 text-2xl font-bold">
                        Laboratory
                    </span>
                    {/*---------BUTTON ADD TOPIC*/}
                    <ItemDialog addItemHandler={addTopicHandler}
                        title='Add Topic'
                        subTitle='Add new topic to started memorize  '
                        btnLabel="Add Topic"
                    />
                </div>
                <div className="w-full mb-12 px-4">
                    <div>
                        {
                            topic?.length === 0
                                ? <Loading loading={loading} /> :
                                topic.map(c => <CardContent key={c._id} topic={c}
                                    removeHandler={removeTopicHandler}
                                    editHandler={editTopicHandler}
                                    getTopics={getTopics}
                                    setMessage={setMessage}
                                />)
                        }
                    </div>
                    <Empty />
                </div>
            </div>
        </>
    );
}
