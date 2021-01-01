import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//https://codepen.io/selcukcura/pen/XeQpEv --------SIMILAR EXMPLE
const Styles = styled.div`
display: flex;
flex-direction: row;
text-align: left;
left: 40%;
top: 40%;
left: 40%;
/*transform: translate(-80%, -50%);*/
position: absolute;
  background-color: #000;
p {
    color: #fff;
    font-size: 24px;
    letter-spacing: .2px;
    margin: 0;
    text-align: left;
  }
span{
    background: #ffe500;
    width: 14px;
    height: 30px;
    top: 0;
    left: 0;
    marginTop: 1px;
}
`
const Styles2 = styled.div`
width:100%;
height: 100%;
font-family: 'Roboto Mono', monospace;
font-size: 16px;
background-color: #000;
position:fixed;
`

const NotFound = () => {
    const [text, setText] = useState(null)
    const [transparent, setTransparent] = useState(false)
    const [position, setPosition] = useState(0)
    const [animationTime, setAnimationTime] = useState(50)
    const value = "404, page not found."

    useEffect(() => {
        const intervalo = setInterval(() => {
            let spliString = value.substring(0, position)
            if (position > value.length) {
                setAnimationTime(430)
                return
            }
            setText(spliString)
            setPosition(position + 1)
        }, animationTime)
        return () => clearInterval(intervalo)
    }, [position, animationTime]);


    useEffect(() => {
        const intervalo = setInterval(() => {
            setTransparent(!transparent)
        }, animationTime)
        return () => clearInterval(intervalo)
    }, [transparent, animationTime]);

    return (
        <Styles2>
            <Styles >
                <p >{text}</p>
                <span className="handle"
                    style={{ opacity: transparent ? '0.2' : '0.9' }}
                ></span>
            </Styles>
        </Styles2>
    )
}

export default NotFound;