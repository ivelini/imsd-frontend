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
        setValueFilterTires,
        clearFilter
    } = useStore()
    const {} = useSelection(TypeProductEnum.TIRE)

    const list = getListFilter(TypeProductEnum.TIRE)
    const values = getValuesFilter(TypeProductEnum.TIRE)

    useEffect(() => {
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
                    <Dropdown
                        value={params.season?.find(item => item.id === filterTires.params.season)}
                        onChange={(e) => setParamFilterTires({type: 'season', value: e.value.id})}
                        options={[{ id: null, name: 'Любая' }, ...(params?.season ?? [])]}
                        optionLabel="name"
                        placeholder="Сезонность"
                        className="custom-select"
                        dropdownIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                        collapseIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                    />
                </div>

                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.is_spike?.find(item => item.id === filterTires.params.is_spike)}
                        onChange={(e) => setParamFilterTires({type: 'is_spike', value: e.value.id == null ? e.value.id :Boolean(e.value.id)})}
                        options={[{ id: null, name: 'Любой' }, ...(params?.is_spike ?? [])]}
                        optionLabel="name"
                        placeholder="Тип шин"
                        className="custom-select"
                        dropdownIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                        collapseIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                    />
                </div>
            </div>

            <div className="select-row">
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.vendor?.find(item => item.id === filterTires.params.vendor)}
                        onChange={(e) => setParamFilterTires({type: 'vendor', value: e.value.id})}
                        options={[{id: null, name: 'Любой'}, ...(params?.vendor ?? [])]}
                        optionLabel="name"
                        placeholder="Производитель"
                        className="custom-select"
                        dropdownIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                        collapseIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                    />
                </div>
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.country?.find(item => item.id === filterTires.params.country)}
                        onChange={(e) => setParamFilterTires({type: 'country', value: e.value.id})}
                        options={[{id: null, name: 'Любая'}, ...(params?.country ?? [])]}
                        optionLabel="name"
                        placeholder="Страна"
                        className="custom-select"
                        dropdownIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                        collapseIcon={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                            </svg>)}
                    />
                </div>
            </div>
        </div>
    </>)

}
export default TireFilter
