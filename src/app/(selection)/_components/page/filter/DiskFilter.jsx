import { useStore } from "@/store/useStore";
import BackendApi from "@/lib/BackendApi";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { RangeComponent } from "@/app/(selection)/_components/page/filter/RangeComponent";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import DeliveryDaysComponent from "@/app/(selection)/_components/page/filter/DeliveryDaysComponent";

export function DiskFilter({ collback }) {
    const { filterWheels, setParamFilterWheels, setRangeFilterWheels } = useStore()

    const [params, setParams] = useState({})    // Параметры для показа фильтра
    const [rangeIsActive, setRangeIsActive] = useState(true)


    useEffect(() => {
        (async () => {
            let response = await BackendApi.get('/api/list/filter/disk')

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
        setParamFilterWheels(data)
        setRangeFilterWheels({type: 'current', value: []})
        setRangeFilterWheels({type: 'all', value: []})
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
                    value={params.diameter?.find(item => item.id === filterWheels.params.diameter)}
                    onChange={(e) => handleChangeInput({ type: 'diameter', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.diameter ?? [])]}
                    optionLabel="name"
                    placeholder="Диаметр"
                    className="custom-select"
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.width?.find(item => item.id === filterWheels.params.width)}
                    onChange={(e) => handleChangeInput({ type: 'width', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.width ?? [])]}

                    optionLabel="name"
                    placeholder="Ширина"
                    className={`custom-select ${filterWheels.params?.width ? 'p-dropdown-selected' : ''}`}

                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.pcd?.find(item => item.id === filterWheels.params.pcd)}
                    onChange={(e) => handleChangeInput({ type: 'pcd', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.pcd ?? [])]}
                    optionLabel="name"
                    placeholder="PCD (крепеж)"
                    className="custom-select"
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.et?.find(item => item.id === filterWheels.params.et)}
                    onChange={(e) => handleChangeInput({ type: 'et', value: e.value.id })}
                    options={[{ id: null, name: 'Любая' }, ...(params?.et ?? [])]}
                    optionLabel="name"
                    placeholder="ET (вылет)"
                    className="custom-select"
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.dia?.find(item => item.id === filterWheels.params.dia)}
                    onChange={(e) => handleChangeInput({type: 'dia', value: e.value.id})}
                    options={[{ id: null, name: 'Любой' }, ...(params?.dia ?? [])]}
                    optionLabel="name"
                    placeholder="D (Ступица)"
                    className="custom-select"
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.type?.find(item => item.id === filterWheels.params.type)}
                    onChange={(e) => handleChangeInput({ type: 'type', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.type ?? [])]}
                    optionLabel="name"
                    placeholder="Тип дисков"
                    className="custom-select"
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>
            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.vendor?.find(item => item.id === filterWheels.params.vendor)}
                    onChange={(e) => handleChangeInput({ type: 'vendor', value: e.value.id })}
                    options={[{ id: null, name: 'Любой' }, ...(params?.vendor ?? [])]}
                    optionLabel="name"
                    placeholder="Производитель"
                    className="custom-select"
                    dropdownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                    collapseIcon={<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6"
                                       fill="none">
                        <path d="M8 1L4.5 5L1 0.999999" stroke="#C5C5C5" strokeLinecap="round"></path>
                    </svg>}
                />
            </div>

            <RangeComponent type={TypeProductEnum.DISK} isActive={rangeIsActive}/>

            {/*<DeliveryDaysComponent />*/}
        </div>

        <button className="get-result" type="button" onClick={() => handleSearchButtonClick()}>Подобрать</button>
    </>)
}