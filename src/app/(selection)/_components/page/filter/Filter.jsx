"use client"

import {useState} from "react";
import LocationComponent from "@/components/ui/LocationComponent";
import { TireFilter } from "@/app/(selection)/_components/page/filter/TireFilter";
import { useStore } from "@/store/useStore";
import AutoFilter from "./AutoFilter";

export default function Filter({ type, collback }) {
    const { clearFilter } = useStore()
    const [switcher, setSwitcher] = useState('PARAM')


    return (<>
        <div className="catalog-filter" id="filter-in-catalog">
            <div className="catalog-filter-category">
                <div className={`filter-item-catalog  ${switcher == 'CAR' && 'inactive'}`} onClick={() => setSwitcher('PARAM')}>По параметрам</div>
                <div className={`filter-item-catalog  ${switcher == 'PARAM' && 'inactive'}`} onClick={() => setSwitcher('CAR')}>По автомобилю</div>
            </div>
            <div className="catalog-filter-cont">
                <LocationComponent />
                {type === 'TIRES' && switcher === 'PARAM' && <TireFilter collback={collback} />}
                {type === 'TIRES' && switcher === 'CAR' && <AutoFilter type="SWTIRES" collback={collback} />}
                
                <a href="#" className="remove-filters help" onClick={() => clearFilter()}>Сбросить все фильтры</a>
            </div>
        </div>
    </>)
}