import React from 'react'

import { Link, useLocation } from "react-router-dom";



export default function ItemBar({ name, path }) {
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
            >
                <i
                    className={
                        "fas fa-tv mr-2 text-sm " +
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