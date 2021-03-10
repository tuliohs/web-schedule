import baseRouter from 'constants/config/baseRouter';
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

    //number é igual ao número da hierarquia de barras
    const relativePath = function (str: string, minSeparator: number = 4) {
        if (path.split('/').length <= minSeparator) return str
        return str.substr(1, str.lastIndexOf('/'))
    }
    console.log(location?.pathname, 'e', relativePath(path))
    return (
        <li className="items-center">
            <Link
                className={
                    "text-sm py-1  block " +
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
                            : "text-gray-500")
                    }
                ></i>{" "}
                {name}
            </Link>
        </li >
    )
}

export default ItemBar