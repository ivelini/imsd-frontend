import {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import BackendApi from "@/lib/BackendApi";
import {useStore} from "@/store/useStore";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import FilterDropdown from "@/components/catalog/filter/FilterDropdown";
const DiskFilter = () => {
    const {
        getListFilter,
        getValuesFilter,
        loadListFilter,

        setValueFilterWheels,
        setRangeIsActive,
        setRangeFilterWheels
    } = useStore();

    const list = getListFilter(TypeProductEnum.DISK)
    const values = getValuesFilter(TypeProductEnum.DISK)

    useEffect(() => {
        loadListFilter(TypeProductEnum.DISK);
    }, []);

    const handleChange = (type, value) => {
        setValueFilterWheels({ type, value })
        setRangeFilterWheels({type: 'current', value: [0,0]})
        setRangeFilterWheels({type: 'all', value: [0,0]})
        setRangeIsActive(false);
    };

    return (<>
        <div className="filter-content-item wheel">
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Диаметр" options={list.diameter} value={values.diameter} onChange={(v) => handleChange("diameter", v.id)} />
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Ширина" options={list.width} value={values.width} onChange={(v) => handleChange("width", v.id)} />
                </div>
            </div>

            <div className="select-row three-cells">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="PCD (крепеж)" options={list.pcd} value={values.pcd} onChange={(v) => handleChange("pcd", v.id)} />
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="ET (вылет)" options={list.et} value={values.et} onChange={(v) => handleChange("et", v.id)} />
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="D (ступица)" options={list.dia} value={values.dia} onChange={(v) => handleChange("dia", v.id)} />
                </div>
            </div>
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Тип диска" options={list.type} value={values.type} onChange={(v) => handleChange("type", v.id)} />
                </div>
                <div className="custom-select-wrapper">
                    <FilterDropdown label="Производитель" options={list.vendor} value={values.vendor} onChange={(v) => handleChange("vendor", v.id)} />
                </div>
            </div>
        </div>
    </>)
}
export default DiskFilter
