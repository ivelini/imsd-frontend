import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import FilterDropdown from "./FilterDropdown";
import { RangeComponent } from "./RangeComponent";

/**
 * Фильтры подбора дисков.
 *
 * - Загружает параметры через store.loadDiskParams().
 * - Управляет выбором параметров (диаметр, ширина, PCD, ET и т. д.).
 * - Отображает диапазон цен (RangeComponent).
 */
export function DiskFilter() {
    const {
        filterWheels,
        paramsWheels,
        loadDiskParams,
        setParamFilterWheels,
        setRangeIsActive
    } = useStore();

    useEffect(() => {
        loadDiskParams();
    }, []);

    const handleChange = (type, value) => {
        setParamFilterWheels({ type, value });
        setRangeIsActive(false);
    };

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Диаметр" options={paramsWheels.diameter} value={filterWheels.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Ширина" options={paramsWheels.width} value={filterWheels.params.width} onChange={(v) => handleChange("width", v.id)} />
            {/* ... остальные фильтры ... */}
            <RangeComponent type="DISKS" />
        </div>
    );
}
