import React from "react";

// components
import InputCsv from "views/admin/Home/InputCsv";
import DonwloaderCsv from './Home/DownloaderCsv'

export default function Admin() {



    return (
        <>
            <div className=" relative">
                <InputCsv />
                <DonwloaderCsv />
            </div>
        </>
    );
}
