import { Slider } from "primereact/slider";
import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";
import { TypeProductEnum } from "@/lib/TypeProductEnum";

export function RangeComponent({ type, isActive = true }) {
    const { filterTires, filterWheels, setRangeFilterTires, setRangeFilterWheels } = useStore();

    const filterData = type === TypeProductEnum.TIRES ? filterTires : filterWheels;
    const setRangeFilter = type === TypeProductEnum.TIRES ? setRangeFilterTires : setRangeFilterWheels;

    // Локальное состояние для ручного ввода
    const [minValue, setMinValue] = useState(filterData?.range.current[0]);
    const [maxValue, setMaxValue] = useState(filterData?.range.current[1]);

    // Обновление локального состояния при изменении данных в store
    useEffect(() => {
        setMinValue(filterData?.range.current[0]);
        setMaxValue(filterData?.range.current[1]);
    }, [filterData?.range.current]);

    const handleSliderChange = (e) => {

        if(e.value[1] >= e.value[0]) {
            setRangeFilter({ type: "current", value: e.value });
        }
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
                        value={isActive ? minValue : ''}
                        onChange={handleMinChange}
                        className={isActive ? '' : 'disabled'}
                        readOnly
                    />
                </div>
                <div className="price-inputs">
                    <span>До:</span>
                    <input
                        type="number"
                        id="priceMax"
                        value={isActive ? maxValue : ''}
                        onChange={handleMaxChange}
                        className={isActive ? '' : 'disabled'}
                        readOnly
                    />
                </div>
            </div>
            <Slider
                value={[minValue, maxValue]}
                onChange={handleSliderChange}
                min={filterData?.range.all[0]}
                max={filterData?.range.all[1]}
                range
                className={isActive ? '' : 'disabled'}
            />
        </div>
    );
}
