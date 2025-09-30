import SelectionComponent from "@/components/catalog/selection/SelectionComponent";
import {Suspense} from "react";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

export async function generateMetadata({params}) {
    const {entity} = params;

    if (entity === TypeProductEnum.TIRE + 's') {
        return {
            title: 'Подбор шин по параметрам',
            description: 'Подбор шин по параметрам'
        }
    }
    return {
        title: 'Подбор дисков по параметрам',
        description: 'Подбор дисков по параметрам'
    }
}
/**
 * @param {Object} params
 * @param {string} params.entity
 */
export default function Entity({params}) {
    const {entity} = params

    return (<>По параметрам</>)
}