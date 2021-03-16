import React, { FunctionComponent } from "react";

import 'components/Buttons/buttonHover.css'
import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
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
        title: string,
        description: string,
        imageData: string,
    },
    categories: Array<TCategory>,

    removeHandler: string,
    editHandler: string
}

const layoutColumn = false;

const CardContent: FunctionComponent<ICardFactory> = ({ topic, categories }) => {

    return (
        <div className="w-full  px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className=" flex ">
                        <div className=" " >
                            <h6 className="text-xl font-semibold">{topic?.title}</h6>
                            <p className="mt-2 mb-4 text-gray-600">{topic?.description}</p>
                            <div className="flex flex-wrap justify-center">
                                <div className=" sm:w-4/12 px-4">
                                    <img src={topic?.imageData} alt="..." className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>
                        </div>
                        <div className=" max-w-3-px  ">
                            {categories ?
                                categories.slice(0, 4).map((w: any) => (
                                    <div key={w.title}>

                                        <div className=" justify-around flex bg-teal-500 rounded-lg ">
                                            <div className=" w-full rounded-lg m-2 border-gray-400 border-0-5">
                                                <p className="text-teal-500 bg-white">{w?.title}</p>

                                            </div>
                                            < div
                                                className=" w-full flex flex-col rounded-lg m-2 border-gray-400 border-0-5">
                                                {w.items?.slice(0, 4).map((t: TItem) => (
                                                    <p className="bg-white">{t?.title}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                            }</div>

                        {layoutColumn && categories ?
                            categories.slice(0, 4).map((w: any) => (
                                <div key={w.title}>

                                    <div className=" justify-between flex ">
                                        <div className="p-10 min-w-140-px">
                                            <p className="text-gray-600">{w?.title}</p>

                                        </div>
                                        < div className=" flex flex-col">
                                            {w.items?.slice(0, 5).map((t: TItem) => (
                                                <p className="text-gray-600">{t?.title}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )) : null
                        }
                    </div>

                </div>

            </div>



        </div >
    )
}

export default CardContent