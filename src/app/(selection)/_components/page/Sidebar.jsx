"use client"
import Filter from "@/components/filter/Filter"
import MobileHeader from "./MobileHeader"
import {useEffect, useState} from "react"
import {useSearchParams} from "next/navigation"

export default function Sidebar({type, collback, setSwitcherFilter}) {
    const [isMobileFilterShow, setIsMobileFilterShow] = useState(false)
    const searchParams = useSearchParams(); //query параметры из адресной строки

    useEffect(() => {
        if(searchParams.get('filterIsOpen')) {
            setIsMobileFilterShow(true)
        }

    }, []);

    const handleToggleFilterShow = () => {
        setIsMobileFilterShow(!isMobileFilterShow)
    }

    return (<>
        <MobileHeader toggleShowFilter={handleToggleFilterShow} />
        <Filter type={type}  isMobileFilterShow={isMobileFilterShow}/>
    </>)
}