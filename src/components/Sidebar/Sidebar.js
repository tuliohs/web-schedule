/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import { itemsDropUser, ContentDropUser, DropDownLanguage } from 'components/Navbars/AdminNavbar'
import StoreContext from 'constants/data/StoreContext'
import NotificationDropdown from "components/Dropdowns/NotificationDropdown";
import UserDropdown from "components/Dropdowns/UserDropdown";
import ItemBar from 'components/Sidebar/LeftBar/ItemBar'
import DefaultButton from "components/Buttons/DefaultButton";
import baseRouter from "constants/config/baseRouter";

export default function Sidebar() {

  const { t } = useTranslation()
  const { user } = React.useContext(StoreContext);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const theme = " bg-gray-200 "// "bg-white"

  return (
    <>
      <nav className={theme + "relative md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl  flex flex-wrap items-center justify-between md:w-48    z-10 py-4 px-6"}>
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow(theme + " m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          {/*<a
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            href="/"
          >
            Forgetion
          </a>*/}

          <a className=" md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0 "
            href="/">
            <img
              style={{ width: 40, margin: 'auto', marginBottom: 2 }}
              alt="" src={require('assets/logo/logo_size_invert_red.jpg')} />
            {/*<img alt="" src={require('assets/logo/text-red.png')} />*/}
          </a>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown items={itemsDropUser} content={<ContentDropUser user={user} />} />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Forgetion
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className={theme + "px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"}
                />
              </div>
            </form>

            {/*---------------------------------MY SCHEDULE-------------------------------------*/}
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {t("slidebar.MySchedule")}
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/myschedule/schedule`} name={t("slidebar.Schedule")} />
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/myschedule/next`} name={t("slidebar.Next")} faIcon="stopwatch" />
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/myschedule/revision`} name={t("slidebar.Revision")} faIcon="history" />
            </ul>

            {/*---------------------------------CUSTOMIZE-------------------------------------*/}
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {t("slidebar.Customize")}
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/customize/lab/topic`} name={t("slidebar.Laboratory")} faIcon="flask" />
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/customize/profile`} name={t("slidebar.Profile")} faIcon="user-circle" />
            </ul>

            {/*---------------------------------EXPLORE-------------------------------------*/}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {t("slidebar.Explore")}
            </h6>  <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/explore/factory`} name={t("slidebar.Factory")} faIcon="globe" />
              <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/explore/statistics`} name={t("slidebar.Statistics")} faIcon="chart-bar" />
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/*------------------------------------------------------------------------ */}
            {/*----------------------- ADMIN ROUTES------------------------------------ */}
            {/*------------------------------------------------------------------------ */}
            {user?.role === 'admin' &&
              <>
                <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Admin Layout Pages
            </h6>
                {/* Navigation */}

                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/admin/home`} name="Admin" />
                  <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/admin/users`} name="Users" />
                  <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/admin/trafic`} name="Trafic" />
                  <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/admin/dashboard`} name="Dashboard" />
                  <ItemBar setCollapseShow={setCollapseShow} path={`${baseRouter}/admin/tables`} name="Tables" />
                </ul>

                {/* Divider */}
                <hr className="my-4 md:min-w-full" />
                {/* Heading */}
                <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Auth Layout Pages
            </h6>
                {/* Navigation */}

                <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                  <li className="items-center">
                    <Link
                      className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                      to={`${baseRouter}/auth/login`}
                    >
                      <i className="fas fa-fingerprint text-gray-500 mr-2 text-sm"></i>{" "}
                  Login
                </Link>
                  </li>

                  <li className="items-center">
                    <Link
                      className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                      to={`${baseRouter}/auth/register`}
                    >
                      <i className="fas fa-clipboard-list text-gray-400 mr-2 text-sm"></i>{" "}
                  Register
                </Link>
                  </li>
                </ul>

                {/* Divider */}
                <hr className="my-4 md:min-w-full" />
                {/* Heading */}
                <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  No Layout Pages
            </h6>
                {/* Navigation */}

                <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">

                  <li className="items-center">
                    <Link
                      className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                      to={`${baseRouter}/profile`}
                    >
                      <i className="fas fa-user-circle text-gray-500 mr-2 text-sm"></i>{" "}
                  Profile Page
                </Link>
                  </li>
                </ul>

                {/* Divider */}
                <hr className="my-4 md:min-w-full" />
                {/* Heading */}
                <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Documentation
            </h6>
                {/* Navigation */}
                <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fas fa-paint-brush mr-2 text-gray-400 text-base"></i>
                  Styles
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fab fa-css3-alt mr-2 text-gray-400 text-base"></i>
                  CSS Components
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fab fa-angular mr-2 text-gray-400 text-base"></i>
                  Angular
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fab fa-js-square mr-2 text-gray-400 text-base"></i>
                  Javascript
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fab fa-react mr-2 text-gray-400 text-base"></i>
                  NextJS
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fab fa-react mr-2 text-gray-400 text-base"></i>
                  React
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fas fa-link mr-2 text-gray-400 text-base"></i>
                  Svelte
                </a>
                  </li>

                  <li className="inline-flex">
                    <a
                      href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus"
                      target="_blank"
                      className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                    >
                      <i className="fab fa-vuejs mr-2 text-gray-400 text-base"></i>
                  VueJS
                </a>
                  </li>
                </ul>
              </>}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/*A classe md:hidden indica que será mostrado apenas em displays medios (dispositios moveis mobile responsive)*/}
            <div className="md:hidden">
              <DropDownLanguage />
              <hr className="my-4 md:min-w-full" />

              <ul >
                {
                  itemsDropUser
                    .filter(c => c.showSlideBar)
                    .map(element => (
                      <DefaultButton label={element.label}
                        onClick={element.action}
                      />
                    ))
                }
              </ul>
            </div>
          </div >
        </div >
      </nav >
    </>
  );
}
