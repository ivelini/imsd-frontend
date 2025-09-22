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
        getFilterType
    } = useStore()

    const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)

    let filterType = getFilterType()


    return {
        useStoreIsReady,
        filterType,
        paginator
    }
}
