"use client";

import { useEffect } from "react";
import LocationComponent from "@/components/ui/LocationComponent";
import { TireFilter } from "./TireFilter";
import { DiskFilter } from "./DiskFilter";
import AutoFilter from "./AutoFilter";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import { useStore } from "@/store/useStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useSelection} from "@/hooks/useSelection";

/**
 * Главный фильтр-контейнер.
 *
 * - Управляет переключением "По параметрам / По авто" через Zustand.
 * - Рендерит соответствующие подкомпоненты (TireFilter / DiskFilter / AutoFilter).
 * - Сбрасывает все фильтры через store.clearFilter().
 * - Отображает LocationComponent для выбора города.
 */
export default function Filter({ type, onApplyFilter }) {
    const {
        getIsHidden,
        getFilterType,
        setFilterType,
        getValuesFilterTires,
        getValuesFilterWheels,
        setValueFilterCar,
        clearFilter
    } = useStore();

    useEffect(() => {
        setFilterType("PARAM")
        clearFilter({entity: 'car', param: 'values'});
    }, []);

    const handleResetAllFilters = () => {
        clearFilter()
        onApplyFilter({isClearFilter: true})
    };

    return (
        <div className={`catalog-filter ${getIsHidden() ? "catalog-filter-show" : ""}`} id="filter-in-catalog">
            {/* Переключатель */}
            <div className="catalog-filter-category">
                <div className={`filter-item-catalog ${getFilterType() === "CAR" ? "inactive" : ""}`} onClick={() => setFilterType("PARAM")}>
                    По параметрам
                </div>
                <div className={`filter-item-catalog ${getFilterType() === "PARAM" ? "inactive" : ""}`} onClick={() => setFilterType("CAR")}>
                    По автомобилю
                </div>
            </div>

            <div className="catalog-filter-cont">
                <br />
                <LocationComponent />

                {type === TypeProductEnum.TIRE && getFilterType() === "PARAM" && <TireFilter />}
                {type === TypeProductEnum.DISK && getFilterType() === "PARAM" && <DiskFilter />}
                {getFilterType() === "CAR" && <AutoFilter type={type} />}

                <button className="get-result" type="button" onClick={onApplyFilter}>Подобрать</button>
                <a href="#" className="remove-filters help" onClick={handleResetAllFilters}>
                    Сбросить все фильтры
                </a>
            </div>
        </div>
    );
}
