import HorisontalItem from "@/app/(selection)/_components/page/param/HorisontalItem"
import { TypeProductEnum } from "@/lib/TypeProductEnum"

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 */
export default async function Mark({ params }) {
    const { entity, vendor, mark } = await params

    let itemsGrouped = null
    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/catalog/tire/${vendor}/${mark}`)

    if (entity === TypeProductEnum.DISKS) {
        url = new URL(`${process.env.BACKEND_URL}/api/catalog/disk/${vendor}/${mark}`)
    }

    response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())
    itemsGrouped = response?.data ?? null;

    return (<>
        <div className="container catalog-with-products">
            {Object.keys(itemsGrouped).map(key =>
                <div key={key} className="diameter">
                    <h2>{key}</h2>
                    {itemsGrouped[key].map((item, index) => <HorisontalItem key={index} item={item} />)}
                </div>
            )}
        </div>
    </>)
}