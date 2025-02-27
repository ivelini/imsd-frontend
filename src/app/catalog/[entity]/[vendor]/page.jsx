
/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 */
export default function Vendor({ params }) {
    return (<>
        Entity {params.entity + '/' + params.vendor}
    </>)
}