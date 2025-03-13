import { useStore } from "@/store/useStore";
import BackendApi from "@/lib/BackendApi";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { RangeComponent } from "@/app/(selection)/_components/page/filter/RangeComponent";
import { TypeProductEnum } from "@/lib/TypeProductEnum";

export function DiskFilter({ collback }) {
    const { filterWheels, setParamFilterWheels } = useStore()

    const [params, setParams] = useState({})    // Параметры для показа фильтра


    useEffect(() => {
        (async () => {
            let response = await BackendApi.get('/api/list/filter/disk')

            if (response.code === 200) {
                console.log(await response.data)
                setParams(await response.data)
            }
        })()

    }, [])

    return (<>
        <div className="calatog-select-col">

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.diameter?.find(item => item.id === filterWheels.params.diameter)}
                    onChange={(e) => setParamFilterWheels({ type: 'diameter', value: e.value.id })}
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
                    value={params.width?.find(item => item.id === filterWheels.params.width)}
                    onChange={(e) => setParamFilterWheels({ type: 'width', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.width ?? [])]}

                    optionLabel="name"
                    placeholder="Ширина"
                    className={`custom-select ${filterWheels.params?.width ? 'p-dropdown-selected' : ''}`}

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
                    value={params.pcd?.find(item => item.id === filterWheels.params.pcd)}
                    onChange={(e) => setParamFilterWheels({ type: 'pcd', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.pcd ?? [])]}
                    optionLabel="name"
                    placeholder="PCD (крепеж)"
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
                    value={params.et?.find(item => item.id === filterWheels.params.et)}
                    onChange={(e) => setParamFilterWheels({ type: 'et', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.et ?? [])]}
                    optionLabel="name"
                    placeholder="ET (вылет)"
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
                    value={params.dia?.find(item => item.id === filterWheels.params.dia)}
                    onChange={(e) => setParamFilterWheels({ type: 'dia', value: e.value.id == null ? e.value.id : Boolean(e.value.id) })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.dia ?? [])]}
                    optionLabel="name"
                    placeholder="Ступица"
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
                    value={params.type?.find(item => item.id === filterWheels.params.type)}
                    onChange={(e) => setParamFilterWheels({ type: 'type', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.type ?? [])]}
                    optionLabel="name"
                    placeholder="Тип дисков"
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
                    value={params.vendor?.find(item => item.id === filterWheels.params.vendor)}
                    onChange={(e) => setParamFilterWheels({ type: 'vendor', value: e.value.id })}
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

            <RangeComponent type={TypeProductEnum.DISKS} />

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

        <button className="get-result" type="button" onClick={() => collback('PARAM')}>Подобрать</button>
    </>)
}