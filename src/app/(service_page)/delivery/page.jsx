export default async function DelivaryPage() {

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/article/12`)

    response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())

    let item = response.data ?? null
    return item !== null && (<>
        <section className="about-company-section container">
            <h2>{item.title}</h2>
            <div className="about-company-text" dangerouslySetInnerHTML={{__html:item.content}} />
        </section>
    </>)
}