import HorisontalItem from "@/components/catalog/selection/param/HorisontalItem"
import { TypeProductEnum } from "@/lib/TypeProductEnum"
import LocationReloadComponent from "@/components/LocationReloadComponent";


export async function generateMetadata({params, searchParams}) {
    const { entity, vendor, mark } = await params;
    const { city_name } = await searchParams;

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/catalog/tire/${vendor}/${mark}/seo`)

    try {
        if (entity === TypeProductEnum.DISK + 's') {
            url = new URL(`${process.env.BACKEND_URL}/api/catalog/disk/${vendor}/${mark}/seo`)
        }

        if (city_name) {
            url.searchParams.set("city_name", city_name)
        }

        response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())

        return {
            title: response.data.title,
            description: response.data.description
        }
    } catch (error) {
        return {
            title: '',
            description: ''
        }
    }
}

/**
 * @param {Object} params
 * @param searchParams
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 */
export default async function Mark({ params, searchParams }) {
    const { entity, vendor, mark } = await params
    const { city_name } = await searchParams;

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/catalog/tire/${vendor}/${mark}`)

    if (entity === TypeProductEnum.DISK) {
        url = new URL(`${process.env.BACKEND_URL}/api/catalog/disk/${vendor}/${mark}`)
    }

    if (city_name) {
        url.searchParams.set("city_name", city_name)
    }

    response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())
    let itemsGrouped = response?.data ?? {};

    return (<>
        <LocationReloadComponent />
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