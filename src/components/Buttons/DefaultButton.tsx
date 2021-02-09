import { defaultTheme, TTheme } from 'constants/themes/themeTypes'
import React, { FunctionComponent } from 'react'

type TFontSize = {

}

interface IButton {
    onClick: any | undefined,
    label: string,
    theme?: TTheme,
    padding: "px-6" | "px-4" | "px-2",
    upper: boolean
}
const DefaultButton: FunctionComponent<IButton> = ({ onClick, label, padding, upper = true,
    theme = defaultTheme }) => {
    const tema = `bg-${theme.color}-${theme?.grau} text-${theme.fontColor} text-${theme.fontSize}`
    return (
        <button className={` font-bold 
       ${upper && 'uppercase'}
         p-2 
      rounded padding
        shadow hover:shadow-md outline-none
         focus:outline-none mb-1  
         ${tema}
          active:bg-teal-600 
         ease-linear transition-all duration-150`}
            type="button"
            style={{ textAlign: 'left', justifyContent: 'flex-start' }}
            onClick={onClick}
        >{label}</button>
    )
}
export default DefaultButton


