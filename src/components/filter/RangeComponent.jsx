"use client";

import { Slider } from "primereact/slider";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

/**
 * Компонент выбора диапазона цен.
 *
 * Используется внутри TireFilter и DiskFilter.
 * Работает в связке с Zustand-хранилищем (range.current, range.all).
 *
 * @param {string} type - тип продукта ("TIRES" или "DISKS").
 */
export function RangeComponent({ type }) {
    const { filterTires, filterWheels, setRangeFilterTires, setRangeFilterWheels, rangeIsActive } = useStore();

    const filter = type === "TIRES" ? filterTires : filterWheels;
    const setRangeFilter = type === "TIRES" ? setRangeFilterTires : setRangeFilterWheels;

    const [value, setValue] = useState(filter.range.current);

    useEffect(() => {
        setValue(filter.range.current);
    }, [filter.range.current]);

    const handleChange = (val) => {
        setValue(val);
        setRangeFilter({ type: "current", value: val });
    };

    return (
        <div className={`range-component ${!rangeIsActive ? "disabled" : ""}`}>
            <h4>Цена</h4>
            <Slider
                value={value}
                onChange={(e) => handleChange(e.value)}
                range
                min={filter.range.all[0]}
                max={filter.range.all[1]}
                disabled={!rangeIsActive}
            />
            <div className="range-values">
                <span>{value?.[0] ?? filter.range.all[0]} ₽</span> — <span>{value?.[1] ?? filter.range.all[1]} ₽</span>
            </div>
        </div>
    );
}
