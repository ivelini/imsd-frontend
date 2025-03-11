"use client"

import dynamic from "next/dynamic"

import { TypeProductEnum } from "@/lib/TypeProductEnum"
import Link from "next/link"
import { useStore } from "@/store/useStore"


export default function Breadcrumbs({ entity, vendor, mark }) {
    const { getCityQueryParam } = useStore()

    console.log(getCityQueryParam())

    return (<>
        <div className="container">
            <ul className="breadcrumbs">
                <li><a href="/">Главная</a></li>
                <li>/</li>
                <li>{entity === TypeProductEnum.TIRES
                    ? <Link href="/tires_selection">Каталог шин</Link>
                    : <Link href="/disk_selection">Каталог дисков</Link>
                }</li>
                <li>/</li>
                <li><Link href={{
                    pathname: `\/${entity}_selection`,
                    query: { vendor }
                }}>{vendor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Link></li>
                <li>/ </li>
                <Link href={{
                    pathname: `\/catalog\/${entity}\/${vendor}\/${mark}`,
                    query: getCityQueryParam()
                }}>{mark.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}1111</Link>
            </ul>
        </div>
    </>)
}