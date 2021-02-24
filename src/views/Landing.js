import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
// components
//import Navbar from "components/Navbars/AuthNavbar.js";
import DefaultNavbar from "components/Navbars/DefaultNavbar/DefaultNavBar";
import Footer from "components/Footers/Footer.js";
import backgroundHourGlass from 'assets/landing/hourglass.jpeg'
import backgroundWriteType from 'assets/landing/write-type.jpg'
import styled from 'styled-components'
import { getRandom } from 'components/Dropdowns/IconDropdown'

const Styles = styled.div`



.section-dark {
  background-color: #0b1011;
}
.page-header { 
  background-position: center center;
  background-size: cover;
  min-height: 90vh;
  max-height: 999px;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter::after {
  background-color: rgba(0, 0, 0, 0.5);
  content: "";
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
}
.p-after::after{
  position: absolute;
}
.moving-clouds {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 250.625em;
  height: 43.75em;
  -webkit-animation: cloudLoop 80s linear infinite;
  animation: cloudLoop 80s linear infinite;
  
}

@keyframes cloudLoop{   0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}
                        100%{-webkit-transform:translate3d(-50%,0,0);
                        transform:translate3d(-50%,0,0)}
                    }
`

const PortaitSession = () => {
  const { t } = useTranslation()

  const items = [
    { title: t("landing.portrait1title"), description: t("landing.portrait1desc"), img: require("assets/landing/demontration/topic.png") },
    { title: t("landing.portrait2title"), description: t("landing.portrait2desc"), img: require("assets/landing/demontration/category.png") },
    { title: t("landing.portrait3title"), description: t("landing.portrait3desc"), img: require("assets/landing/demontration/item.png") },
    { title: t("landing.portrait4title"), description: t("landing.portrait4desc"), img: require("assets/landing/demontration/revision.png") },
  ]
  return (
    <section className="pt-20 pb-48">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold">{t("landing.parag3title")}</h2>
            <p className="text-lg leading-relaxed m-4 text-gray-600">
              {t("landing.parag3tx")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">

          {items.map(element => (
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-12">

              <div className="px-12">
                <img
                  alt="..."
                  src={element.img}
                  className="shadow-lg rounded-full mx-auto max-w-180-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">{element.title}</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {element.description}
                  </p>
                  {/*<div className="mt-6">
           <button
             className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
             type="button"
           >
             <i className="fab fa-twitter"></i>
           </button>
           <button
             className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
             type="button"
           >
             <i className="fab fa-facebook-f"></i>
           </button>
           <button
             className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
             type="button"
           >
             <i className="fab fa-dribbble"></i>
           </button>
         </div>*/}
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>


  )
}

let arrayBackground = [backgroundHourGlass, backgroundWriteType]
//gera uma umagem aleatoria que será mostrada no background
const backgroundImg = arrayBackground[getRandom(arrayBackground.length - 2)]

export default function Landing() {
  const { t } = useTranslation()
  const moreitems = false
  return (
    <>
      <DefaultNavbar />
      <main>
        <>
          <Styles>
            <div
              className="
             section-dark absolute  top-0 w-full h-full relative pt-32 pb-48 flex
             content-center items-center justify-center min-h-screen-75 page-header
              "
              style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundColor: "black",
                //opacity: "0.5"
              }}
            >
              <div className="filter" />
              <div className="content-center absolute z-50">
                <div className="container relative mx-auto">
                  <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-9/12 px-4 ml-auto mr-auto text-center">
                      <div className="pr-12">
                        <h1 className="p-after text-white font-semibold text-5xl">{t("landing.slogan")}</h1>
                        <p className="mt-4 text-lg text-gray-300">{t("landing.initText")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="moving-clouds"
                style={{
                  backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
                }}
              />
            </div>
          </Styles>
          {/*<span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>*/}
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </>
        <section className="pb-20 pt-16 bg-gray-300 -mt-24  ">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap ">

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center ">
                <div
                  className="z-40 relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto " >
                    <div className="bg-red-300 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg ">
                      <i className="fas fa-calculator"></i>
                    </div>
                    <h6 style={{ fontFamily: "Open Sans,Arial,sans-serif" }} className="text-xl font-semibold">{t("landing.lbCard1")}</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      {t("landing.txCard1")}
                    </p>
                  </div>
                </div>
              </div>
              {/*Card 2*/}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="z-40 relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className=" bg-primary px-4 py-5 flex-auto">
                    <div className="  bg-white text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg">
                      <i className="text-primary fas fa-retweet"></i>
                    </div>
                    <h6 style={{ fontFamily: "Open Sans,Arial,sans-serif" }} className="text-xl text-white font-semibold">{t("landing.lbCard2")}</h6>
                    <p className="mt-2 mb-4 text-white">
                      {t("landing.txCard2")}
                    </p>
                  </div>
                </div>
              </div>
              {/*Card 3*/}
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="z-40 relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg bg-green-400">
                      <i className="fas fa-chart-bar"></i>
                    </div>
                    <h6 style={{ fontFamily: "Open Sans,Arial,sans-serif" }} className="text-xl font-semibold">{t("landing.lbCard3")}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{t("landing.txCard3")}</p>
                  </div>
                </div>
              </div>
            </div>
            {/*Sessão 2*/}
            <div className="flex flex-wrap items-center mt-32">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src={require("assets/landing/demontration/factory.png")}
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-blue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blue-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold"> {t("landing.parag2title")} </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      {t("landing.parag2tx")}
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fas fa-fingerprint"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              {t("landing.parag2topic1")}
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fab fa-html5"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              {t("landing.parag2topic2")}
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="far fa-paper-plane"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">Dynamic components</h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/*Forgetion Curve*/}
        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <div className="container mx-auto px-4">
            {/*Forgetion Curve*/}
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-chart-line text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  We use the science of the Forgetthin Curve
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  The curve shows how information is lost over time when there is no
                  attempt to retain it.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  A related concept is the strength of memory that refers to the durability
                  that memory traces in the brain.
                </p>
                <Link to="/myschedule/schedule" className="font-bold text-gray-800 mt-8">
                  Start Now!
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg  ">
                  <img
                    alt="..."
                    src="https://www.growthengineering.co.uk/wp-content/uploads/2016/11/the-forgetting-curve.png"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      {/*<polygon
                        points="-30,95 583,95 583,65"
                        className="text-blue-600 fill-current"
                      ></polygon>*/}
                    </svg>
                    <h4 className="text-xl font-bold">
                      This is fantastic!
                    </h4>
                    <p className="text-md font-light mt-2">
                      It is not about how much you learn, but how you learn.
                      You are the most responsible for what you
                      will retain for your mind.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PortaitSession />
        {moreitems &&
          <> <section className="pb-20 relative block bg-gray-900">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">
                    Build something
                </h2>
                  <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    Put the potentially record low maximum sea ice extent tihs
                    year down to low ice. According to the National Oceanic and
                    Atmospheric Administration, Ted, Scambos.
                </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">
                    Excelent Services
                </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Grow your market
                </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Launch time
                </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                </p>
                </div>
              </div>
            </div>
          </section>
            <section className="relative block py-24 lg:pt-0 bg-gray-900">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                      <div className="flex-auto p-5 lg:p-10">
                        <h4 className="text-2xl font-semibold">
                          Want to work with us?
                    </h4>
                        <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                          Complete this form and we will get back to you in 24
                          hours.
                    </p>
                        <div className="relative w-full mb-3 mt-8">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="full-name"
                          >
                            Full Name
                      </label>
                          <input
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            placeholder="Full Name"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                      </label>
                          <input
                            type="email"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="message"
                          >
                            Message
                      </label>
                          <textarea
                            rows="4"
                            cols="80"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Type a message..."
                          />
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >Send Message</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>}  </main>
      <Footer />
    </>
  );
}
