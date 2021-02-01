import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'
import DefaultContext, { EEmpty } from 'constants/data/DefaultContext'
// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

const Outside = styled.div`
position: relative;
`
const Inside = styled.div`
position: absolute;
width:100% ;
height:100% ;
opacity:0.8;
background-color: #2d3748;
color:white;
font-size:200%;
text-align:center;
justify-content:center;
display:flex;
`

export default function Statistics() {
    const [avLineChart, setAvLineChart] = useState(false)

    const { empType } = useContext(DefaultContext);
    console.log('s', empType, EEmpty.Valid)
    useEffect(() => {
        if (empType === EEmpty.Valid)
            setAvLineChart(true)
    }, [])

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    {avLineChart ?
                        <CardLineChart avaiable={true} />
                        : <Outside>
                            <Inside className="items-center aling-center">
                                Not Avaiable
                        </Inside>
                            <CardLineChart avaiable={false} />
                        </Outside>}
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <Outside>
                        <Inside className="items-center aling-center">
                            Not Avaiable
                        </Inside>
                        <CardBarChart />
                    </Outside>
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <Outside>
                        <Inside className="items-center aling-center">
                            Not Avaiable
                        </Inside>
                        <CardPageVisits />
                    </Outside>
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <Outside>
                        <Inside className="items-center aling-center">
                            Not Avaiable
                        </Inside>
                        <CardSocialTraffic />
                    </Outside>
                </div>
            </div>
        </>
    );
}
