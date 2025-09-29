import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import FilterDropdown from "./FilterDropdown";
import { RangeComponent } from "./RangeComponent";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

/**
 * Фильтры подбора дисков.
 *
 */
export function DiskFilter() {
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

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Диаметр" options={list.diameter} value={values.diameter} onChange={(v) => handleChange("diameter", v.id)} />
            <FilterDropdown label="Ширина" options={list.width} value={values.width} onChange={(v) => handleChange("width", v.id)} />
            <FilterDropdown label="PCD (крепеж)" options={list.pcd} value={values.pcd} onChange={(v) => handleChange("pcd", v.id)} />
            <FilterDropdown label="ET (вылет)" options={list.et} value={values.et} onChange={(v) => handleChange("et", v.id)} />
            <FilterDropdown label="D (ступица)" options={list.dia} value={values.dia} onChange={(v) => handleChange("dia", v.id)} />
            <FilterDropdown label="Тип диска" options={list.type} value={values.type} onChange={(v) => handleChange("type", v.id)} />
            <FilterDropdown label="Производитель" options={list.vendor} value={values.vendor} onChange={(v) => handleChange("vendor", v.id)} />
            <RangeComponent type={TypeProductEnum.DISK} />
        </div>
    );
}
