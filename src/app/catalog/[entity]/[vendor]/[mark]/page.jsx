
/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 */
export default function Mark({ params }) {
    return (<>
        Entity {params.entity + '/' + params.vendor + '/' + params.mark}
    </>)
}