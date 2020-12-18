import React from "react";
import './AlertDynamic.css'

const AlertDynamic = ({ showAlert, setShowAlert, message, seconds = 5 }) => {

    React.useEffect(() => {
        const intervalo = setInterval(() => {
            setShowAlert(false);
        }, seconds * 1000); //Substitui componentDidAmount
        return () => clearInterval(intervalo); //Substitui componentWillUnmount
    }, [seconds, setShowAlert]);
    return (
        <>
            {showAlert ? (
                <div
                    className="fixed text-white px-6 py-4 border-0 rounded bg-blue-500 mb-0 ml-0"
                    style={{ width: '40%', marginLeft: '46%', marginTop: 'auto', marginBottom: '0px', marginRight: '5%' }}
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        <b className="capitalize">blue!</b>{message}</span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setShowAlert(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default AlertDynamic;