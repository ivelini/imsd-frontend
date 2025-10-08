'use client'

import {useStore} from "@/store/useStore";
import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export default function StocksForManagerComponent({entity, product}) {
    const {getToken} = useStore()
    const [stocks, setStocks] = useState([])

    const getStocks = async () => {
        return await BackendApi.get(`/api/front-manager/stocks/${entity}/${product}`)
    }

    useEffect(() => {
        if (getToken() != null) {
            getStocks()
                .then(response => {
                    if (response.code === 200) {
                        setStocks(response.data)
                    }
                })
        }
    }, []);

    return (stocks.length > 0 &&
        <div className="container">
            <div style={{overflowX: 'auto', width: '100%'}}>
                <DataTable value={stocks} tableStyle={{minWidth: '50rem'}}>
                    <Column field="name" header="Склад"></Column>
                    <Column field="count" header="Количество"></Column>
                    <Column field="price" header="Цена закупочная"></Column>
                    <Column field="price_with_coefficient" header="Цена прайсовая"></Column>
                    <Column field="delivery_days" header="Дней доставки"></Column>
                </DataTable>
            </div>
        </div>
    )
}