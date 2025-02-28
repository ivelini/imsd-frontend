import ContentComponent from "./_components/ContentComponent";
import HorisontalMenu from "./HorisontalMenu";
import InfoProduct from "./InfoProduct";

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 * @param {string} params.product
 */
export default function Product({ params }) {
    return (<>
        <InfoProduct />
        <HorisontalMenu menu={{
            description: 'Описание',
            availability: 'Наличие',
            delivery: 'Доставка'
        }}
        />
        <ContentComponent tag="description" title="Описание" content="Контент" />
    </>)
}