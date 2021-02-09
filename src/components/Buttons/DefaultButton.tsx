import { defaultTheme, TTheme } from 'constants/themes/themeTypes'
import React, { FunctionComponent } from 'react'

interface IButton {
    onClick?: any | undefined,
    label?: string,
    theme?: TTheme,
    padding?: "px-6" | "px-4" | "px-2",
    upper?: boolean,
    refBt?: any,
    transparent?: boolean,
    children?: any
}
const DefaultButton: FunctionComponent<IButton> = ({ onClick, label, padding = "px-4", upper = false,
    transparent = false,
    refBt, children,
    theme = defaultTheme }) => {
    const tema = `bg-${theme.color}-${theme?.grau} text-${theme.fontColor} text-${theme.fontSize}`
    return (
        <button className={transparent ? 'transparent' : ` 
       ${upper && 'uppercase font-bold '}
         p-2 
      rounded 
        shadow hover:shadow-md outline-none
         focus:outline-none mb-1  
         ${tema} ${padding}
          active:bg-teal-600 
         ease-linear transition-all duration-150`}
            type="button"
            ref={refBt}
            style={{ textAlign: 'left', justifyContent: 'flex-start' }}
            onClick={onClick}
        >
            {children}
            {label}</button>
    )
}
export default DefaultButton


