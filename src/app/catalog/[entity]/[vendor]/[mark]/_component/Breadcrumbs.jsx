"use client"
import BackendApi from "@/lib/BackendApi"
import { TypeProductEnum } from "@/lib/TypeProductEnum"
import { useStore } from "@/store/useStore"
import Link from "next/link"
import { useEffect } from "react"


export default function Breadcrumbs({ entity, vendor, mark }) {
    const { setParamFilterTires, setParamFilterWheels, clearFilter } = useStore()

    useEffect(() => {
        clearFilter()

        if (entity === TypeProductEnum.TIRES) {

        }
    }, [])

    const getVendorId = async () => {
        let response = await BackendApi.get()
    }

    return (<>
        <div className="container">
            <ul class="breadcrumbs">
                <li><a href="/">Главная</a></li>
                <li>/</li>
                <li>{entity === TypeProductEnum.TIRES
                    ? <Link href="/tires_selection">Каталог шин</Link>
                    : <Link href="/disk_selection">Каталог дисков</Link>
                }</li>
                <li>/</li>
                <li><Link href={{
                        pathname: `\/${entity}_selection`,
                        query: {vendor}
                    }}>{vendor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Link></li>
                <li>/ </li>
                <li><a href={`/catalog/${entity}/${vendor}/${mark}`}>{mark.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</a></li>
            </ul>
        </div>
    </>)
}