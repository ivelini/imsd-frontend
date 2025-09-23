"use client"

import { useEffect, useState } from "react";
import LocationComponent from "@/components/ui/LocationComponent";
import { TireFilter } from "@/app/(selection)/_components/page/filter/TireFilter";
import { useStore } from "@/store/useStore";
import AutoFilter from "./AutoFilter";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import { DiskFilter } from "./DiskFilter";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Filter({ type, collback, setSwitcherFilter, isMobileFilterShow = false }) {
    const { filterTires, filterWheels, clearFilter } = useStore()
    const [switcher, setSwitcher] = useState()

    const router = useRouter();
    const pathname = usePathname(); // Только путь без query
    const searchParams = useSearchParams(); //query параметры из адресной строки

    useEffect(() => {
        let entityFilter = filterTires

        if (type === TypeProductEnum.DISK) {
            entityFilter = filterWheels
        }

        if (
            Object.keys(entityFilter.params).length > 0 ||
            (
                Object.keys(entityFilter.params).length === 0 && Object.keys(entityFilter.car).length === 0
                && (searchParams.get('filterType') == null || searchParams.get('filterType') === 'param')
            )
        ) {
            setSwitcher('PARAM')
            setSwitcherFilter('PARAM')
        } else if (
            Object.keys(entityFilter.car).length > 0
            || (searchParams.get('filterType') == null || searchParams.get('filterType') === 'car')
        ) {
            setSwitcher('CAR')
            setSwitcherFilter('CAR')
        }
    }, [])

    const hamdleResetAllFilters = () => {
        clearFilter()

        setSwitcher('PARAM')
        setSwitcherFilter('PARAM')

        window.sessionStorage.setItem(`scrollY-${pathname}`, 0)
        router.replace(pathname)
        window.location.reload()
    }

    return (<>
        <div className={`catalog-filter ${isMobileFilterShow ? 'catalog-filter-show' : ''}`} id="filter-in-catalog">
            <div className="catalog-filter-category">
                <div className={`filter-item-catalog  ${switcher == 'CAR' && 'inactive'}`} onClick={() => {
                    setSwitcher('PARAM')
                    setSwitcherFilter('PARAM')
                }}>По параметрам</div>
                <div className={`filter-item-catalog  ${switcher == 'PARAM' && 'inactive'}`} onClick={() => {
                    setSwitcher('CAR')
                    setSwitcherFilter('CAR')
                }}>По автомобилю</div>
            </div>
            <div className="catalog-filter-cont">
                <br />
                <LocationComponent />
                {type === TypeProductEnum.TIRE && switcher === 'PARAM' && <TireFilter collback={collback} />}
                {type === TypeProductEnum.DISK && switcher === 'PARAM' && <DiskFilter collback={collback} />}

                {switcher === 'CAR' && <AutoFilter type={type} collback={collback} />}

                <a href="#" className="remove-filters help" onClick={hamdleResetAllFilters}>Сбросить все фильтры</a>
            </div>
        </div>
    </>)
}