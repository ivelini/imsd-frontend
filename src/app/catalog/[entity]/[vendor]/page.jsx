import Breadcrumbs from "@/components/catalog/breadcrumbs/Breadcrumbs";
import {Suspense} from "react";
import SelectionComponent from "@/components/catalog/selection/SelectionComponent";

export async function generateMetadata({params}) {
    const {vendor} = await params;

    return {
        title: 'Производитель',
        description: 'Описание производителя'
    }
}

export default async function Vendor({ params }) {
    const { entity, vendor, mark } = params

    return (<>
        <Breadcrumbs entity={entity} vendor={vendor} mark={mark} />
        <section className="catalog-section container">
            <Suspense fallback={null}>
                <SelectionComponent type={entity.slice(0, entity.length - 1)} isSetQuery={false}>
                    Тут будет описание производителя
                </SelectionComponent>
            </Suspense>
        </section>
    </>)
}