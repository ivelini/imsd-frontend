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
    const { filterType, setFilterType, clearFilters, filterTires, filterWheels } = useStore();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const entityFilter = type === TypeProductEnum.DISKS ? filterWheels : filterTires;

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
                <div className={`filter-item-catalog ${filterType === "CAR" ? "inactive" : ""}`} onClick={() => setFilterType("PARAM")}>
                    По параметрам
                </div>
                <div className={`filter-item-catalog ${filterType === "PARAM" ? "inactive" : ""}`} onClick={() => setFilterType("CAR")}>
                    По автомобилю
                </div>
            </div>

            <div className="catalog-filter-cont">
                <br />
                <LocationComponent />

                {type === TypeProductEnum.TIRES && filterType === "PARAM" && <TireFilter />}
                {type === TypeProductEnum.DISKS && filterType === "PARAM" && <DiskFilter />}
                {filterType === "CAR" && <AutoFilter type={type} />}

                <a href="#" className="remove-filters help" onClick={handleResetAllFilters}>
                    Сбросить все фильтры
                </a>
            </div>
        </div>
    );
}
