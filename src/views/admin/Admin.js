import React, { useState } from "react";

// components
import InputCsv from "views/admin/Home/InputCsv";
import DonwloaderCsv from './Home/DownloaderCsv'
import { obterScheduleItems } from 'api/mySchedule'


//className="z-10"
//OLD STYLES  NECESSARY
//className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
//className="bg-cover pb-16 relative content-center items-center justify-center min-h-screen-75"


export default function Admin() {

    const [allCatgs, setAllCategs] = useState()

    let items = []
    const getAllCategories = async () => {
        await obterScheduleItems()
            .then(c => {
                for (var cat of c.data) {
                    for (var ite of cat.items) {
                        if (ite?.revisions?.length > 0)
                            for (var rev of ite?.revisions) {
                                items.push({
                                    "Topic Title": cat.topic.title,
                                    "Topic Description": cat.topic.description,
                                    "Category Title": cat.title,
                                    "Category Description": cat.description,
                                    "Item Title": ite.title,
                                    "Item Description": ite.description,
                                    "Revision Create": rev.createDate,
                                    "Revision Note": rev?.note?.replace(/;/g, ""),//semicolon replace
                                    "Revision Date": rev.revisionDate
                                })
                            }
                        else
                            items.push({
                                "Topic Title": cat.topic.title,
                                "Topic Description": cat.topic.description,
                                "Category Title": cat.title,
                                "Category Description": cat.description,
                                "Item Title": ite.title,
                                "Item Description": ite.description,
                                "Revision Create": "",
                                "Revision Note": "",
                                "Revision Date": ""
                            })
                    }
                }

                setAllCategs(items)
            })
            .catch(e => { console.log(e) })
    }


    const modelImport = [
        {
            "Topic Title": null,
            "Topic Description": null,
            "Category Title": null,
            "Category Description": null,
            "Item Title": null,
            "Item Description": null,
        }
    ]

    return (
        <>
            <div className=" relative">
                <InputCsv />
                <DonwloaderCsv data={modelImport} label="Download Model" />
                <div>

                    <button className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                        type="button"
                        style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                        onClick={async () => getAllCategories()}
                    >Obter Categories</button>
                    <div>Total Catgs: {allCatgs?.length || 0}</div>
                    <DonwloaderCsv data={allCatgs} label="Download All Categories" />
                </div>
            </div>
        </>
    );
}
