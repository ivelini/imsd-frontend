import {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import BackendApi from "@/lib/BackendApi";
import {useStore} from "@/store/useStore";
const DiskFilter = () => {
    const {filterWheels, setParamFilterWheels, clearFilter} = useStore()
    const [params, setParams] = useState({})    // Параметры для показа фильтра


    useEffect(() => {
        (async () => {
            let response = await BackendApi.get('/api/list/filter/disk')

            if(response.code === 200) {
                setParams(await response.data)
            }
        })()
        clearFilter()
    }, [])

    return (<>
        <div className="filter-content-item wheel">
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.diameter?.find(item => item.id === filterWheels.params.diameter)}
                        onChange={(e) => setParamFilterWheels({type: 'diameter', value: e.value.id})}
                        options={[{id: null, name: 'Любой'}, ...(params?.diameter ?? [])]}
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
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.width?.find(item => item.id === filterWheels.params.width)}
                        onChange={(e) => setParamFilterWheels({type: 'width', value: e.value.id})}
                        options={[{id: null, name: 'Любая'}, ...(params?.width ?? [])]}
                        optionLabel="name"
                        placeholder="Ширина"
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
            </div>

            <div className="select-row">
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.pcd?.find(item => item.id === filterWheels.params.pcd)}
                        onChange={(e) => setParamFilterWheels({type: 'pcd', value: e.value.id})}
                        options={[{id: null, name: 'Любой'}, ...(params?.pcd ?? [])]}
                        optionLabel="name"
                        placeholder="Крепеж (PCD)"
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
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.et?.find(item => item.id === filterWheels.params.et)}
                        onChange={(e) => setParamFilterWheels({type: 'et', value: e.value.id})}
                        options={[{id: null, name: 'Любой'}, ...(params?.et ?? [])]}
                        optionLabel="name"
                        placeholder="Вылет (ET)"
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
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.dia?.find(item => item.id === filterWheels.params.dia)}
                        onChange={(e) => setParamFilterWheels({type: 'dia', value: e.value.id})}
                        options={[{id: null, name: 'Любая'}, ...(params?.dia ?? [])]}
                        optionLabel="name"
                        placeholder="Ступица"
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

            </div>
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.type?.find(item => item.id === filterWheels.params.type)}
                        onChange={(e) => setParamFilterWheels({type: 'type', value: e.value.id})}
                        options={[{id: null, name: 'Любой тип'}, ...(params?.type ?? [])]}
                        optionLabel="name"
                        placeholder="Тип диска"
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
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.vendor?.find(item => item.id === filterWheels.params.vendor)}
                        onChange={(e) => setParamFilterWheels({type: 'vendor', value: e.value.id})}
                        options={[{id: null, name: 'Любой'}, ...(params?.vendor ?? [])]}
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
            </div>
        </div>
    </>)
}
export default DiskFilter
