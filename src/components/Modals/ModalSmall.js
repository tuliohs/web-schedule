import React from 'react'

import DateTimePicker from 'react-datetime-picker';
import "./ModalSmall.css"
import "./DatePicker.less"
import TxtEditor from 'components/Inputs/TxtEditor'

export default function ModalSmall({ title = null, content = null, showModal, setShowModal, editorState, setEditorState, action, revisionDate, setRevisionDate, item = null }) {
    return (
        <>
            {showModal ? (
                <>
                    <div className="ajust inset-0 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none justify-center items-center flex" id="small-modal-id">
                        {/*<div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >*/}
                        <div className="relative w-auto my-6 mx-auto max-w-sm ajustb">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className=" border-b border-solid border-gray-300 rounded-t">

                                    <div className="flex items-start justify-between p-5 ">
                                        <h3 className="text-3xl font-semibold">
                                            {title}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                        </span>
                                        </button>
                                    </div>
                                    <span className="p-5  font-semibold text-xl ml-4">{item ? item[0]?.title : null}</span>
                                </div>

                                {/*body*/}
                                <div className="relative p-6 flex-auto ajustc">
                                    <div className="mb-3 pt-0">

                                        <div className="flex items-center  justify-between m-24"
                                            style={{ margin: "5%" }}
                                        >
                                            <span className="font-semibold text-xl ml-4">Date:</span>
                                            <div className="Sample__container">
                                                <main className="Sample__container__content">
                                                    <DateTimePicker
                                                        amPmAriaLabel="Select AM/PM"
                                                        calendarAriaLabel="Toggle calendar"
                                                        clearAriaLabel="Clear value"
                                                        dayAriaLabel="Day"
                                                        hourAriaLabel="Hour"
                                                        maxDetail="second"
                                                        minuteAriaLabel="Minute"
                                                        monthAriaLabel="Month"
                                                        nativeInputAriaLabel="Date and time"
                                                        onChange={setRevisionDate}
                                                        secondAriaLabel="Second"
                                                        value={revisionDate}
                                                        yearAriaLabel="Year"
                                                    />
                                                </main>
                                            </div>
                                        </div>
                                        <TxtEditor setEditorState={setEditorState} editorState={editorState} />
                                        {/*<textarea autoFocus={true} type="text" placeholder="Insert one note about your revision"
                                            value={text ?? undefined}
                                            //ref={refField}
                                            onChange={e => setText(e.target.value)}
                                            className="px-3 py-4 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" />*/}
                                    </div>
                                    <p className="my-4 text-gray-600 text-lg leading-relaxed">
                                        {content}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b ajustc">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                      </button>
                                    {/*buttonSave*/}
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={action}
                                    >
                                        Save
                      </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null
            }
        </>
    );
}