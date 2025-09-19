"use client";

import { useEffect } from "react";
import LocationComponent from "@/components/ui/LocationComponent";
import { TireFilter } from "./TireFilter";
import { DiskFilter } from "./DiskFilter";
import AutoFilter from "./AutoFilter";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import { useStore } from "@/store/useStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Главный фильтр-контейнер.
 *
 * - Управляет переключением "По параметрам / По авто" через Zustand.
 * - Рендерит соответствующие подкомпоненты (TireFilter / DiskFilter / AutoFilter).
 * - Сбрасывает все фильтры через store.clearFilters().
 * - Отображает LocationComponent для выбора города.
 */
export default function Filter({ type, isMobileFilterShow = false }) {
    const {
        getFilterType,
        setFilterType,
        getValuesFilterTires,
        getValuesFilterWheels,
        clearFilters
    } = useStore();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const entityFilter = type === TypeProductEnum.DISKS
            ? getValuesFilterTires()
            : getValuesFilterWheels()

        if (
            Object.keys(entityFilter.params).length > 0 ||
            (
                Object.keys(entityFilter.params).length === 0 &&
                Object.keys(entityFilter.car).length === 0 &&
                (searchParams.get("filterType") == null || searchParams.get("filterType") === "param")
            )
        ) {
            setFilterType("PARAM");
        } else if (
            Object.keys(entityFilter.car).length > 0 ||
            (searchParams.get("filterType") == null || searchParams.get("filterType") === "car")
        ) {
            setFilterType("CAR");
        }
    }, []);

    const handleResetAllFilters = () => {
        clearFilters();
        setFilterType("PARAM");
        window.sessionStorage.setItem(`scrollY-${pathname}`, 0);
        router.replace(pathname);
    };

    return (
        <div className={`catalog-filter ${isMobileFilterShow ? "catalog-filter-show" : ""}`} id="filter-in-catalog">
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

                {type === TypeProductEnum.TIRES && getFilterType() === "PARAM" && <TireFilter />}
                {type === TypeProductEnum.DISKS && getFilterType() === "PARAM" && <DiskFilter />}
                {getFilterType() === "CAR" && <AutoFilter type={type} />}

                <button className="get-result" type="button" >Подобрать</button>
                <a href="#" className="remove-filters help" onClick={handleResetAllFilters}>
                    Сбросить все фильтры
                </a>
            </div>
        </div>
    );
}
