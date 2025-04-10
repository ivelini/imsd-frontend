import Image from "next/image";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

export async function generateMetadata({params}) {
    const {article} = await params

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/article/${article}`)

    try {
        response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())

        return {
            title: response.data.title,
            description: response.data.description
        }
    } catch (error) {
        return {
            title: '',
            description: ''
        }
    }
}
export default async function ArticlePage({params}) {
    const {article} = await params

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/article/${article}`)

    response = await fetch(url.toString(), { cache: "no-store" }).then(res => res.json())

    let item = response.data ?? null
    return item !== null && (<>
        <section className="about-company-section container">
            <h2>{item.title}</h2>
            <Image className="news-image"
                   src={item.images[0].url}
                   width={370}
                   height={250}
                   style={{'margin': 'auto', 'width': '60%', 'height': '60%'}}
                   alt="img"
                   unoptimized
            />

                <div className="about-company-text" dangerouslySetInnerHTML={{__html:item.content}} />

        </section>
    </>)
}