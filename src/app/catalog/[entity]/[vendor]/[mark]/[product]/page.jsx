import ContentComponent from "./_components/ContentComponent";
import HorisontalMenu from "./HorisontalMenu";
import InfoProduct from "./InfoProduct";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 * @param {string} params.product
 */
export default async function Product({ params }) {

    let product = null
    let response = null

    try {
        if(params.entity === TypeProductEnum.TIRES) {
            response = await fetch(process.env.BACKEND_URL + '/api/catalog/tire/' + params.product).then(res => res.json())
        }
    } catch (error) {}


    product = response?.data

    return (<>

        <InfoProduct item={product}/>

        <HorisontalMenu menu={{
            description: 'Описание',
            availability: 'Наличие',
            delivery: 'Доставка'
        }}
        />
        <ContentComponent tag="description" title="Описание" content="Контент" />
    </>)
}