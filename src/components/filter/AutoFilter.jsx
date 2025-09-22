import { useStore } from "@/store/useStore";
import FilterDropdown from "./FilterDropdown";
import {useEffect} from "react";

/**
 * Фильтры по автомобилю.
 *
 * - Загружает параметры через store.loadCarParams().
 * - Управляет выбором авто (vendor → model → year → modification).
 * - При выборе значения сбрасывает зависимые поля.
 *
 * @param {string} type - TIRES или DISKS.
 */
export default function AutoFilter({ type }) {
    const { loadListCarParams,
        getListFilterCar,
        getValuesFilterCar,
        setValueCarFilter
    } = useStore();

    let list = getListFilterCar();
    let values = getValuesFilterCar();

    useEffect(() => {
        loadListCarParams()
    }, [getValuesFilterCar()])

    const handleChange = (key, value, resetKeys = []) => {
        if(value === 'Любой') value = null
        setValueCarFilter({ type: key, value });
        resetKeys.forEach((rk) => setValueCarFilter({ type: rk, value: null }));
    };

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Производитель"
                            options={list.vendor}
                            value={values.vendor !== undefined ? values.vendor : null}
                            onChange={(v) => handleChange("vendor", v.name, ["model", "year", "modification"])}/>
            <FilterDropdown label="Модель"
                            options={list.model}
                            value={values.model !== undefined ? values.model : null}
                            onChange={(v) => handleChange("model", v.name, ["year", "modification"])}
                            disabled={Object.keys(values).length === 0} />
            <FilterDropdown label="Год выпуска"
                            options={list.year}
                            value={values.year !== undefined ? values.year : null}
                            onChange={(v) => handleChange("year", v.name, ["modification"])}
                            disabled={Object.keys(values).length <= 1} />
            <FilterDropdown label="Модификация"
                            options={list.modification}
                            value={values.modification !== undefined ? values.modification : null}
                            onChange={(v) => handleChange("modification", v.name)}
                            disabled={Object.keys(values).length <= 2} />
        </div>
    )
}
