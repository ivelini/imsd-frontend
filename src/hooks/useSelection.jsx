"use client";

import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";
import {useStore} from "@/store/useStore";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import {useParams, useSearchParams} from "next/navigation";

/**
 * Хук для выборки продукции (шины или диски).
 */

export function useSelection(type) {
    const {
        useStoreIsReady,

        getFilterType,
        getValuesFilter,
        getValuesFilterCar,
        getRangeFilter,
        getVehicleIds,

        setPaginatorFilterTires,
        setPaginatorFilterWheels,
        setRangeFilterTires,
        setRangeFilterWheels,
        setRangeIsActive,
    } = useStore()

    const [items, setItems] = useState([])
    const [specifications, setSpecifications] = useState({})
    const [loading, setLoading] = useState(true)
    const queryParams = useSearchParams()

    useEffect(() => {
        switch (getFilterType()) {
            case "PARAM":
                getItemsFromParamValues()
                break
        }
    }, [getFilterType()])

    /**
     * Получить продукцию по выбранным параметрам
     */
    const getItemsFromParamValues = async () => {

        let response = await BackendApi.get(`/api/catalog/${type}`, prepareQueryItems())
        prepareResponseItemsForParams(response)
        setRangeIsActive(true)
    }

    /**
     * Получить продукцию по выбранным спецификациям
     */
    const getItemsFromSpecifications = async () => {

        let response = await BackendApi.get(`/api/catalog/vehicle/${type}`, prepareQueryItems())
    }

    const prepareQueryItems = () => {
        let filters = ''

        switch (getFilterType()) {
            case "PARAM":
                let params = getValuesFilter(type)
                filters = Object.keys(params).length > 0
                    ? Object.keys(params)
                        .map(key => `${key}|${params[key]}`)
                        .join(';')
                    : ''

                break
            case "CAR":
                let specifications = getVehicleIds(type)
                filters = specifications.length > 0
                    ? `vehicle|${specifications.join(',')}`
                    : ''
        }

        let range = getRangeFilter(type)
        if (range?.current[0] !== 0 || range?.current[1] !== 0) {
            filters += (filters.length === 0 ? '' : ';') + `price|${range.current[0]},${range.current[1]}`
        }

        let searchParams = new URLSearchParams(window.location.search)

        return {filters, ...Object.fromEntries(searchParams)}
    }

    const prepareResponseItemsForParams = (response) => {
        if (response.code === 200) {
            setItems(response.data)
            switch (type) {
                case TypeProductEnum.TIRE:
                    setPaginatorFilterTires({
                        first: response.meta.from,
                        rows: response.meta.per_page,
                        total: response.meta.total
                    })
                    setRangeFilterTires({type: 'all', value: response.meta?.range_price?.all ?? [0, 0]})
                    setRangeFilterTires({type: 'current', value: response.meta?.range_price?.currentFilter ?? [0, 0]})
                    break
                case TypeProductEnum.DISK:
                    setPaginatorFilterWheels({
                        first: response.meta.from,
                        rows: response.meta.per_page,
                        total: response.meta.total
                    })
                    setRangeFilterWheels({type: 'all', value: response.meta?.range_price?.all ?? [0, 0]})
                    setRangeFilterWheels({type: 'current', value: response.meta?.range_price?.currentFilter ?? [0, 0]})
            }
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
        getItemsFromParamValues,
        getSpecifications,
        useStoreIsReady,
        loading
    }
}
