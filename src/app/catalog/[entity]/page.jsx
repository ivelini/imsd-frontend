import { TypeProductEnum } from "@/lib/TypeProductEnum"
import { redirect } from "next/navigation"

/**
 * @param {Object} params 
 * @param {string} params.entity
 */
export default async function Entity({ params }) {
    const {entity} = await params
    
    if (entity == TypeProductEnum.TIRE + 's') {
        redirect('/tires_selection')
    }

    if (entity == TypeProductEnum.DISK + 's') {
        redirect('/disks_selection')
    }
}