import {useEffect, useState} from "react";
import {useStore} from "@/store/useStore";
import FilterDropdown from "@/components/catalog/filter/FilterDropdown";

const AutoFilter = ({ type }) => {
    const { loadListCarParams,
        getListFilterCar,
        getValuesFilterCar,
        setValueFilterCar
    } = useStore();

    let list = getListFilterCar();
    let values = getValuesFilterCar();

    useEffect(() => {
        loadListCarParams()
    }, [getValuesFilterCar()])

    const handleChange = (key, value, resetKeys = []) => {
        if(value === 'Любой') value = null
        setValueFilterCar({ type: key, value });
        resetKeys.forEach((rk) => setValueFilterCar({ type: rk, value: null }));
    };

    return (<>
        <div className="filter-content-item auto" style={{"display": "block"}}>
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Производитель"
                                    options={list.vendor}
                                    value={values.vendor !== undefined ? values.vendor : null}
                                    onChange={(v) => handleChange("vendor", v.name, ["model", "year", "modification"])}/>
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Модель"
                                    options={list.model}
                                    value={values.model !== undefined ? values.model : null}
                                    onChange={(v) => handleChange("model", v.name, ["year", "modification"])}
                                    disabled={Object.keys(values).length === 0} />
                </div>
            </div>
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Год выпуска"
                                    options={list.year}
                                    value={values.year !== undefined ? values.year : null}
                                    onChange={(v) => handleChange("year", v.name, ["modification"])}
                                    disabled={Object.keys(values).length <= 1} />
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Модификация"
                                    options={list.modification}
                                    value={values.modification !== undefined ? values.modification : null}
                                    onChange={(v) => handleChange("modification", v.name)}
                                    disabled={Object.keys(values).length <= 2} />
                </div>
            </div>
        </div>
    </>)
}
export default AutoFilter
