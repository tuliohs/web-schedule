import React, { useContext, useCallback, useEffect } from "react";
import { useTranslation } from 'react-i18next';

import DefaultContext from 'constants/data/DefaultContext'
import StoreContext from 'constants/data/StoreContext'
import useStorage from 'utils/hooks/useStorage'
import { getUser } from 'api/user.api'
import history from 'utils/history'
import storage from 'utils/storage'
import CardLetter from 'components/Cards/CardLetter'
import UserDropdown from "components/Dropdowns/UserDropdown";

export const logoutHandler = e => {
  e.preventDefault()
  storage.remove('token')
  history.push('/')
}
export const editProfileHandler = e => {
  e.preventDefault()
  history.push('/customize/profile')
}
export const itemsDropUser = [
  { label: " Edit Profile", action: editProfileHandler, showSlideBar: false },
  { label: " Logout", action: logoutHandler, showSlideBar: true },
]
export const ContentDropUser = ({ user }) => {
  return (<span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
    {user?.imageData ? <img
      alt="..."
      className="w-full rounded-full align-middle border-none shadow-lg"
      src={user?.imageData}
    /> : <CardLetter letter={user?.firstName} size="small" />}
  </span>)
}

export const DropDownLanguage = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useStorage('lng')

  useEffect(() => {
    //Caso não esteja selecionado nenhum idioma
    if (!language)
      setLanguage("en")
  }, [setLanguage, language])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng) //change in session
    setLanguage(lng) //change in local storage
  }

  const itemsDroplanguage = [
    { lng: "en", label: "English", icon: require('assets/locales/en.png'), action: () => changeLanguage("en") },
    { lng: "ptbr", label: "Portugues", icon: require('assets/locales/ptbr.png'), action: () => changeLanguage("ptbr") },
  ]
  const contentDroplanguage = (<span className="w-10 text-sm inline-flex items-center justify-between  ">
    <img alt="..."
      style={{ width: 20 }}
      className=" border-none shadow-lg"
      src={itemsDroplanguage.filter(c => c.lng === language)[0]?.icon}
    /><span>▼</span>
  </span>)

  return (
    <UserDropdown items={itemsDroplanguage} content={contentDroplanguage} />
  )
}

export default function Navbar({ label = "Dashboard" }) {

  const { user, setUser } = useContext(StoreContext);
  const { setMessage, } = useContext(DefaultContext);

  //hook relacionadas ao dropdown de Usuario
  const getUserHandler = useCallback(async () => {
    await getUser()
      .then(c => { setUser(c.data?.values) })
      .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
  }, [setMessage, setUser])

  useEffect(() => {
    //Fica verificando caso o user não esteja na memoria
    if (user?.email) return
    getUserHandler()
  }, [getUserHandler, user])


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
          {/* User (hidden significa que não será mostrado em layoute responsivo) */}
          <ul className="m-4 flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown items={itemsDropUser} content={<ContentDropUser user={user} />} />
          </ul>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <DropDownLanguage />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </ >
  );
}
