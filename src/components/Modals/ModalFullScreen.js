import React from 'react'

export default function ModalFullScreen({ clild, full }) {
    return (
        <div className={full && "ajust P-8 inset-0 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none justify-center items-center flex"}>
            {/*<div className="relative w-auto my-6 mx-auto max-w-sm ajustb">*/}
            <div className={full && "border-0 h-full rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"}>
                {/*<div className=" h-full border-b border-solid border-gray-300 rounded-t">*/}
                {/*<div className="flex h-full items-start justify-between p-5 ">*/}
                {clild}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}