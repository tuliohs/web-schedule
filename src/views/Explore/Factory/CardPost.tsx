import styled from 'styled-components'
import React, { FunctionComponent } from "react";

import 'components/Buttons/buttonHover.css'
// components
//import ItemDialog from '../ItemDialog'
//import StepMenu from '../StepMenu' 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { TItem } from "constants/Types";

type TCategory = {
    description: string,
    title: string,
    items: Array<TItem>
}

interface ICardFactory {
    topic: {
        _id: string,
        title: string,
        description: string,
        imageData: string,
        author?: string
    },
    categories: Array<TCategory>,
    removeHandler: string,
    editHandler: string,
    ToggleForkTopic: any
}

const Styles = styled.div`

max-width: 680px;
    min-width: 280px;

.jss58 {
    box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 3px 1px -2px rgb(0 0 0 / 12%);
} 
.jss55 {
    border-radius: 2px;
} 
.jss54 {
    background-color: #fff;
}
.jss1296{
    background-image: url(&quot;https://firebasestorage.googleapis.com/v0/b/love-social.appspot.com/o/images%2F90d38593-fd50-4897-859d-2592708eecd3.jfif?alt=media&amp;token=e4cd2312-89b8-48c6-a8a7-f5db17f555de&quot;)
}
.jss129{
    display: flex; 
    flex-direction: column; 
    align-items: center;
}
.jss1{
    style="background-color: white; display: none;
}


 .fontNova{

     -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif
 }
`


const CardPost: FunctionComponent<ICardFactory> = ({ topic, categories, ToggleForkTopic, editHandler }) => {
    console.log(topic._id, 'i')
    console.log(topic)
    const handleFork = async () => {
        await ToggleForkTopic({ topicId: topic._id, title: topic.title })
    }
    return (

        <div className="relative">
            <Styles>
                <div style={{ height: "16px" }} />
                <div className="jss54 jss58 jss55">
                    <div className="p-3">
                        <b className="text-lg   ">{topic.title[0]}</b>   {topic.title.substring(1)}
                        <p className="text-xs text-gray-500">{topic?.author || "Unknown Author"}</p>
                    </div>

                    {topic?.imageData ?
                        <>
                            <div className="jss1290 flex-row flex flew-wrap">
                                <div className="jss1296">
                                    <div>
                                        <img className="jss1298" src={topic?.imageData} />
                                    </div>
                                </div>
                                <div className=" max-w-3-px  ml-3 ">
                                    {categories ?
                                        categories.slice(0, 4).map((w: any) => (
                                            <div key={w.title}>

                                                <div className=" justify-around flex  ">
                                                    <div className=" w-full border-gray-400 border-0-5">
                                                        <p className="text-gray-500 text-sm bg-white fontNova ">
                                                            {w?.title}
                                                        </p>

                                                    </div>
                                                    < div
                                                        className=" w-full flex   flex-col  border-gray-400 border-0-5">
                                                        {w.items?.slice(0, 3).map((t: TItem) => (
                                                            <p className="bg-gray-300 text-sm fontNova">
                                                                {t?.title.length > 10 ? t?.title.substring(0, 10) + '...' : t?.title}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )) : null
                                    }</div>
                            </div>
                        </> :
                        <>
                            {categories ?
                                categories.slice(0, 4).map((w: any) => (
                                    <div key={w.title} className=" justify-around flex w-full ">

                                        <div className=" justify-around flex w-full ">
                                            <div className=" w-full border-gray-400 border-0-5">
                                                <p className="text-gray-500 text-sm bg-white">
                                                    {w?.title}
                                                </p>

                                            </div>
                                            < div
                                                className=" w-full flex   flex-col  border-gray-400 border-0-5">
                                                {w.items?.slice(0, 3).map((t: TItem) => (
                                                    <p className="bg-gray-300 text-sm fontNova">
                                                        {t?.title}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                            }
                        </>
                    }
                    <div style={{ height: "20px" }} />
                    <div className="p-4">
                        <button onClick={handleFork}
                        ><i className="fas fa-link"></i></button>
                    </div>
                </div>
            </Styles>

        </div>

    )

}
export default CardPost
