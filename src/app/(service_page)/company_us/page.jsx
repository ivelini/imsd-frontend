
export const metadata = {
    title: 'Контакты интернет магазина aalyans74.ru',
    description: ''
}

export default async function ContactPage() {

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/article/16`)

    response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())

    let item = response?.data ?? null
    return item !== null && (<>
        <section className="container section section-content">
            <h2>{item.title}</h2>
            <div className="container section section-content" dangerouslySetInnerHTML={{__html:item.content}} />
        </section>
    </>)
}