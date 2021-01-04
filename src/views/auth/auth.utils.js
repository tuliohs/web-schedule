import React from 'react'

export const Header = ({ title }) => {
    return (
        <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
                <h6 className="text-gray-600 text-sm font-bold">
                    {title}
                </h6>
            </div>
            <div className="btn-wrapper text-center">
                <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                >
                    <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/github.svg")}
                    />
        Github
      </button>
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
      </button>
            </div>
            <hr className="mt-6 border-b-1 border-gray-400" />
        </div>)
}

export const UserInput = ({ label, id, type, name, onChange, value, placeholder }) => {
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
                type={type}
                name={name}
                onChange={onChange}
                value={value ?? ''}
            />
        </div>
    )
}