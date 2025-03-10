"use client"

import { useEffect, useState } from "react";
import LocationComponent from "@/components/ui/LocationComponent";
import { TireFilter } from "@/app/(selection)/_components/page/filter/TireFilter";
import { useStore } from "@/store/useStore";
import AutoFilter from "./AutoFilter";
import { TypeProductEnum } from "@/lib/TypeProductEnum";

export default function Filter({ type, collback, setSwitcherFilter }) {
    const { filterTires, filterWheels, clearFilter } = useStore()
    const [switcher, setSwitcher] = useState()

    useEffect(() => {
        if (
            Object.keys(filterTires.params).length > 0 ||
            (Object.keys(filterTires.params).length === 0 && Object.keys(filterTires.car).length === 0)
        ) {
            setSwitcher('PARAM')
            setSwitcherFilter('PARAM')
        } else if (Object.keys(filterTires.car).length > 0) {
            setSwitcher('CAR')
            setSwitcherFilter('CAR')
        }
    }, [])


    return (<>
        <div className="catalog-filter" id="filter-in-catalog">
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
                {type === 'TIRES' && switcher === 'PARAM' && <TireFilter collback={collback} />}
                {type === 'TIRES' && switcher === 'CAR' && <AutoFilter type={TypeProductEnum.TIRES} collback={collback} />}

                <a href="#" className="remove-filters help" onClick={() => clearFilter()}>Сбросить все фильтры</a>
            </div>
        </div>
    </>)
}