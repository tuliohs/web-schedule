import React, { FunctionComponent } from 'react'

interface IStateColor {
    state: string, color: string
}
export const LabelStateColor: FunctionComponent<IStateColor> = ({ state, color }): JSX.Element => {
    return (<>
        <p className="mt-2 mb-4 text-gray-600">
            <i className={`fas fa-circle text-${color}-500 mr-2`}></i>
            {state}</p>
    </>)
}
export default LabelStateColor