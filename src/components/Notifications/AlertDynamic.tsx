import React, { FunctionComponent, useEffect } from "react";


enum ETipoTheme {
    sucess = "bg-green-500",
    danger = "bg-red-600",
    info = "bg-blue-500",
}

export type TMessage = {
    type: 'sucess' | 'danger' | 'info',
    text: string,
    timeExpire?: number
}

export interface IMessage {
    message: TMessage,
    setMessage: React.Dispatch<React.SetStateAction<TMessage>>,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    showAlert: boolean,
}

const AlertDynamic: FunctionComponent<IMessage> = ({ showAlert, setShowAlert, message }) => {

    useEffect(() => {
        const intervalo = setInterval(() => {
            setShowAlert(false);
        }, (message?.timeExpire || 5) * 1000) //Substitui componentDidAmount
        return () => clearInterval(intervalo) //Substitui componentWillUnmount
    }, [setShowAlert]);

    //const  cor_grau= message?.type === 'sucess' ? 'bg-green-500' : message?.type === 'info' ? 'bg-blue-500' : 'bg-red-600'

    return (
        <>
            {showAlert && message?.text ? (
                <div
                    className={`${ETipoTheme[message?.type]} fixed text-white px-6 py-4 border-0 rounded mb-0 ml-0`}
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '10px',
                        //width: '200px',
                        //height: '100px'
                        width: '80%',
                        //minWidth: '28rem',
                        maxWidth: '28rem'
                    }} // width: '40%', marginLeft: '46%', marginTop: 'auto', marginBottom: '0px', marginRight: '5%' }}
                >
                    <span className="text-xl inline-block mr-5 align-middle m-2">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        <b className="capitalize"></b>{message.text}</span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-6 m-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setShowAlert(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null
            }
        </>
    );
};

export default AlertDynamic;