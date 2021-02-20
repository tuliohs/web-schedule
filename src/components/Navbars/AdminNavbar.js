import React, { useContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { getUser } from 'api/user.api'
import DefaultContext from 'constants/data/DefaultContext'
import StoreContext from 'constants/data/StoreContext'

import CardLetter from 'components/Cards/CardLetter'

import UserDropdown from "components/Dropdowns/UserDropdown";
import IconDropDown from 'components/Dropdowns/IconDropdown'

export default function Navbar({ label = "Dashboard" }) {

  const { i18n } = useTranslation()
  const { removeToken, user, setUser } = useContext(StoreContext);
  const [imageLanguage, setImageLanguage] = useState(require('assets/locales/en.png'))
  const history = useHistory()
  const { setMessage, } = useContext(DefaultContext);
  const getUserHandler = useCallback(async () => {
    await getUser()
      .then(c => { setUser(c.data?.values) })
      .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
  }, [setMessage, setUser])

  const logoutHandler = e => {
    e.preventDefault()
    removeToken('token')
  }

  const editProfileHandler = e => {
    e.preventDefault()
    history.push('/customize/profile')
  }

  useEffect(() => {
    //Fica verificando caso o user não esteja na memoria
    if (user?.email) return
    getUserHandler()
  }, [getUserHandler, user])


  const itemsDropUser = [
    { label: " Edit Profile", action: editProfileHandler },
    { label: " Logout", action: logoutHandler },
  ]
  const contentDropUser = (<span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
    {user?.imageData ? <img
      alt="..."
      className="w-full rounded-full align-middle border-none shadow-lg"
      src={user?.imageData}
    /> : <CardLetter letter={user?.firstName} size="small" />}
  </span>)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    let newLng = itemsDroplanguage.filter(c => c.lng === lng)[0]?.icon
    setImageLanguage(newLng)
  }
  const itemsDroplanguage = [
    { lng: "en", label: "English", icon: require('assets/locales/en.png'), action: () => changeLanguage("en") },
    { lng: "ptbr", label: "Portugues", icon: require('assets/locales/ptbr.png'), action: () => changeLanguage("ptbr") },
  ]
  const contentDroplanguage = (<span className="w-10 text-sm inline-flex items-center justify-between  ">
    <img alt="..."
      style={{ width: 20 }}
      className=" border-none shadow-lg"
      src={imageLanguage}
    /><span>▼</span>
  </span>)

  return (
    < >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {label}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown items={itemsDropUser} content={contentDropUser} />
          </ul>
          <ul className="flex-col md:flex-row list-none items-center m-2   md:flex">
          </ul>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown items={itemsDroplanguage} content={contentDroplanguage} />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </ >
  );
}
