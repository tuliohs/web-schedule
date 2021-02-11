import React from "react";
import styled from 'styled-components'
// components

//import CardStats from "components/Cards/CardStats.js";
import { EModernColors } from 'constants/themes/themeTypes'



const Styles = styled.div`
 
.hiscDP {
  padding: 0px;
  margin: 0px;
  display: flex;
}
*, ::before, ::after {
  box-sizing: inherit;
}
ul { 
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px; 
}


@media (max-width: 340px) {
    .three { 
        display:none;
    }
  }
  
  @media (max-width: 640px) {
    .four {
        display:none;
    }
  }
  
  @media (max-width: 1024px) {
    .five {
        display:none;
    }
  }

`


export default function HeaderDefault({ title }) {
    const cl = EModernColors;
    return (
        <>
            <div>
                {/* Header */}
                <div className="relative bg-secondary md:pt-32 pb-32 pt-12">
                    <div className="px-2 md:px-10 mx-auto w-full">
                        <div>
                            {/* Card stats */}
                            <div className="flex flex-wrap">
                                {title && <h1 className="p-after text-white font-semibold text-5xl">{title}</h1>}

                                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">

                                    {/*<CardStats
                                    statSubtitle="PERFORMANCE"
                                    statTitle="49,65%"
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-green-500"
                                    statDescripiron="Since last month"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-blue-500"
                                />*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Styles>
                    <div class="ColorfulBorder__List-sc-1ouz2os-0 hiscDP flex">
                        <div className="w-full p-1 dPnyfG"
                            style={{ backgroundColor: cl.blue }}
                        >
                        </div>
                        <div className="ColorfulBorder__Color-sc-1ouz2os-1 izuNsF w-full"
                            style={{ backgroundColor: cl.black }}
                        >
                        </div>
                        <div className="five ColorfulBorder__Color-sc-1ouz2os-1 fkNVRi w-full"
                            //style={{ backgroundColor: "#ffd500" }}
                            style={{ backgroundColor: cl.purple }}
                        >
                        </div>
                        <div className="three ColorfulBorder__Color-sc-1ouz2os-1 gwyCKY w-full"
                            style={{ backgroundColor: cl.aqua }}
                        >
                        </div>
                        <div className="four ColorfulBorder__Color-sc-1ouz2os-1 cHpgKP w-full"
                            style={{ backgroundColor: cl.red }}
                        >
                        </div>
                    </div>
                </Styles>
            </div>
        </>
    );
}
