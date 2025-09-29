import { useStore } from "@/store/useStore"
import Link from "next/link"

export default function MarkBreadcrumb({entity, vendor, mark}) {
    const { getCityQueryParam } = useStore()

    return (<>
        <li>
            <Link href={{
                pathname: `\/catalog\/${entity}\/${vendor}\/${mark}`,
                query: getCityQueryParam()
            }}>
                {mark.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Link>
        </li>
    </>)
}