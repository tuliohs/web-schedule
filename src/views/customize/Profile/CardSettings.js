import React from "react";

import { UserInput } from 'views/auth/auth.utils'
import { ProfilePicture } from './CardProfile'

import { Link } from 'react-router-dom';
// components

export default function CardSettings({ setValues, onChange, values, onSave, title = "My account", showImage = false, linkLater = "" }) {
    const changeImage = ({ field, value }) => {
        setValues({
            ...values,
            [field]: value
        })
    }
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-gray-800 text-xl font-bold"> {title}</h6>
                        {/*<button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Settings
            </button>*/}
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
            </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <UserInput label="Email address" id="email" type="text" name="email"
                                    onChange={onChange} value={values.email} placeholder="Email address"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <UserInput label="Phone Number" id="phone" type="text" name="phone"
                                    onChange={onChange} value={values.phone} placeholder="Phone Number"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <UserInput label="First Name" id="firstName" type="text" name="firstName"
                                    onChange={onChange} value={values.firstName} placeholder="First Name"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <UserInput label="Last Name" id="lastName" type="text" name="lastName"
                                    onChange={onChange} value={values.lastName} placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-gray-400" />

                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Contact Information
            </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <UserInput label="Address" id="address" type="text" name="address"
                                    onChange={onChange} value={values.address} placeholder="Address"
                                />
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <UserInput label="City" id="city" type="text" name="city"
                                    onChange={onChange} value={values.city} placeholder="City"
                                />
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <UserInput label="Country" id="country" type="text" name="country"
                                    onChange={onChange} value={values.country} placeholder="Country"
                                />
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <UserInput label="Postal Code" id="postalCode" type="text" name="postalCode"
                                    onChange={onChange} value={values.postalCode} placeholder="Postal Code"
                                />
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-gray-400" />

                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            About Me
            </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        About me
                  </label>
                                    <textarea
                                        type="text"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                        //defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                                        rows="4"
                                        id="about" name="about"
                                        onChange={onChange} value={values.about} placeholder="About"
                                    ></textarea>
                                </div>
                            </div>
                            {showImage &&
                                <ProfilePicture values={values}
                                    image={values?.imageData}
                                    changeImage={changeImage}
                                    avatarCircle={false}
                                />
                            }
                            <div className="w-full rounded-t mb-0 px-6 py-6 flex" >
                                {linkLater &&
                                    <Link to={linkLater}>
                                        <button
                                            className="bg-gray-500 active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={onSave}
                                        >Later</button>
                                    </Link>}
                                <div className="text-right w-full">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onSave}
                                    >Save</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
