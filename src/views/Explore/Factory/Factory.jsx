import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next'
import { Helmet } from "react-helmet";

import DefaultContext from 'constants/data/DefaultContext'
import StoreContext from 'constants/data/StoreContext'
import { obterPublicItems } from 'api/mySchedule'
import { forkTopic, inputStreamRouter } from 'api/schedule.api'

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loading from 'utils/Loading'
import Empty from 'utils/Empty'
import { submitDialog } from "views/customize/Topic/Topic";
import CardPost from "views/Explore/Factory/CardPost";
import { EPagePath } from "routes";
import baseRouter from "constants/config/baseRouter";

export default function Factory() {

    const history = useHistory()
    const { t } = useTranslation()
    const { setMessage } = useContext(DefaultContext);
    const { token } = useContext(StoreContext);
    const [topic, setTopic] = useState([])
    const [catgs, setCatgs] = useState([])
    const [loading, setLoading] = useState(true)

    const ToggleForkTopic = async ({ topicId, title }) => {
        if (!token) {
            history.push(`${baseRouter}/auth/login`)
            return setMessage({ type: 'info', text: t("explore.loginMsg"), timeExpire: 8 })
        }
        submitDialog({
            clickYes: async () => await forkTopic(topicId)
                .then(res => setMessage({ type: 'sucess', text: res?.data?.message }))
                .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
            , label: t("explore.confirmFork").replace("RPLC1", title)
        })
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
                setCatgs(c.data)
                setTopic(uniqueArray)
                setLoading(false)
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

    useEffect(() => {
        const inpStrHandler = async () => await inputStreamRouter(EPagePath.Explore)
        inpStrHandler()
    }, [])


    return (
        <>
            {/*<StepMenu defaultStepNum={0} />*/}
            <div className="flex  " style={{ justifyContent: "center" }}>
                <Helmet>
                    <title>Factory - Forgetion Explore</title>
                    <meta name="Explore topics by others users or publish your topics" content="Allows you to explore forgetion themes" />
                </Helmet>
                <div className=" mb-6"  >
                    {/*---------BUTTON ADD TOPIC*/}
                    {/*<ItemDialog addItemHandler={addTopicHandler}
                        title='Add Topic'
                        subTitle='Add new topic to started memorize  '
                        btnLabel="Add Topic"
                    />*/}
                </div>
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
            {token && !loading && <Empty />}
        </>
    );
}
