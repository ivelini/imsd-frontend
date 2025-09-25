import { Suspense } from "react";
import SelectionComponent from "@/components/catalog/selection/SelectionComponent";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

export const metadata = {
  title: 'Подбор шин по параметрам'
}

export default function TiresSelection() {
    return <Suspense fallback={null}>
        <SelectionComponent type={TypeProductEnum.TIRE}/>
    </Suspense>

}