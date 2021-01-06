import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
//import './css.css'
import { Animated } from "react-animated-css";

const Styles = styled.div`
  li:hover,
  li.selected {
    color: #ffcc00;
  }
  #dates li {
    list-style: none;
    float: left;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 38px;
    padding-bottom: 10px;
  }


  #timeline {
    width: 800px;
    overflow: hidden;
    margin: 2em;
    position: relative;
  }
  #dates {
    width: 800px;
    height: 60px;
    overflow: hidden;
  }
  #issues {
        width: 800px;
        height: 150px;
    overflow: hidden;
  }
  #next,
  #prev {
    position: absolute;
    top: 0;
    font-size: 70px;
    top: 170px;
    width: 22px;
    height: 38px;
    background-position: 0 0;
    background-repeat: no-repeat;
    text-indent: -9999px;
    overflow: hidden;
  }
  #next:hover,
  #prev:hover {
    background-position: 0 -76px;
  }
  #next {
    right: 0;
    background: red;
  }
  #prev {
    left: 0;
    background: blue;
  }
  #next.disabled,
  #prev.disabled {
    opacity: 0.2;
  }
`

export default function HorizontalTimeLine({ itemRevision }) {
    const [atual, setAtual] = useState({})
    const [isVisible, setIsVisible] = useState(false)

    const onSet = (item, index) => {
        setIsVisible(false)
        setAtual({
            item: itemRevision.filter(a => a._id === item._id)[0], index: index
        })
    }
    const nextItem = () => {

        setAtual({ item: itemRevision[atual.index + 1], index: atual.index + 1 })

    }
    const prevItem = () => setAtual({ item: itemRevision[atual.index - 1], index: atual.index - 1 })

    useEffect(() => {
        setAtual({ item: itemRevision[0], index: 0 })
    }, [itemRevision])

    useEffect(() => setIsVisible(true), [atual])

    return (
        <Styles>
            <div id="timeline">
                <ul id="dates">
                    {itemRevision?.map((a, index) => (
                        <li key={a._id} className={a._id === atual.item?._id ? 'selected' : ''}
                            onClick={() => onSet(a, index)}>{moment(a.revisionDate).format('MMM-DD')}</li>
                    ))}
                </ul>

                <ul id="issues">
                    <Animated animationIn="pulse" animationInDuration={800} isVisible={isVisible}>
                        <li>
                            <h1>{moment(atual.item?.revisionDate).format('MMM-DD HH:mm')}</h1>
                            <p>{atual.item?.note}</p>
                        </li>
                    </Animated>

                </ul>
                <div id="grad_left"></div>
                <div id="grad_right"></div>
                {atual.index === 0 ? null : <div id="prev" onClick={prevItem} />}
                {atual.index === itemRevision.length - 1 ? null : <div id="next" onClick={nextItem} />}

            </div >

        </Styles>
    )
}