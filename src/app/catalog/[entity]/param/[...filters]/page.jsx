import parseFilter from "@/lib/url/parseFilter"

export default function FilterPage({params}) {
    const {filters = []} = params
    const query = parseFilter(filters)

    console.log(query)
    return (<>{filters.join(' / ')}</>)
}