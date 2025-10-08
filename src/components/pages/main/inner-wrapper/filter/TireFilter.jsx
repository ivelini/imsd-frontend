import {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import BackendApi from "@/lib/BackendApi";
import {useStore} from "@/store/useStore";
import {useSelection} from "@/hooks/useSelection";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import FilterDropdown from "@/components/catalog/filter/FilterDropdown";


const TireFilter = () => {
    const {
        getValuesFilter,
        getListFilter,
        loadListFilter,
        setValueFilterTires,
        setRangeFilterTires,
        setRangeIsActive,
        clearFilter
    } = useStore()
    const {} = useSelection(TypeProductEnum.TIRE)

    const list = getListFilter(TypeProductEnum.TIRE)
    const values = getValuesFilter(TypeProductEnum.TIRE)

    useEffect(() => {
        loadListFilter(TypeProductEnum.TIRE);
        clearFilter()
    }, [])

    const handleChange = (type, value) => {
        setValueFilterTires({ type, value })
        setRangeFilterTires({type: 'current', value: [0,0]})
        setRangeFilterTires({type: 'all', value: [0,0]})
        setRangeIsActive(false);
    };


    return (<>
        <div className="filter-content-item disk" style={{"display": "block"}}>
            <div className="select-row three-cells">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Ширина" options={list.width} value={values.width} onChange={(v) => handleChange("width", v.id)} />
                </div>

                <div className="custom-select-wrapper">
                    <FilterDropdown label="Профиль" options={list.height} value={values.height} onChange={(v) => handleChange("height", v.id)} />
                </div>

                <div className="custom-select-wrapper">
                    <FilterDropdown label="Диаметр" options={list.diameter} value={values.diameter} onChange={(v) => handleChange("diameter", v.id)} />
                </div>
            </div>

            <div className="select-row">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Сезонность" options={list.season} value={values.season} onChange={(v) => handleChange("season", v.id)} />
                </div>

                <div className="custom-select-wrapper">
                    <FilterDropdown label="Тип шин" options={list.is_spike} value={values.is_spike} onChange={(v) => handleChange("is_spike", v.id)} />
                </div>
            </div>

            <div className="select-row">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Производитель" options={list.vendor} value={values.vendor} onChange={(v) => handleChange("vendor", v.id)} />
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Страна" options={list.country} value={values.country} onChange={(v) => handleChange("country", v.id)} />
                </div>
            </div>
        </div>
    </>)

}
export default TireFilter
