import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
//import './css.css'
//https://digital-flowers.github.io/react-animated-css.html
import { Animated } from "react-animated-css";
import { THEME } from 'constants/themes/colors'

const Styles = styled.div`
  li:hover,
  li.selected {
    color: ${THEME.PRIMARY};
  }
.dateCurrent{
  color: ${THEME.PRIMARY};
  font-size: 2.5em;
  margin: 20px 0;
}
.noteCurrent{
  color:#000000;
}

  #dates li {
    list-style: none;
    float: left;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 38px;
    font-size:1.3em; 
  }


  #timeline {
    overflow: hidden;
    position: relative;
  }
  #dates {
    overflow: hidden;
  }
  
  #next,
  #prev {
    position: absolute;
    top: 0;
    top: 20px;
    width: 22px;
    height: 38px;
    overflow: hidden;
    margin:2em;
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
  const [blinking, setBlinking] = useState(false)

  const onSet = (item, index) => {
    setIsVisible(false)
    setAtual({
      item: itemRevision.filter(a => a._id === item._id)[0], index: index
    })
  }
  const nextItem = () => {
    setIsVisible(false)

    setAtual({ item: itemRevision[atual.index + 1], index: atual.index + 1 })

  }
  const prevItem = () => {
    setAtual({ item: itemRevision[atual.index - 1], index: atual.index - 1 })
    setIsVisible(false)
  }

  useEffect(() => {
    setAtual({ item: itemRevision[0], index: 0 })
  }, [itemRevision])

  useEffect(() => setIsVisible(true), [atual])

  React.useEffect(() => {
    const intervalo = setInterval(() => {
      setBlinking(!blinking);
    }, 450)
    return () => clearInterval(intervalo)
  }, [blinking]);

  return (
    <Styles>
      <div className="text-center">
        <h1 className="text-white  uppercase font-bold  bg-blue-600 ">Revisions</h1>

      </div>
      {itemRevision?.length > 0 ?

        <div id="timeline">
          {/*Se houver apenas uma revisão, não é mostrada a data*/}
          {itemRevision?.length > 1 ?
            <ul id="dates"
              style={{
                marginLeft: '5em',
                marginRight: '5em',
              }}
            >
              {itemRevision?.map((a, index) => (
                <li key={a._id} className={a._id === atual.item?._id ? 'selected' : ''}
                  onClick={() => onSet(a, index)}>{moment(a.revisionDate).format('MMM-DD')}</li>
              ))}
            </ul> : null}
          <ul id="issues" style={{
            marginLeft: '5em',
            marginRight: '5em',
          }}>
            <Animated animationIn="bounceInRight" animationInDuration={500} isVisible={isVisible}>
              <div>
                <h1 className="dateCurrent">{moment(atual.item?.revisionDate).format('MMM-DD HH:mm')}</h1>
                <p className="noteCurrent" dangerouslySetInnerHTML={{ __html: atual.item?.note }} />

              </div>
            </Animated>
          </ul>
          <div className={atual.index === 0 ? "disabled" : blinking ? null : 'opacity-50'} id="prev" onClick={atual.index === 0 ? null : prevItem} />
          <div id="next" onClick={atual.index === itemRevision.length - 1 ? null : nextItem}
            className={atual.index === itemRevision.length - 1 ? 'disabled' : blinking ? 'opacity-50' : null} />

        </div >
        : null}
    </Styles>
  )
}