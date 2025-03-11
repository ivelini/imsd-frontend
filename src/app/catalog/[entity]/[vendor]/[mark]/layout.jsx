import Breadcrumbs from "./_component/Breadcrumbs"

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 */
export default function MarkLayout({ children, params }) {
    const { entity, vendor, mark } = params


    return (<>
        <Breadcrumbs entity={entity} vendor={vendor} mark={mark} />
        {children}
    </>)
}