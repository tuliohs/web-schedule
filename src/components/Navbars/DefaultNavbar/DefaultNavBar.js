/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export default function DefaultNavbar({ showAcessBtn = true }) {

    const { t } = useTranslation()
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
                <div className="w-full container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <a className=" text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                        href="/">
                        {t("navAdm.title")}
                    </a>
                    < ul className="flex flex-row lg:ml-auto">
                        {location?.pathname !== "/public" &&
                            <li className="flex items-center mr-4">
                                <Link className="btn hover:text-gray-600  px-4 py-2 lg:py-4 flex
                                 items-center text-xs uppercase font-bold z-40"
                                    to="/public">
                                    {t("navAdm.btExplore")}</Link>
                            </li>
                        }
                        {!location?.pathname.includes("auth") &&
                            <li className="flex items-center">
                                <Link className="inline-block text-white bg-blue-500 
                                active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 
                                rounded shadow hover:shadow-md outline-none 
                                focus:outline-none 
                                lg:mr-1 lg:mb-0 ml-16 mb-3 ease-linear transition-all 
                                duration-150"
                                    to="/myschedule/schedule"
                                > {t("navAdm.btAcess")}</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav >
        </>
    );
}
