"use client"
import Filter from "./filter/Filter";
import MobileHeader from "./MobileHeader";
import {useState} from "react";

export default function Sidebar({type, collback, setSwitcherFilter}) {
    const [isMobileFilterShow, setIsMobileFilterShow] = useState(false)
    const handleToggleFilterShow = () => {
        setIsMobileFilterShow(!isMobileFilterShow)
    }

    return (<>
        <MobileHeader toggleShowFilter={handleToggleFilterShow} />
        <Filter type={type} collback={collback} setSwitcherFilter={setSwitcherFilter} isMobileFilterShow={isMobileFilterShow}/>
    </>)
}