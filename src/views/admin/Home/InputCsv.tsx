import React, { Component, useState } from 'react';
import { CSVReader } from 'react-papaparse';

import { uploadTCI } from 'api/apiFile'
const CSVReader2 = () => {

    const [fileData, setFileData] = useState()

    const handleOnDrop = (data: any) => {
        setFileData(data)

        //console.log('---------------------------');
        //console.log(data);
        //console.log('---------------------------');
    };

    const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
        console.log(err);
    };

    const handleOnRemoveFile = (data: any) => {
        //console.log('---------------------------');
        //console.log(data);
        //console.log('---------------------------');
    };

    const sendData = () => {
        uploadTCI(fileData)
            .then(c => console.log(c.data))
            .catch(c => console.log(c))
    }

    return (
        <>
            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Import CSV file here.</span>
            </CSVReader>
            <button onClick={sendData}>Send</button>
            <div>

            </div>
            <table>
                {JSON.stringify(fileData)}
            </table>
        </>
    );
}

export default CSVReader2 