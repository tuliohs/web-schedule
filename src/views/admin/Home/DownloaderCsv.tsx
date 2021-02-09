import React, { FunctionComponent } from 'react'

import { CSVDownloader } from 'react-papaparse'

interface IDonwloader {
    data: any,
    label: string,
    disable?: boolean,
    fileName?: string
}
const DownloaderCsv: FunctionComponent<IDonwloader> = ({ data, label, fileName = new Date().toString() }) => {
    console.log(data)
    return (
        <CSVDownloader
            data={data}
            type="button"
            filename={fileName}
            bom={true}
        >
            <button className={`text-white font-bold uppercase p-3 text-sm px-6  rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-teal-500 active:bg-teal-600 ease-linear transition-all duration-150`}
                type="button"
                disabled={!data || data?.length === 0}
                style={{ textAlign: 'left', justifyContent: 'flex-start' }}
            >{label}</button>

        </CSVDownloader>
    )
}
export default DownloaderCsv