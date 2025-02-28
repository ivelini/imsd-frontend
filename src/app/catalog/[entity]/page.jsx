import { TypeProductEnum } from "@/utils/TypeProductEnum"
import { redirect } from "next/navigation"

/**
 * @param {Object} params 
 * @param {string} params.entity
 */
export default function Entity({ params }) {
    
    if (params.entity == TypeProductEnum.TIRES) {
        redirect('/tires_selection')
    }
}