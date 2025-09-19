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
        getListFilterTires,
        getValuesFilterTires,
        loadListFilterTire,
        setValueParamsFilterTires,
        setRangeIsActive
    } = useStore();
    
    const list = getListFilterTires()
    const values = getValuesFilterTires()

    useEffect(() => {
        loadListFilterTire();
    }, []);

    const handleChange = (type, value) => {
        setValueParamsFilterTires({ type, value });
        setRangeIsActive(false);
    };

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Ширина" options={list.width} value={values.params.width} onChange={(v) => handleChange("width", v.id)} />
            <FilterDropdown label="Профиль" options={list.height} value={values.params.height} onChange={(v) => handleChange("height", v.id)} />
            <FilterDropdown label="Диаметр" options={list.diameter} value={values.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Сезонность" options={list.season} value={values.params.season} onChange={(v) => handleChange("season", v.id)} />
            <FilterDropdown label="Тип шин" options={list.diameter} value={values.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Производитель" options={list.diameter} value={values.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Страна" options={list.diameter} value={values.params.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <RangeComponent type="TIRES" />
        </div>
    );
}
