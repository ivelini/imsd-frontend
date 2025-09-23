import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import FilterDropdown from "./FilterDropdown";
import { RangeComponent } from "./RangeComponent";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

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
        setValueFilterTires,
        setRangeIsActive,
        setRangeFilterTires
    } = useStore();
    
    const list = getListFilterTires()
    const values = getValuesFilterTires()

    useEffect(() => {
        loadListFilterTire();
    }, []);

    const handleChange = (type, value) => {
        setValueFilterTires({ type, value })
        setRangeFilterTires({type: 'current', value: [0,0]})
        setRangeFilterTires({type: 'all', value: [0,0]})
        setRangeIsActive(false);
    };

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Ширина" options={list.width} value={values.width} onChange={(v) => handleChange("width", v.id)} />
            <FilterDropdown label="Профиль" options={list.height} value={values.height} onChange={(v) => handleChange("height", v.id)} />
            <FilterDropdown label="Диаметр" options={list.diameter} value={values.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Сезонность" options={list.season} value={values.season} onChange={(v) => handleChange("season", v.id)} />
            <FilterDropdown label="Тип шин" options={list.is_spike} value={values.is_spike} onChange={(v) => handleChange("is_spike", v.id)} />
            <FilterDropdown label="Производитель" options={list.vendor} value={values.vendor} onChange={(v) => handleChange("vendor", v.id)} />
            <FilterDropdown label="Страна" options={list.country} value={values.country} onChange={(v) => handleChange("country", v.id)} />
            <RangeComponent type={TypeProductEnum.TIRES} />
        </div>
    );
}
