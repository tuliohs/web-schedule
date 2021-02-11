import React, { useEffect, useState, useContext, useCallback } from "react";

import { obterPublicItems } from 'api/mySchedule'
import { forkTopic } from 'api/schedule.api'

import 'components/Buttons/buttonHover.css'
import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
import StoreContext from 'constants/data/StoreContext'
// components
//import ItemDialog from '../ItemDialog'
//import StepMenu from '../StepMenu'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'

import CardPost from "views/Explore/Factory/CardPost";
import { useHistory } from "react-router";

const Writes = {
    en: {
        loginMessage: "Log in To copy a topic",
        subTitle: "Explore",
        acess: "Acess",
        explore: "Explore"

    }
}

export default function Factory() {

    const [topic, setTopic] = useState([])
    const [catgs, setCatgs] = useState([])
    const [loading, setLoading] = useState(true)

    const history = useHistory()
    const { setMessage } = useContext(DefaultContext);
    const { token } = useContext(StoreContext);

    const ToggleForkTopic = async ({ topicId }) => {
        if (!token) {
            history.push("/auth/login")
            return setMessage({ type: 'info', text: Writes.en.loginMessage, timeExpire: 8 })
        }

        console.log(topicId, 'factory')
        await forkTopic(topicId).then(res => setMessage({ type: 'sucess', text: res?.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }

    const getCategories = useCallback(async () => {//show topics without data
        await obterPublicItems()
            .then(c => {
                var uniqueArray = c.data.reduce(function (a, d) {
                    if (!a.find(ae => ae._id === d.topic._id && ae.title === d.topic.title)) {
                        a.push(d.topic);
                    }
                    return a;
                }, [])
                setLoading(false)
                setCatgs(c.data)
                console.log(uniqueArray)
                setTopic(uniqueArray)
            }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }, [setMessage])

    //const getTopics = useCallback(async () => {//show topics without data
    //    await obterTemas()
    //        .then(c => {
    //            setLoading(false)
    //            setTopic(c.data)
    //        }).catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    //}, [setMessage])

    useEffect(() => {
        getCategories()
    }, [getCategories])


    return (
        <>
            {/*<StepMenu defaultStepNum={0} />*/}
            <div className="flex  " style={{ justifyContent: "center" }}>
                <div className=" mb-6"  >
                    {/*---------BUTTON ADD TOPIC*/}
                    {/*<ItemDialog addItemHandler={addTopicHandler}
                        title='Add Topic'
                        subTitle='Add new topic to started memorize  '
                        btnLabel="Add Topic"
                    />*/}
                </div>
                {console.log(topic)}
                <div className=" bg-transparent justify-center items-center text-center">
                    {
                        topic?.length === 0 && catgs?.length === 0
                            ? <Loading loading={loading} /> :
                            //topic.map(c => <CardFactory key={c._id} topic={c}
                            //    categories={catgs?.filter(y => y.topic?._id === c._id)}
                            //    getTopics={getTopics} />)
                            topic.map(c => <CardPost key={c._id} topic={c}
                                ToggleForkTopic={ToggleForkTopic}
                                categories={catgs?.filter(y => y.topic?._id === c._id)}
                            />)
                    }
                </div>
            </div>
            {token && <Empty />}
        </>
    );
}
