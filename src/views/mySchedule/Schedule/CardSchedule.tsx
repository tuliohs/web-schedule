import React, { FunctionComponent, useState } from "react";
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import moment from 'moment'

import 'components/Buttons/buttonHover.css'
// components
import { LabelStateColor } from 'utils/LabelStateColor'
import { TItem } from "../../../constants/Types";
import DefaultDropDown, { TItemDropDown } from "components/Dropdowns/DefaultDropDown";
import { changeItem } from "api/mySchedule";

interface ISchedule {
    categoryId: string,
    item: TItem,
    revision: Function,
    setMessage: any
}

export const listLevels: Array<TItemDropDown> = [
    { id: "1", value: "Beginner" },
    { id: "2", value: "Easy" },
    { id: "3", value: "Normal" },
    { id: "4", value: "Hard" },
    { id: "5", value: "Challenging" }]

const CardSchedule: FunctionComponent<ISchedule> = ({ categoryId, item, revision, setMessage }) => {

    const changeItemHandler = async (value: any) => {
        item["level"] = value
        const filter = { categoryId: categoryId, itemId: item._id }
        const content = item
        await changeItem({ filter: filter, content: content })
            .then(e => setMessage({ type: 'sucess', text: e.data?.message }))
            .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
    }

    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="flex">
                        <div style={{ width: "80%", marginLeft: "10%" }}>
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                                <i className={"fas fa-" + (item?.iconName || "retweet")}></i>
                            </div>
                        </div>
                        <Link className="relative w-auto pl-4 flex-initial"
                            to={{ pathname: "revision", state: { item: item, categoryId: categoryId } }}
                        >
                            < ExitToAppIcon />
                        </Link>
                    </div>
                    <h6 className="text-xl font-semibold">{item?.title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{item?.description}</p>
                    <div className="flex justify-between pl-10 flex-row full mb-6" >
                        <LabelStateColor state={item?.detail?.state} color={item?.detail?.color} />
                        <DefaultDropDown
                            items={listLevels}
                            name="Level"
                            defaultElment={listLevels.filter(c => c.id === item.level)[0]?.value}
                            setState={changeItemHandler}
                            theme={{ color: "gray", grau: "100", fontColor: "gray-200" }}
                        />
                    </div>
                    {!item?.detail?.nextReview ? null : <p className="mt-2 mb-4 text-gray-600">Next : <b>{moment(item?.detail?.nextReview).format('DD/MM/YYYY HH:mm')}</b></p>}
                    <button className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        type="button"
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        onClick={() => revision()}
                    >New Revision</button>
                </div>
            </div>
        </div>
    )
}
export default CardSchedule