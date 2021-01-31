import React, { FunctionComponent, SetStateAction, useCallback, useState } from 'react'

import { Link, useLocation } from "react-router-dom";

interface MyProps {
    name: string,
    path: string,
    faIcon: string,
    setCollapseShow: React.Dispatch<SetStateAction<string>>
}

const ItemBar: FunctionComponent<MyProps> = ({ name, path, faIcon = "tv", setCollapseShow }) => {
    const location = useLocation()

    const relativePath = function (str: string, minSeparator: number = 3) {
        if (path.split('/').length <= minSeparator) return str
        return str.substr(1, str.lastIndexOf('/'))
    }

    return (
        <li className="items-center">
            <Link
                className={
                    "text-xs uppercase py-3 font-bold block " +
                    (relativePath(location?.pathname) === relativePath(path)
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-gray-800 hover:text-gray-600")
                }
                to={path}
                onClick={() => setCollapseShow("hidden")}
            >
                <i
                    className={
                        `fas fa-${faIcon} mr-2 text-sm ` +
                        (relativePath(location?.pathname) === relativePath(path)
                            ? "opacity-75"
                            : "text-gray-400")
                    }
                ></i>{" "}
                {name}
            </Link>
        </li >
    )
}

export default ItemBar