import React, { FunctionComponent } from 'react'

import { CSVDownloader } from 'react-papaparse'

export default function Component() {
    return (
        <CSVDownloader
            data={[
                {
                    "Topic Title": null,
                    "Topic Description": null,
                    "Category Title": null,
                    "Category Description": null,
                    "Item Title": null,
                    "Item Description": null,
                }
            ]}
            type="button"
            filename={'filename'}
            bom={false}

        >
            Download
        </CSVDownloader>
    )
}
