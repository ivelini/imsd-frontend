"use client";

import { Slider } from "primereact/slider";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

/**
 * Компонент выбора диапазона цен.
 *
 * Используется внутри TireFilter и DiskFilter.
 * Работает в связке с Zustand-хранилищем (range.current, range.all).
 *
 * @param {string} type - тип продукта ("TIRES" или "DISKS").
 */
export function RangeComponent({ type }) {
    const {
        getRangeFilterTires,
        getRangeFilterWheels,
        setRangeFilterTires,
        setRangeFilterWheels,
        getRangeIsActive
    } = useStore();

    const values = type === TypeProductEnum.TIRES
        ? getRangeFilterTires()
        : getRangeFilterWheels()

    const setRangeFilter = type === TypeProductEnum.TIRES
        ? setRangeFilterTires
        : setRangeFilterWheels;

    let isActive = getRangeIsActive()

    const handleChange = (val) => {
        setRangeFilter({ type: "current", value: val });
    };

    return (
        <div className={`range-component ${!getRangeIsActive() ? "disabled" : ""}`}>
            <h4>Цена</h4>
            <div className="input-filters">
                <div className="price-inputs">
                    <span>От:</span>
                    <input
                        type="number"
                        id="priceMin"
                        value={isActive ? values.current[0] : ''}
                        onChange={handleChange}
                        className={isActive ? '' : 'disabled'}
                        readOnly
                    />
                </div>
                <div className="price-inputs">
                    <span>До:</span>
                    <input
                        type="number"
                        id="priceMax"
                        value={isActive ? values.current[1] : ''}
                        onChange={handleChange}
                        className={isActive ? '' : 'disabled'}
                        readOnly
                    />
                </div>
            </div>
            <Slider
                value={values}
                onChange={(e) => handleChange(e.value)}
                range
                min={values.all[0]}
                max={values.all[1]}
                disabled={!isActive}
            />
            <div className="range-values">
                <span>{values?.current[0] ?? values.all[0]} ₽</span> — <span>{values?.current[1] ?? values.all[1]} ₽</span>
            </div>
        </div>
    );
}
