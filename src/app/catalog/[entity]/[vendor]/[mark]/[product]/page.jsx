
/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 * @param {string} params.product
 */
export default function Product({ params }) {
    return (<>
        Entity {params.entity + '/' + params.vendor + '/' + params.mark + '/' + params.product}
    </>)
}