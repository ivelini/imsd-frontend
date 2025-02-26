import { Slider } from "primereact/slider";
import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";

export function RangeComponent({ type }) {
    const { filterTires, filterWheels, setRangeFilterTires, setRangeFilterWheels } = useStore();

    const filterData = type === "TIRES" ? filterTires : filterWheels;
    const setRangeFilter = type === "TIRES" ? setRangeFilterTires : setRangeFilterWheels;

    // Локальное состояние для ручного ввода
    const [minValue, setMinValue] = useState(filterData?.range.current[0] || 100);
    const [maxValue, setMaxValue] = useState(filterData?.range.current[1] || 10000);

    // Обновление локального состояния при изменении данных в store
    useEffect(() => {
        setMinValue(filterData?.range.current[0] || 100);
        setMaxValue(filterData?.range.current[1] || 10000);
    }, [filterData?.range.current]);

    const handleSliderChange = (e) => {
        setRangeFilter({ type: "current", value: e.value });
    };

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        setMinValue(value);
        setRangeFilter({ type: "current", value: [value, maxValue] });
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        setMaxValue(value);
        setRangeFilter({ type: "current", value: [minValue, value] });
    };

    return (
        <div className="filter-price">
            <label htmlFor="priceRange">Цена:</label>
            <div className="input-filters">
                <div className="price-inputs">
                    <span>От:</span>
                    <input
                        type="number"
                        id="priceMin"
                        value={minValue}
                        onChange={handleMinChange}
                    />
                </div>
                <div className="price-inputs">
                    <span>До:</span>
                    <input
                        type="number"
                        id="priceMax"
                        value={maxValue}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
            <Slider
                value={[minValue, maxValue]}
                onChange={handleSliderChange}
                min={filterData?.range.all[0] || 100}
                max={filterData?.range.all[1] || 10000}
                range
            />
        </div>
    );
}
