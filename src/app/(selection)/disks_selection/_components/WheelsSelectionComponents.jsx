"use client"

import {useState, useEffect} from "react";
import BackendApi from "@/lib/BackendApi";
import Sidebar from "@/app/(selection)/_components/page/Sidebar";
import {useStore} from "@/store/useStore";
import {ProgressSpinner} from 'primereact/progressspinner';
import ParamItems from "@/app/(selection)/_components/page/param/ParamItems";
import {Paginator} from 'primereact/paginator';
import SpecificationsContent from "@/app/(selection)/_components/page/car/SpecificationsContent";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import SpecifiactionItems from "@/app/(selection)/_components/page/car/SpecificationItems";

const INITIAL_PAGINATOR = {
    first: 0,
    rows: 0,
    total: 0
}

export default function WheelsSelectionComponents() {
    const {
        filterWheels,
        setCarFilterWheels,
        setRangeFilterWheels,
        getSelectedCity,
        getCityQueryParamString
    } = useStore()
    const [items, setItems] = useState([]) // Выборка дисков по параметрам
    const [itemsVehicle, setItemsVehicle] = useState([]) // Выборка шин по спецификации
    const [specifications, setSpecifications] = useState({})
    const [filterType, setFilterType] = useState('PARAM')
    const [loading, setLoading] = useState(true)
    const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)
    const [isStoreReady, setIsStoreReady] = useState(false) // Флаг готовности Zustand

    // Дожидаемся загрузки Zustand
    useEffect(() => {
        if (filterWheels) {
            setIsStoreReady(true);
        }
    }, [filterWheels]);

    // Устанавливаем тип фильтра
    useEffect(() => {
        if (!isStoreReady) return;

        if (Object.keys(filterWheels.params,).length > 0) {
            setFilterType('PARAM');
        } else if (Object.keys(filterWheels.car).length > 0) {
            setFilterType('CAR');
        }
        getItems()

    }, [isStoreReady]);

    // Получаем продукцию по спецификации
    useEffect(() => {
        getVehicleItems()
    }, [filterWheels.car?.vehicleIds])

    // Загружаем данные при изменении filterType или города
    useEffect(() => {
        if (!isStoreReady || !filterType) return;
        getItems();
    }, [filterType, getSelectedCity()]);

    const getItems = () => {
        setItems([]);
        setLoading(true);

        if (filterType === 'PARAM') {
            getParamItems();
        } else if (filterType === 'CAR') {
            getCarSpecification();
        }

        setTimeout(() => setLoading(false), 3000)
    }

    const handleGetItems = () => {
        setCarFilterWheels({type: 'vehicleIds', value: []})
        getItems()
    }

    const getVehicleItems = async () => {
        /** @var {array} vehicleIds  */
        const vehicleIds = filterWheels.car.vehicleIds ?? []

        if (vehicleIds.length == 0) {
            setItemsVehicle({})
        } else {

            const response = await BackendApi.get('/api/catalog/vehicle/disk?filters=vehicle|' + vehicleIds.join(',') + getCityQueryParamString())

            if (response.code === 200) {
                setItemsVehicle((await response).data)
            }
        }
    }

    const getParamItems = async (page = null) => {
        let queryString = '?filters=';
        for (const key in filterWheels.params) {
            queryString += `${key}|${filterWheels.params[key]};`;
        }

        if(Object.keys(filterWheels.params).length > 0) {
            queryString = queryString.slice(0, -1); // Убираем последнюю ";"
        }

        if (filterWheels.range.current.length > 0 && filterWheels.range.current[0] !== 1 && filterWheels.range.current[1] !== 2) {
            queryString += queryString === '?filters=' ? 'price|' : ';price|';
            queryString += `${filterWheels.range.current[0]},${filterWheels.range.current[1]}`;
        }

        if (page) {
            queryString += `&page=${page}`;
        }

        queryString += getCityQueryParamString();

        let response = await BackendApi.get('/api/catalog/disk' + queryString);

        if (response.code === 200) {
            let data = await response;
            setRangeFilterWheels({
                type: 'current',
                value: [
                    Math.max(data.meta.range_price.currentFilter[0], data.meta.range_price.all[0]),
                    Math.min(data.meta.range_price.currentFilter[1], data.meta.range_price.all[1])
                ]
            });
            setRangeFilterWheels({type: 'all', value: data.meta.range_price.all});
            setItems(data.data);
            setPaginator({
                first: data.meta.from,
                rows: data.meta.per_page,
                total: data.meta.total
            });
        }
        setLoading(false);
    }

    const getCarSpecification = async () => {
        let response = await BackendApi.get('/api/list/filter/vehicle/disk/specifications', filterWheels.car);
        if (response.code === 200) {
            setSpecifications((await response).data);
        }
        setLoading(false);
    }

    const onPageChange = (data) => {
        if (filterType === 'PARAM') {
            getParamItems(data.page + 1);
            setTimeout(() => window.scrollTo({top: 0, behavior: "smooth"}), 50);
        }
    }

    return isStoreReady ? (
        <>
            <h2>
                Подбор дисков {paginator.total > 0 && filterType === 'PARAM'
                ? (
                    <span style={{color: 'gray', fontSize: '18px'}}>
              Найдено {paginator.total} товаров
            </span>
                )
                : (
                    <span>
              по параметрам автомобиля
            </span>
                )}
            </h2>
            <div className="main-content-catalog">
                <Sidebar type={TypeProductEnum.DISKS} collback={handleGetItems} setSwitcherFilter={setFilterType}/>
                <div className="catalog-with-products">

                    {filterType === 'CAR' && (<>
                        <SpecificationsContent type={TypeProductEnum.DISKS} specifications={specifications}/>

                        {Object.keys(itemsVehicle).length > 0 &&
                            <SpecifiactionItems type={TypeProductEnum.DISKS} itemsVehicle={itemsVehicle}/>}

                        {Object.keys(itemsVehicle).length === 0 && (
                            <div style={{margin: '0 auto'}}>
                                {loading ?
                                    <ProgressSpinner/> : 'К сожалению, ничего не найдено. Попробуйте ввести другие параметры'}
                            </div>
                        )}
                    </>)}


                    {filterType === 'PARAM' && (<>

                        {items.length === 0 && (
                            <div style={{margin: '0 auto'}}>
                                {loading ?
                                    <ProgressSpinner/> : 'К сожалению, ничего не найдено. Попробуйте ввести другие параметры'}
                            </div>
                        )}

                        <ParamItems type={TypeProductEnum.DISKS} items={items}/>
                        {items.length > 0 && paginator.total > paginator.rows && (
                            <Paginator first={paginator.first} rows={paginator.rows} totalRecords={paginator.total}
                                       onPageChange={onPageChange}/>
                        )}
                    </>)}

                </div>
            </div>
        </>
    ) : <ProgressSpinner/>;
}
