import ContentComponent from "@/components/catalog/product/ContentComponent";
import LocationReloadComponent from "@/components/LocationReloadComponent";
import HorisontalMenu from "@/components/catalog/product/HorisontalMenu";
import InfoProduct from "@/components/catalog/product/InfoProduct";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import {
    deliveryCityExistPoints,
    deliveryCityNotExistPoints,
    deliveryMainCityIncludeMapInfo,
    deliveryPointsExists,
    deliveryPointsNotExists,
} from "@/lib/TextInformation";
import StocksForManagerComponent
    from "@/components/catalog/product/StocksForManagerComponent";
import {notFound} from "next/navigation";

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
        if (entity === TypeProductEnum.DISK) {
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

    if (entity === TypeProductEnum.DISK + 's') {
        url = new URL(`${process.env.BACKEND_URL}/api/catalog/disk/${product}`)
    }

    response = await fetch(url.toString(), {cache: "no-store"})

    if (!response.ok) {
        notFound()
    }

    item = (await response.json())?.data

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
            <StocksForManagerComponent entity={entity} product={product}/>
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
