"use client";

import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";
import { useStore } from "@/store/useStore";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

/**
 * Хук для выборки продукции (шины или диски).
 */

const INITIAL_PAGINATOR = {
    first: 0,
    rows: 0,
    total: 0
}

export function useSelection(type) {
    const {
        useStoreIsReady,
        getFilterType,
        getValuesFilterTires,
        getRangeFilterTires,
        setRangeFilterTires,
        setRangeIsActive
    } = useStore()

    const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    let filterType = getFilterType()

    /**
     * Получить продукцию по выбранным параметрам
     * @param {TypeProductEnum} type
     */
    const getItems = async (type) => {
        if(filterType === 'PARAM' && type === TypeProductEnum.TIRES) {
            let response = await BackendApi.get('/api/catalog/tire' + prepareParams(getValuesFilterTires(), getRangeFilterTires()))
            prepareResponseParams(response)
            setRangeFilterTires({type: 'all', value: response.meta?.range_price?.all ?? [0,0]})
            setRangeFilterTires({type: 'current', value: response.meta?.range_price?.currentFilter ?? [0,0]})
        }

        setRangeIsActive(true)
    }

    const prepareParams = (params, range = null) => {
        let query = ''

        if(Object.keys(params).length > 0) {
            query = Object.keys(params)
                .map((key, index) => (index === 0 ? '?filters=' : '') + `${key}|${params[key]}`)
                .join(';')
        }

        console.log(range)
        if(range?.current[0] !== 0 || range?.current[1] !== 0) {
            query += (query.length === 0 ? '?filters=' : ';') + `price|${range.current[0]},${range.current[1]}`
        }

        return query
    }

    const prepareResponseParams = (response) => {
        if(response.code === 200) {
            setItems(response.data)
            setPaginator({
                first: response.meta.from,
                rows: response.meta.per_page,
                total: response.meta.total
            })
            setLoading(false)
        }
    }

    return {
        items,
        getItems,
        useStoreIsReady,
        filterType,
        loading,
        paginator
    }
}
