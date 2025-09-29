import SelectionComponent from "@/components/catalog/selection/SelectionComponent";
import {Suspense} from "react";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

export async function generateMetadata({params}) {
    const {entity} = params;

    if (entity === TypeProductEnum.TIRE + 's') {
        return {
            title: 'Подбор шин по авто',
            description: 'Подбор шин по авто'
        }
    }
    return {
        title: 'Подбор дисков по авто',
        description: 'Подбор дисков по авто'
    }
}
/**
 * @param {Object} params
 * @param {string} params.entity
 */
export default function Entity({params}) {
    const {entity} = params

    return (<>По авто</>)
}