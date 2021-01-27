import React, { FunctionComponent, SetStateAction } from 'react'

import { Link, useLocation } from "react-router-dom";

interface MyProps {
    name: string,
    path: string,
    faIcon: string,
    setCollapseShow: React.Dispatch<SetStateAction<string>>
}

const ItemBar: FunctionComponent<MyProps> = ({ name, path, faIcon = "tv", setCollapseShow }) => {
    const location = useLocation()

    return (
        <li className="items-center">
            <Link
                className={
                    "text-xs uppercase py-3 font-bold block " +
                    (location?.pathname === path
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-gray-800 hover:text-gray-600")
                }
                to={path}
                onClick={() => setCollapseShow("hidden")}
            >
                <i
                    className={
                        `fas fa-${faIcon} mr-2 text-sm ` +
                        (location?.pathname === path
                            ? "opacity-75"
                            : "text-gray-400")
                    }
                ></i>{" "}
                {name}
            </Link>
        </li>
    )
}

export default ItemBar