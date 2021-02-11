/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";

//import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
const Writes = {
    en: {
        title: "Forgetion",
        subTitle: "Explore",
        acess: "Acess",
        explore: "Explore"

    }
}

export default function DefaultNavbar({ showAcessBtn = true }) {
    const [navbarShow, setNavbarShow] = React.useState(true);
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const location = useLocation()
    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };
    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 299 ||
                document.body.scrollTop > 299
            ) {
                setNavbarShow(false);
            } else if (
                document.documentElement.scrollTop < 300 ||
                document.body.scrollTop < 300
            ) {
                setNavbarShow(true);
            }
        };
        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    const corTranspar = "bg-white  text-gray-800"
    const corFefault = "text-gray-200"
    const tema = navbarShow ? corFefault : corTranspar
    return (
        <>
            <nav className={tema + " top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow"}>
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a className=" text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                            href="/">
                            {Writes.en.title}
                        </a>
                    </div>
                    <div className="lg:flex flex-grow items-center lg:bg-transparent 
                    lg:shadow-none hidden" id="example-navbar-warning">
                        {location?.pathname !== "/public" && < ul className="flex flex-col lg:flex-row list-none mr-auto">
                            <li className="flex items-center btn">
                                <Link className="btn hover:text-gray-600  px-3 py-4 lg:py-2 flex
                                 items-center text-xs uppercase font-bold z-40"
                                    to="/public">
                                    {Writes.en.explore}</Link>
                            </li>
                        </ul>}
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {/*<li className="flex items-center"><a className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F" target="_blank">
                                <i className="text-gray-500 fab fa-facebook text-lg leading-lg ">
                                </i><span className="lg:hidden inline-block ml-2">Share</span></a></li>*/}
                            {/*<li className="flex items-center"
                            ><a className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&amp;text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20" target="_blank">
                                    <i className="text-gray-500 fab fa-twitter text-lg leading-lg "></i>
                                    <span className="lg:hidden inline-block ml-2">Tweet</span></a></li>*/}
                            {/*<li className="flex items-center">
                                <a className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="https://github.com/creativetimofficial/notus-react?ref=nr-index-navbar" target="_blank"><i className="text-gray-500 fab fa-github text-lg leading-lg ">
                                </i><span className="lg:hidden inline-block ml-2">Star</span>
                                </a></li>*/}
                            {!location?.pathname.includes("auth") && <li className="flex items-center">
                                <Link className="inline-block text-white bg-blue-500 
                                active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 
                                rounded shadow hover:shadow-md outline-none 
                                focus:outline-none 
                                lg:mr-1 lg:mb-0 ml-16 mb-3 ease-linear transition-all 
                                duration-150"
                                    to="/myschedule/schedule"
                                > {Writes.en.acess}</Link>
                            </li>}
                        </ul></div></div></nav >
        </>
    );
}
