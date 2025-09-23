"use client";

import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";
import {useStore} from "@/store/useStore";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

/**
 * Хук для выборки продукции (шины или диски).
 */

export function useSelection(type) {
    const {
        useStoreIsReady,
        getFilterType,
        getValuesFilterTires,
        getValuesFilterCar,
        getRangeFilterTires,
        setPaginatorFilterTires,
        setRangeFilterTires,
        setRangeIsActive,
    } = useStore()

    const [items, setItems] = useState([])
    const [specifications, setSpecifications] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        switch (getFilterType()) {
            case "PARAM":
                getItemsForParamsFilter()
                break
        }
    }, [getFilterType()])

    /**
     * Получить продукцию по выбранным параметрам
     */
    const getItemsForParamsFilter = async () => {
        let response = await BackendApi.get(`/api/catalog/${type}` + prepareParams(getValuesFilterTires(), getRangeFilterTires()))
        prepareResponseItemsForParams(response)
        setRangeFilterTires({type: 'all', value: response.meta?.range_price?.all ?? [0, 0]})
        setRangeFilterTires({type: 'current', value: response.meta?.range_price?.currentFilter ?? [0, 0]})
        setRangeIsActive(true)
    }

    const prepareParams = (params, range = null) => {
        let query = ''

        if (Object.keys(params).length > 0) {
            query = Object.keys(params)
                .map((key, index) => (index === 0 ? '?filters=' : '') + `${key}|${params[key]}`)
                .join(';')
        }

        if (range?.current[0] !== 0 || range?.current[1] !== 0) {
            query += (query.length === 0 ? '?filters=' : ';') + `price|${range.current[0]},${range.current[1]}`
        }

        return query
    }

    const prepareResponseItemsForParams = (response) => {
        if (response.code === 200) {
            setItems(response.data)
            if (type === TypeProductEnum.TIRE) setPaginatorFilterTires({first: response.meta.from, rows: response.meta.per_page, total: response.meta.total})
            setLoading(false)
        }
    }
    /**
     * Получить спецификацию для выбранных параметров
     */
    const getSpecifications = async () => {
        let response = await BackendApi.get(`/api/list/filter/vehicle/${type}/specifications`, getValuesFilterCar())
        setSpecifications(response.data ?? {})
    }

    return {
        items,
        specifications,
        getItemsForParamsFilter,
        getSpecifications,
        useStoreIsReady,
        loading
    }
}
