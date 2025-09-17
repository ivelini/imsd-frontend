import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import FilterDropdown from "./FilterDropdown";
import { RangeComponent } from "./RangeComponent";

/**
 * Фильтры подбора шин.
 *
 * - Загружает параметры через store.loadTireParams().
 * - Управляет выбором параметров (ширина, профиль, диаметр и т. д.).
 * - Отображает диапазон цен (RangeComponent).
 */
export function TireFilter() {
    const {
        filterTires,
        paramsTires,
        loadTireParams,
        setParamFilterTires,
        setRangeIsActive
    } = useStore();

    useEffect(() => {
        loadTireParams();
    }, []);

    const handleChange = (type, value) => {
        setParamFilterTires({ type, value });
        setRangeIsActive(false);
    };

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Ширина" options={paramsTires.width} value={filterTires.params.width} onChange={(v) => handleChange("width", v.id)} />
            <FilterDropdown label="Профиль" options={paramsTires.height} value={filterTires.params.height} onChange={(v) => handleChange("height", v.id)} />
            <FilterDropdown label="Диаметр" options={paramsTires.diameter} value={filterTires.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Сезонность" options={paramsTires.season} value={filterTires.params.season} onChange={(v) => handleChange("season", v.id)} />
            <FilterDropdown label="Тип шин" options={paramsTires.diameter} value={filterTires.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Производитель" options={paramsTires.diameter} value={filterTires.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Страна" options={paramsTires.diameter} value={filterTires.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <RangeComponent type="TIRES" />
        </div>
    );
}
