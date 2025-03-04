import ContentComponent from "./_components/ContentComponent";
import LocationReloadComponent from "./_components/LocationReloadComponent";
import HorisontalMenu from "./HorisontalMenu";
import InfoProduct from "./InfoProduct";
import { TypeProductEnum } from "@/lib/TypeProductEnum";

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 * @param {string} params.product
 */
export default async function Product({ params, searchParams }) {
    const { entity, product } = await params
    const { city_name } = await searchParams

    let item = null
    let response = null

    let url = new URL(`${process.env.BACKEND_URL}/api/catalog/tire/${product}`)

    if (city_name != null) {
        url.searchParams.set('city_name', city_name)
    }

    try {
        if (entity === TypeProductEnum.TIRES) {
            response = await fetch(url.toString()).then(res => res.json())
        }
    } catch (error) { }

    item = response?.data

    return (<>

        <LocationReloadComponent />
        <InfoProduct item={item} />

        <HorisontalMenu menu={{
            description: 'Описание',
            availability: 'Наличие',
            delivery: 'Доставка'
        }}
        />
        <ContentComponent tag="description" title="Описание" content={item.description} />
    </>)
}