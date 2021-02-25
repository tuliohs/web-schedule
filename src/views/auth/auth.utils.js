import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


export const Header = ({ title }) => {
    const responseGoogle = (response) => {
        console.log(response);
    }
    const responseFacebook = (response) => {
        console.log(response);
    }
    return (
        <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
                <h6 className="text-gray-600 text-sm font-bold">
                    {title}
                </h6>
            </div>
            <div className="btn-wrapper text-center">
                {/*<button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                >
                    <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/github.svg")}
                    />
        Github
      </button>*/}
                {/*<FacebookLogin
                    appId="1902019823291956"
                    autoLoad={true}
                    fields="name,email,picture"
                    //onClick={componentClicked}
                    callback={responseFacebook} />*/}
                {/*<GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                >
                    <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/google.svg")}
                    />
        Google
      </button>*/}
            </div>
            <hr className="mt-6 border-b-1 border-gray-400" />
        </div>
    )
}

export const UserInput = ({ label, id, type, name, onChange, value, placeholder }) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const togglePassword = () => setPasswordShow(!passwordShow)

    return (
        <div className="relative w-full mb-3">
            <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                {label}
            </label>
            <input
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                placeholder={placeholder}
                id={id}
                type={type !== "password" ? type : !passwordShow ? "password" : "text"}
                name={name}
                onChange={onChange}
                value={value ?? ''}
                style={{
                    position: 'relative',
                    display: 'flex',
                    marginBottom: '14px'
                }}
            />
            {type === "password" &&
                <i
                    onClick={togglePassword}
                    className={"fas " + (!passwordShow ? "fa-eye" : "fa-eye-slash")}
                    style={{
                        position: 'absolute',
                        top: '55%',
                        right: '3%'
                    }}
                > </i>}
        </div>
    )
}