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
import {usePathname, useSearchParams} from "next/navigation";

const INITIAL_PAGINATOR = {
    first: 0,
    rows: 0,
    total: 0
}

export default function TiresSelectionComponent() {
    const {getValuesFilterTires, setCarFilterTires, setRangeFilterTires, getSelectedCity, getCityQueryParamString} = useStore()
    const [items, setItems] = useState([]) // Выборка шин по параметрам
    const [itemsVehicle, setItemsVehicle] = useState([]) // Выборка шин по спецификации
    const [specifications, setSpecifications] = useState({})
    const [filterType, setFilterType] = useState('PARAM')
    const [loading, setLoading] = useState(true)
    const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)
    const [isStoreReady, setIsStoreReady] = useState(false) // Флаг готовности Zustand

    const pathname = usePathname();
    const searchParams = useSearchParams()

    // Дожидаемся загрузки Zustand
    useEffect(() => {
        if (getValuesFilterTires()) {
            setIsStoreReady(true);
        }
    }, [getValuesFilterTires()]);

    // Устанавливаем тип фильтра
    useEffect(() => {
        if (!isStoreReady) return;



        getItems(searchParams.get('page'))

    }, [isStoreReady]);

    // Получаем продукцию по спецификации
    useEffect(() => {
        getVehicleItems()
    }, [getValuesFilterTires()?.car?.vehicleIds])

    // Загружаем данные при изменении filterType или города
    useEffect(() => {
        if (!isStoreReady || !filterType) return;
        getItems();
    }, [filterType, getSelectedCity()]);

    const getItems = (page = null) => {
        setItems([]);
        setLoading(true);

        if (filterType === 'PARAM') {

            getParamItems(page);
        } else if (filterType === 'CAR') {
            getCarSpecification();
        }



        setTimeout(() => setLoading(false), 3000)
    }

    const handleGetItems = () => {
        window.history.pushState(null, "", `${window.location.pathname}`);
        setCarFilterTires({type: 'vehicleIds', value: []})
        window.sessionStorage.setItem(`scrollY-${pathname}`, 0)
        getItems()
    }

    const getVehicleItems = async () => {
        /** @var {array} vehicleIds  */
        const vehicleIds = getValuesFilterTires().vehicleIds ?? []

        if (vehicleIds.length == 0) {
            setItemsVehicle({})
        } else {

            const response = await BackendApi.get('/api/catalog/vehicle/tire?filters=vehicle|' + vehicleIds.join(',') + getCityQueryParamString())

            if (response.code === 200) {
                setItemsVehicle((await response).data)
            }
        }
    }

    const getParamItems = async (page = null) => {
        let queryString = '?filters=';
        for (const key in getValuesFilterTires().params) {
            queryString += `${key}|${getValuesFilterTires().params[key]};`;
        }

        if(Object.keys(getValuesFilterTires().params).length > 0) {
            queryString = queryString.slice(0, -1); // Убираем последнюю ";"
        }

        if (getValuesFilterTires().range.current.length > 0 && getValuesFilterTires().range.current[0] !== 1 && getValuesFilterTires().range.current[1] !== 2) {
            queryString += queryString === '?filters=' ? 'price|' : ';price|';
            queryString += `${getValuesFilterTires().range.current[0]},${getValuesFilterTires().range.current[1]}`;
        }

        if (page) {
            queryString += `&page=${page}`;
        }

        queryString += getCityQueryParamString();

        let response = await BackendApi.get('/api/catalog/tire' + queryString);

        if (response.code === 200) {
            let data = await response;
            setRangeFilterTires({
                type: 'current',
                value: [
                    Math.max(data.meta.range_price.currentFilter[0], data.meta.range_price.all[0]),
                    Math.min(data.meta.range_price.currentFilter[1], data.meta.range_price.all[1])
                ]
            });
            setRangeFilterTires({type: 'all', value: data.meta.range_price.all});
            setItems(data.data);
            setPaginator({
                first: data.meta.from,
                rows: data.meta.per_page,
                total: data.meta.total
            });

            if(window.sessionStorage.getItem(`scrollY-${pathname}`)?.length > 0) {
                setTimeout(() => window.scrollTo({top: parseInt(window.sessionStorage.getItem(`scrollY-${pathname}`))}), 50)
            }
        }
        setLoading(false);
    }

    const getCarSpecification = async () => {
        let response = await BackendApi.get('/api/list/filter/vehicle/tire/specifications', getValuesFilterTires().car);
        if (response.code === 200) {
            setSpecifications((await response).data);
        }
        setLoading(false);
    }

    const onPageChange = (data) => {
        if (filterType === 'PARAM') {
            getParamItems(data.page + 1);
            window.history.pushState(null, "", `${window.location.pathname}?page=${data.page + 1}`);
            window.sessionStorage.setItem(`scrollY-${pathname}`, 0)
        }
    }

    return isStoreReady ? (
        <>
            <h2>
                Подбор шин {paginator.total > 0 && filterType === 'PARAM'
                ? (
                    <span style={{color: 'gray', fontSize: '18px'}}>
              Найдено {paginator.total} товаров
            </span>
                )
                : (<span>по параметрам автомобиля</span>)
            }
            </h2>
            <div className="main-content-catalog">
                <Sidebar type={TypeProductEnum.TIRE} collback={handleGetItems} setSwitcherFilter={setFilterType}/>
                <div className="catalog-with-products">

                    {filterType === 'CAR' && (<>
                        <SpecificationsContent type={TypeProductEnum.TIRE} specifications={specifications}/>

                        {Object.keys(itemsVehicle).length > 0 &&
                            <SpecifiactionItems type={TypeProductEnum.TIRE} itemsVehicle={itemsVehicle}/>}

                        {Object.keys(itemsVehicle).length === 0 && (
                            <div style={{margin: '0 auto'}}>
                                {loading ?
                                    <ProgressSpinner/> : 'Для точного подбора товара уточните дополнительные параметры'}
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

                        <ParamItems items={items}/>
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
