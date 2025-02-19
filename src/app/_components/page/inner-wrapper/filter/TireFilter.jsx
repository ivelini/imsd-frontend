import {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import BackendApi from "@/utils/BackendApi";
import {useStore} from "@/store/useStore";


const TireFilter = () => {
    const {filterTires, setParamFilterTires} = useStore()

    const [params, setParams] = useState({})    // Параметры для показа фильтра

    useEffect(() => {
        (async () => {
            let response = await BackendApi.get('/api/list/filter/tire')

            if(response.code === 200) {
                setParams(await response.data)
            }
        })()

    }, [])
console.log(params?.width ?? [])
    return (<>
        <div className="filter-content-item disk" style={{"display": "block"}}>
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={{id: filterTires.params?.width, name: filterTires.params?.width}}
                        onChange={(e) => setParamFilterTires({type: 'width', value: e.value.id})}
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

                <div className="custom-select-wrapper">
                    <Dropdown
                        value={{id: filterTires.params?.height, name: filterTires.params?.height}}
                        onChange={(e) => setParamFilterTires({type: 'height', value: e.value.id})}
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

                <div className="custom-select-wrapper">
                    <Dropdown
                        value={{id: filterTires.params?.diameter, name: filterTires.params?.diameter}}
                        onChange={(e) => setParamFilterTires({type: 'diameter', value: e.value.id})}
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
                        onChange={(e) => setParamFilterTires({type: 'is_spike', value: Boolean(e.value.id)})}
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
            </div>
        </div>
    </>)

}
export default TireFilter
