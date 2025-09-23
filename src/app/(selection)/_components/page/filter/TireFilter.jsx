import { useStore } from "@/store/useStore";
import BackendApi from "@/lib/BackendApi";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { Slider } from "primereact/slider";
import {RangeComponent} from "@/app/(selection)/_components/page/filter/RangeComponent";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import DeliveryDaysComponent from "@/app/(selection)/_components/page/filter/DeliveryDaysComponent";

export function TireFilter({ collback }) {
    const { filterTires, setParamFilterTires, setRangeFilterTires } = useStore()

    const [params, setParams] = useState({})    // Параметры для показа фильтра
    const [rangeIsActive, setRangeIsActive] = useState(true)

 
    useEffect(() => {
        (async () => {
            let response = await BackendApi.get('/api/list/filter/tire')

            if (response.code === 200) {
                setParams(await response.data)
            }
        })()

    }, [])

    /**
     * @paarm {object} data
     * @param {string} data.type
     * @param {string} data.value
     */
    const handleChangeInput = (data) => {
        setParamFilterTires(data)
        setRangeFilterTires({type: 'current', value: []})
        setRangeFilterTires({type: 'all', value: []})
        setRangeIsActive(false)
    }

    const handleSearchButtonClick = () => {
        collback('PARAM')
        setRangeIsActive(true)
    }

    return (<>
        <div className="calatog-select-col">
            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.width?.find(item => item.id === filterTires.params.width)}
                    onChange={(e) => handleChangeInput({ type: 'width', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.width ?? [])]}
                    
                    optionLabel="name"
                    placeholder="Ширина"
                    className={`custom-select ${filterTires.params?.width ? 'p-dropdown-selected' : ''}`}
                
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.height?.find(item => item.id === filterTires.params.height)}
                    onChange={(e) => handleChangeInput({ type: 'height', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.height ?? [])]}
                    optionLabel="name"
                    placeholder="Профиль"
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

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.diameter?.find(item => item.id === filterTires.params.diameter)}
                    onChange={(e) => handleChangeInput({ type: 'diameter', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.diameter ?? [])]}
                    optionLabel="name"
                    placeholder="Диаметр"
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


            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.season?.find(item => item.id === filterTires.params.season)}
                    onChange={(e) => handleChangeInput({ type: 'season', value: e.value.id })}
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

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.is_spike?.find(item => item.id === filterTires.params.is_spike)}
                    onChange={(e) => handleChangeInput({ type: 'is_spike', value: e.value.id == null ? e.value.id : Boolean(e.value.id) })}
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

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.vendor?.find(item => item.id === filterTires.params.vendor)}
                    onChange={(e) => handleChangeInput({ type: 'vendor', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.vendor ?? [])]}
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
            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.country?.find(item => item.id === filterTires.params.country)}
                    onChange={(e) => handleChangeInput({ type: 'country', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.country ?? [])]}
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

            <RangeComponent type={TypeProductEnum.TIRE} isActive={rangeIsActive}/>

            {/*<DeliveryDaysComponent />*/}
        </div>

        <button className="get-result" type="button" onClick={() => handleSearchButtonClick()}>Подобрать</button>
    </>)
}