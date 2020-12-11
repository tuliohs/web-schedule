import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderDefault() {
    return (
        <>
            {/* Header */}
            <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="PERFORMANCE"
                                    statTitle="49,65%"
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-green-500"
                                    statDescripiron="Since last month"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
