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

    const values = type === TypeProductEnum.TIRE
        ? getRangeFilterTires()
        : getRangeFilterWheels()

    const setRangeFilter = type === TypeProductEnum.TIRE
        ? setRangeFilterTires
        : setRangeFilterWheels;

    let isActive = getRangeIsActive()

    const handleChange = (val) => {
        setRangeFilter({ type: "current", value: val });
    };

    return (
        <div>
            <h4>Цена</h4>
            <div className="input-filters">
                <div className="price-inputs">
                    <span>От:</span>
                    <input
                        type="number"
                        id="priceMin"
                        value={isActive ? values.current[0] : ''}
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
                        className={isActive ? '' : 'disabled'}
                        readOnly
                    />
                </div>
            </div>
            <Slider
                value={[values.current[0], values.current[1]]}
                onChange={(e) => handleChange(e.value)}
                range
                min={values.all[0]}
                max={values.all[1]}
                disabled={!isActive}
                className={isActive ? '' : 'disabled'}
            />
        </div>
    );
}
