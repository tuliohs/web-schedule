import React, { useState } from 'react'
import './NotFound.css'
import styled from 'styled-components'

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

  

`

const Styles2 = styled.div`
width:100%;
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  background-color: #000;
  

`
//html,
//body {
//  font-family: 'Roboto Mono', monospace;
//  font-size: 16px;
//}

//html {
//  box-sizing: border-box;
//  user-select: none;
//}

//body {
//  background-color: #000;
//}

//*,
//*:before,
//*:after {
//  box-sizing: inherit;
//}



//handle {
//    background: #ffe500;
//    width: 14px;
//    height: 30px;
//    top: 0;
//    left: 0;
//    margin-top: 1px;
//    position: absolute;
//  }
const NotFound = () => {

    //var $copyContainer = $(".copy-container"),
    //$replayIcon = $('#cb-replay'),
    //$copyWidth = $('.copy-container').find('p').width();
    const [text, setText] = React.useState(null)
    const [transparent, setTransparent] = React.useState(false)
    const [position, setPosition] = useState(0)
    const [animationTime, setAnimationTime] = useState(50)
    const value = "404, page not found."


    React.useEffect(() => {
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
    }, [position]);


    React.useEffect(() => {
        const intervalo = setInterval(() => {
            setTransparent(!transparent)
        }, animationTime)
        return () => clearInterval(intervalo)
    }, [transparent]);

    //className="copy-container center-xy"
    return (
        <Styles2>
            <Styles >
                <p >
                    {text}
                </p>
                <span className="handle"
                    style={{
                        background: "#ffe500",
                        opacity: transparent ? '0.2' : '0.9',
                        width: "14px",
                        height: "30px",
                        top: 0,
                        left: 0,
                        marginTop: "1px",
                        //position: "absolute"
                    }}
                ></span>
            </Styles>
        </Styles2>
    )


}

export default NotFound;