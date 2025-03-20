"use client"

import { useEffect } from "react"
import { useStore } from "@/store/useStore"

/**
 * Вызывает перезагрузку страницы при изменении города
 */
export default function LocationReloadComponent() {
    const { getSelectedCity } = useStore()

    useEffect(() => {
    
        let url = new URL(window.location.href)

        if (getSelectedCity().name_en !== 'Chelyabinsk' && getSelectedCity().name_en !== url.searchParams.get('city_name')) {
    
            url.searchParams.set('city_name', getSelectedCity().name_en)
            history.pushState({}, '', url)
            window.location.reload()
        } else if(getSelectedCity().name_en === 'Chelyabinsk' && url.searchParams.get('city_name') !== null) {

            url.searchParams.delete('city_name')
            history.pushState({}, '', url)
            window.location.reload()
        }
    }, [getSelectedCity()])
}