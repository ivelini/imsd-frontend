import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import BackendApi from "@/lib/BackendApi";
import { useStore } from "@/store/useStore";
import { TypeProductEnum } from "@/lib/TypeProductEnum";

const AutoFilter = ({ type, collback }) => {

    const { getFilterForCar, setCarFilterTires, setCarFilterWheels } = useStore()

    /**
     * Объект параметров для вывода фильтра
     *
     * @var {Object|null} params
     * @var {string} params.vendor
     * @var {string} params.model
     * @var {string} params.year
     * @var {string} params.modification
     */
    const [params, setParams] = useState({})

    useEffect(() => {
        getParams()
    }, [getFilterForCar(type)])


    async function getParams() {
        let response = await BackendApi.get('/api/list/filter/vehicle/car/info', getFilterForCar())

        if (response.code === 200) {
            setParams(await response.data)
        }
    }

    const setCarFilter = (dataFilter) => {

        if (type === TypeProductEnum.TIRES) {
            setCarFilterTires(dataFilter)
        } else if (type === TypeProductEnum.DISKS) {
            setCarFilterWheels(dataFilter)
        }
    }

    const handleVendorChange = (data) => {
        setCarFilter({ type: 'vendor', value: data.name })
        setCarFilter({ type: 'model', value: null })
        setCarFilter({ type: 'year', value: null })
        setCarFilter({ type: 'modification', value: null })
    }

    const handleModelChange = (data) => {
        setCarFilter({ type: 'model', value: data.name })
        setCarFilter({ type: 'year', value: null })
        setCarFilter({ type: 'modification', value: null })
    }

    const handleYearChange = (data) => {
        setCarFilter({ type: 'year', value: data.name })
        setCarFilter({ type: 'modification', value: null })
    }

    const handleModificationChange = (data) => {
        setCarFilter({ type: 'modification', value: data.name })
    }

    return (<>
        <div className="calatog-select-col">

            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.vendor?.find(item => item.name === getFilterForCar().vendor)}
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
            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.model?.find(item => item.name === getFilterForCar().model)}
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


            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.year?.find(item => item.name === getFilterForCar().year)}
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
            <div className="custom-select-wrapper custom-select-wrapper-cat">
                <Dropdown
                    value={params.modification?.find(item => item.name === getFilterForCar().modification)}
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

        <button className="get-result" type="button" onClick={() => collback('CAR')}>Подобрать</button>
    </>)
}
export default AutoFilter
