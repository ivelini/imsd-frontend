"use client"

import dynamic from "next/dynamic"

import {TypeProductEnum} from "@/lib/TypeProductEnum"
import Link from "next/link"

const MarkBreadcrumb = dynamic(() => import('./MarkBreadcrumb'), {ssr: false})

export default function Breadcrumbs({entity, vendor, mark = null}) {
    console.log(entity, vendor, mark)
    let vendorName = vendor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    return (<>
        <div className="container">
            <ul className="breadcrumbs">
                <li><a href="/">Главная</a></li>
                <li>/</li>
                <li>{entity === TypeProductEnum.TIRE + 's'
                    ? <Link href="/catalog/tires">Каталог шин</Link>
                    : <Link href="/catalog/disks">Каталог дисков</Link>
                }</li>
                <li>/</li>
                <li>
                    {mark != null
                        ? <Link href={{pathname: `\/catalog\/${entity}\/${vendor}`}}>{vendorName}</Link>
                        : vendorName}
                </li>
                <li>/</li>
                {mark != null && <MarkBreadcrumb entity={entity} vendor={vendor} mark={mark}/>}
            </ul>
        </div>
    </>)
}