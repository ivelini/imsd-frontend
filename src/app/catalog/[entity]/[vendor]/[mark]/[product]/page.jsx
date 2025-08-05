import ContentComponent from "./_components/ContentComponent";
import LocationReloadComponent from "../../../../../../components/LocationReloadComponent";
import HorisontalMenu from "./HorisontalMenu";
import InfoProduct from "./InfoProduct";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import {
    deliveryCityExistPoints,
    deliveryCityNotExistPoints,
    deliveryMainCityIncludeMapInfo, deliveryPointsExists, deliveryPointsNotExists,
} from "@/lib/TextInformation";

/**
 * @param {Object} props
 * @param {Object} props.params
 * @param {Object} props.searchParams
 * @param {string} props.params.entity
 * @param {string} props.params.vendor
 * @param {string} props.params.mark
 * @param {string} props.params.product
 */

export async function generateMetadata({params, searchParams}) {
    const {entity, product} = await params;
    const {city_name} = await searchParams;

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/catalog/tire/${product}/seo`)

    try {
        if (entity === TypeProductEnum.DISKS) {
            url = new URL(`${process.env.BACKEND_URL}/api/catalog/disk/${product}/seo`)
        }

        if (city_name) {
            url.searchParams.set("city_name", city_name)
        }

        response = await fetch(url.toString(), {cache: "no-store"}).then(res => res.json())

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


export default async function Product({params, searchParams}) {
    const {entity, product} = await params;
    const {city_name} = await searchParams;

    let item = null
    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/catalog/tire/${product}`)

    if (city_name) {
        url.searchParams.set("city_name", city_name)
    }

    try {
        if (entity === TypeProductEnum.DISKS) {
            url = new URL(`${process.env.BACKEND_URL}/api/catalog/disk/${product}`)
        }

        response = await fetch(url.toString(), {cache: "no-store"}).then(res => res.json())

        console.log(response)
    } catch (error) {
        console.error("Ошибка загрузки данных:", error)
    }

    item = response?.data ?? null;

    return (
        <>
            <LocationReloadComponent/>
            <InfoProduct item={item}/>

            <HorisontalMenu
                menu={{
                    description: "Описание",
                    delivery: "Доставка",
                }}
            />
            <ContentComponent
                tag="description"
                title="Описание"
                content={item?.description ?? "Нет описания"}
            />

            {city_name === undefined && <ContentComponent
                tag="delivery"
                title="Доставка"
                content={deliveryMainCityIncludeMapInfo()}
            />}

            {city_name !== undefined &&
                item.price_stock_and_delivery.is_delivery_points_exists_current_city && <ContentComponent
                    tag="delivery"
                    title="Доставка"
                    content={deliveryPointsExists(item) + '<br />' + deliveryCityExistPoints()}
                />}
            {city_name !== undefined &&
                !item.price_stock_and_delivery.is_delivery_points_exists_current_city &&
                <ContentComponent
                    tag="delivery"
                    title="Доставка"
                    content={deliveryPointsNotExists(item) + '<br />' + deliveryCityNotExistPoints()}
                />
            }


        </>
    );
}
