import {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import BackendApi from "@/utils/BackendApi";
import {useStore} from "@/store/useStore";

const AutoFilter = ({ type }) => {
    const {filterTires, filterWheels, setCarFilterTires, setCarFilterWheels, clearFilter} = useStore()

    /**
     * Параметры запроса
     *
     * @var {Object|null} queryParams
     * @var {string} queryParams.vendor
     * @var {string} queryParams.model
     * @var {string} queryParams.year
     * @var {string} queryParams.modification
     */
    const [queryParams, setQueryParams] = useState({})
    const [params, setParams] = useState({})            // Объект параметров для вывода фильтра

    useEffect(() => {
        clearFilter({entity: 'filterTires', param: 'car'})
        clearFilter({entity: 'filterWheels', param: 'car'})
    },[])

    useEffect(() => {
        getParams()
    }, [queryParams])


    async function getParams() {
        let response = await BackendApi.get('/api/list/filter/vehicle/car/info', queryParams)

        if(response.code === 200) {
            setParams(await response.data)
        }
    }

    const setCarFilter = (dataFilter) => {

        if(type === 'SWTIRES') {
            setCarFilterTires(dataFilter)
        } else if(type === 'SWDISKS') {
            setCarFilterWheels(dataFilter)
        }
    }

    const handleVendorChange = (data) => {
        setCarFilter({type: 'vendor', value: data.name})
        setCarFilter({type: 'model', value: null})
        setCarFilter({type: 'year', value: null})
        setCarFilter({type: 'modification', value: null})

        setQueryParams({vendor: data.name})
    }

    const handleModelChange = (data) => {
        setCarFilter({type: 'model', value: data.name})
        setCarFilter({type: 'year', value: null})
        setCarFilter({type: 'modification', value: null})

        setQueryParams({vendor: queryParams.vendor, model: data.name})
    }

    const handleYearChange = (data) => {
        setCarFilter({type: 'year', value: data.name})
        setCarFilter({type: 'modification', value: null})

        setQueryParams({vendor: queryParams.vendor, model: queryParams.model, year: data.name})
    }

    const handleModificationChange = (data) => {
        setCarFilter({type: 'modification', value: data.name})

        setQueryParams({vendor: queryParams.vendor, model: queryParams.model, year: queryParams.year, modification: data.name})
    }

    return (<>
        <div className="filter-content-item auto" style={{"display": "block"}}>
            <div className="select-row">
                <div className="custom-select-wrapper">
                    <Dropdown
                        value={params.vendor?.find(item => item.name === (type === 'SWTIRES' ? filterTires.car.vendor : filterWheels.car.vendor))}
                        onChange={(e) => handleVendorChange(e.value)}
                        options={params.vendor}
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
                        value={params.model?.find(item => item.name === (type === 'SWTIRES' ? filterTires.car.model : filterWheels.car.model))}
                        onChange={(e) => handleModelChange(e.value)}
                        options={params.model}
                        optionLabel="name"
                        placeholder="Модель"
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
                        value={params.year?.find(item => item.name === (type === 'SWTIRES' ? filterTires.car.year : filterWheels.car.year))}
                        onChange={(e) => handleYearChange(e.value)}
                        options={params.year}
                        optionLabel="name"
                        placeholder="Год выпуска"
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
                        value={params.modification?.find(item => item.name === (type === 'SWTIRES' ? filterTires.car.modification : filterWheels.car.modification))}
                        onChange={(e) => handleModificationChange(e.value)}
                        options={params.modification}
                        optionLabel="name"
                        placeholder="Модификация"
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
export default AutoFilter
