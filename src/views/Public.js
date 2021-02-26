import React, { useEffect } from "react";

import FactorySCreen from "views/Explore/Factory/Factory";
import DefaultNavbar from "components/Navbars/DefaultNavbar/DefaultNavBar";
import FooterAdmin from "components/Footers/FooterAdmin";
import HeaderDefault from "components/Headers/HeaderDefault";
import { EPagePath } from "routes";
import { inputStreamRouter } from "api/schedule.api";

export default function Public() {
    useEffect(() => {
        const inpStrHandler = async () => await inputStreamRouter(EPagePath.PublicFactory)
        inpStrHandler()
    }, [])
    return (
        <div className="relative bg-gray-200">
            <DefaultNavbar showAcessBtn={false} />
            <HeaderDefault title="Explore Categories" />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                <FactorySCreen />
                <FooterAdmin />
            </div>
        </div>
    );
}
