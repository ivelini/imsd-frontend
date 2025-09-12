import { Suspense } from "react";
import TiresSelectionComponent from "@/app/(selection)/tires_selection/_components/TiresSelectionComponent";

export const metadata = {
  title: 'Подбор шин по параметрам'
}

export default function TiresSelection() {
    return <Suspense fallback={null}>
        <TiresSelectionComponent />
    </Suspense>

}