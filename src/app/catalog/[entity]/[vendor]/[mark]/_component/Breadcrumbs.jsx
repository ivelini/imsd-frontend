"use client"

import dynamic from "next/dynamic"

import { TypeProductEnum } from "@/lib/TypeProductEnum"
import Link from "next/link"
const MarkBreadcrumb = dynamic(() => import('./MarkBreadcrumb'), {ssr: false})

export default function Breadcrumbs({ entity, vendor, mark }) {
    return (<>
        <div className="container">
            <ul className="breadcrumbs">
                <li><a href="/">Главная</a></li>
                <li>/</li>
                <li>{entity === TypeProductEnum.TIRES
                    ? <Link href="/tires_selection">Каталог шин</Link>
                    : <Link href="/disks_selection">Каталог дисков</Link>
                }</li>
                <li>/</li>
                <li><Link href={{
                    pathname: `\/catalog\/${entity}\/${vendor}`,
                    query: { vendor }
                }}>{vendor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Link></li>
                <li>/ </li>
                <MarkBreadcrumb entity={entity} vendor={vendor} mark={mark}/>
            </ul>
        </div>
    </>)
}