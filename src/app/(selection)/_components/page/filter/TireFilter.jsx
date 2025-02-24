import { useStore } from "@/store/useStore";
import BackendApi from "@/utils/BackendApi";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { Slider } from "primereact/slider";
import {RangeComponent} from "@/app/(selection)/_components/page/filter/RangeComponent";

export function TireFilter({ collback }) {
    const { filterTires, filterWheels, setParamFilterTires, setRangeFilterTires, clearFilter } = useStore()

    const [params, setParams] = useState({})    // Параметры для показа фильтра

    useEffect(() => {
        (async () => {
            let response = await BackendApi.get('/api/list/filter/tire')

            if (response.code === 200) {
                setParams(await response.data)
            }
        })()
    }, [])

    return (<>
        <div className="calatog-select-col">
            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={{ id: filterTires.params?.width, name: filterTires.params?.width }}
                    onChange={(e) => setParamFilterTires({ type: 'width', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.width ?? [])]}
                    optionLabel="name"
                    placeholder="Ширина"
                    className="custom-select"
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
                    value={{ id: filterTires.params?.height, name: filterTires.params?.height }}
                    onChange={(e) => setParamFilterTires({ type: 'height', value: e.value.id })}
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
                    value={{ id: filterTires.params?.diameter, name: filterTires.params?.diameter }}
                    onChange={(e) => setParamFilterTires({ type: 'diameter', value: e.value.id })}
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
                    onChange={(e) => setParamFilterTires({ type: 'season', value: e.value.id })}
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
                    onChange={(e) => setParamFilterTires({ type: 'is_spike', value: e.value.id == null ? e.value.id : Boolean(e.value.id) })}
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
                    onChange={(e) => setParamFilterTires({ type: 'vendor', value: e.value.id })}
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
                    onChange={(e) => setParamFilterTires({ type: 'country', value: e.value.id })}
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

            <RangeComponent type="TIRES" />

            <div className="delivery-checkbox-group">
                <h3 className="delivery-title-cat">Способ получения</h3>

                <div className="options-group">
                    <div className="option">
                        <input type="checkbox" id="todayCheckbox" />
                        <label htmlFor="todayCheckbox">Сегодня</label>
                    </div>
                    <div className="option">
                        <input type="checkbox" id="delivery1to2Checkbox" />
                        <label htmlFor="delivery1to2Checkbox">Поставка 1-2 дня</label>
                    </div>
                    <div className="option">
                        <input type="checkbox" id="delivery2to5Checkbox" />
                        <label htmlFor="delivery2to5Checkbox">Поставка 2-5 дней</label>
                    </div>
                    <div className="option">
                        <input type="checkbox" id="delivery5to7Checkbox" />
                        <label htmlFor="delivery5to7Checkbox">Поставка 5-7 дней</label>
                    </div>
                </div>
            </div>
        </div>

        <button className="get-result" type="button" onClick={collback}>Подобрать</button>
    </>)
}