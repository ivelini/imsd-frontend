import InnerWrapperComponent from "@/app/_components/page/inner-wrapper/InnerWrapperComponent";
import CaruselComponent from "@/app/_components/page/CaruselComponent";
import ArticleBlock from "@/app/article/_component/ArticleBlock";
import AttentionBlocksComponent from "@/app/_components/page/AttentionBlocksComponent";
import LocationReloadComponent from "@/components/LocationReloadComponent";


export const metadata = {
    title: 'Интернет-магазин шин и дисков Автоальянс',
    description: 'Интернет-магазин шин и дисков Автоальянс',
}

export default async function Home() {

    let response = null
    let url = new URL(`${process.env.BACKEND_URL}/api/article/main`)

    response = await fetch(url.toString(), {cache: "no-store"}).then(res => res.json())

    let data = response?.data ?? null

    return (<>
        <InnerWrapperComponent/>
        <AttentionBlocksComponent/>
        <section className="news-section container">
            <h2>Новости</h2>
            <div className="news-list">
                {data?.news.length > 0 && data.news.map(
                    (item, index) =>
                        <ArticleBlock
                            key={index}
                            isRight={(index + 1) % 3 !== 0} // каждый 3 элемент массива
                            item={item}/>
                )}
            </div>
        </section>
        <div className="wheels-section container">
            <h2>Лучшие предложения шин</h2>
            <CaruselComponent items={data.tire_carousel}/>
        </div>
        <div className="disk-section container">
            <h2 className="pr">Лучшие предложения дисков</h2>
            <CaruselComponent items={data.wheel_carousel}/>
        </div>
        <section className="container section section-content">
            <h2>{data.about_us.title}</h2>
            <div className="container section section-content" dangerouslySetInnerHTML={{__html: data.about_us.content}}/>
        </section>
    </>)
}
