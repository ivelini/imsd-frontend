import { Suspense } from "react";
import TiresSelectionComponent from "@/components/selection/TiresSelectionComponent";

export const metadata = {
  title: 'Подбор шин по параметрам'
}

export default function TiresSelection() {
    return <Suspense fallback={null}>
        <TiresSelectionComponent />
    </Suspense>

}