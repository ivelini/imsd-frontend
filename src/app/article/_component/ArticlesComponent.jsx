"use client"

import ArticleBlock from "@/app/article/_component/ArticleBlock";
import {Paginator} from "primereact/paginator";
import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";

const INITIAL_PAGINATOR = {
    first: 0,
    rows: 0,
    total: 0
}

export default function ArticlesComponent() {
    const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async (page = null) => {

        let queryString = ''
        if (page) {
            queryString += `?page=${page}`;
        }

        let response = await BackendApi.get('/api/article' + queryString)

        if(response.code == 200) {
            let data = await response;

            setItems(response.data)
            setPaginator({
                first: data.meta.from - 1,
                rows: data.meta.per_page,
                total: data.meta.total
            });
        }
    }

    const onPageChange = (data) => {
        console.log(data)
        getItems(data.page + 1)
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }

    return items.length > 0 && (<>
        <section className="news-section container">
            <h2>Новости и акции</h2>
            <div className="news-list">
                {items.map((item, index) =>
                    <ArticleBlock
                        key={index}
                        isRight={(index + 1) % 3 !== 0} // каждый 3 элемент массива
                        item={item}
                    />)}
            </div>
            {items.length > 0 && paginator.total > paginator.rows && (
                <Paginator first={paginator.first} rows={paginator.rows} totalRecords={paginator.total} onPageChange={onPageChange} />
            )}
        </section>
    </>)
}