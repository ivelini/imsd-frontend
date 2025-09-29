import Breadcrumbs from "@/components/catalog/breadcrumbs/Breadcrumbs"

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 * @param {string} params.mark
 */
export default async function MarkLayout({ children, params }) {

    console.log(await params)
    const { entity, vendor, mark } = await params
    
    return (<>
        <Breadcrumbs entity={entity} vendor={vendor} mark={mark} />
        {children}
    </>)
}