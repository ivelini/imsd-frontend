import {Slider} from "primereact/slider";
import {useStore} from "@/store/useStore";
import {useEffect} from "react";

export function RangeComponent({ type }) {
    const { filterTires, filterWheels, setRangeFilterTires, setRangeFilterWheels } = useStore()


    return (<>
        <div className="filter-price">
            <label htmlFor="priceRange">Цена:</label>
            <div className="input-filters">
                <div className="price-inputs">
                    <span>От:</span>
                    <input type="text" id="priceMin" value={type === 'TIRES' ? filterTires.range.current[0] : filterWheels.range.current[0]}/>
                </div>
                <div className="price-inputs">
                    <span>До:</span>
                    <input type="text" id="priceMax" value={type === 'TIRES' ? filterTires.range.current[1] : filterWheels.range.current[1]}/>
                </div>
            </div>
            <Slider
                value={type === 'TIRES' ? filterTires.range.current : filterWheels.range.current}
                onChange={(e) => type === 'TIRES' ? setRangeFilterTires({type: 'current', value: e.value}) : setRangeFilterWheels({type: 'current', value: e.value})}
                min={type === 'TIRES' ? filterTires.range.all[0] : filterWheels.range.all[0]}
                max={type === 'TIRES' ? filterTires.range.all[1] : filterWheels.range.all[1]}
                range/>
        </div>
    </>)
}