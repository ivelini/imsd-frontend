"use client"
import { useState, useEffect } from "react";
import BackendApi from "@/lib/BackendApi";
import Sidebar from "../_components/page/Sidebar";
import { useStore } from "@/store/useStore";
import { ProgressSpinner } from 'primereact/progressspinner';
import ParamItems from "../_components/page/param/ParamItems";
import { Paginator } from 'primereact/paginator';
import SpecificationsContent from "../_components/page/car/SpecificationsContent";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import SpecifiactionItems from "../_components/page/car/SpecificationItems";

const INITIAL_PAGINATOR = {
  first: 0,
  rows: 0,
  total: 0
}

export default function TiresSelection() {
  const { filterTires, setCarFilterTires, setRangeFilterTires, getSelectedCity, getCityQueryParamString } = useStore()
  const [items, setItems] = useState([]) // Выборка шин по параметрам
  const [itemsVehicle, setItemsVehicle] = useState([]) // Выборка шин по спецификации
  const [specifications, setSpecifications] = useState({})
  const [filterType, setFilterType] = useState('PARAM')
  const [loading, setLoading] = useState(true)
  const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)
  const [isStoreReady, setIsStoreReady] = useState(false) // Флаг готовности Zustand

  // Дожидаемся загрузки Zustand
  useEffect(() => {
    if (filterTires) {
      setIsStoreReady(true);
    }
  }, [filterTires]);

  // Устанавливаем тип фильтра
  useEffect(() => {
    if (!isStoreReady) return;

    if (Object.keys(filterTires.params).length > 0) {
      setFilterType('PARAM');
    } else if (Object.keys(filterTires.car).length > 0) {
      setFilterType('CAR');
    }
    getItems()

  }, [isStoreReady]);

  // Получаем продукцию по спецификации
  useEffect(() => {
    getVehicleItems()
  }, [filterTires.car?.vehicleIds])

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
    setCarFilterTires({ type: 'vehicleIds', value: [] })
    getItems()
  }

  const getVehicleItems = async () => {
    /** @var {array} vehicleIds  */
    const vehicleIds = filterTires.car.vehicleIds ?? []

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
    for (const key in filterTires.params) {
      queryString += `${key}|${filterTires.params[key]};`;
    }
    queryString = queryString.slice(0, -1); // Убираем последнюю ";"

    if (filterTires.range.current.length > 0 && filterTires.range.current[0] !== 1 && filterTires.range.current[1] !== 2) {
      queryString += queryString === '?filters=' ? 'price|' : ';price|';
      queryString += `${filterTires.range.current[0]},${filterTires.range.current[1]}`;
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
      setRangeFilterTires({ type: 'all', value: data.meta.range_price.all });
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
    let response = await BackendApi.get('/api/list/filter/vehicle/tire/specifications', filterTires.car);
    if (response.code === 200) {
      setSpecifications((await response).data);
    }
    setLoading(false);
  }

  const onPageChange = (data) => {
    if (filterType === 'PARAM') {
      getParamItems(data.page + 1);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  }

  return isStoreReady ? (
    <>
      <h2>
        Подбор шин {paginator.total > 0 && (
          <span style={{ color: 'gray', fontSize: '18px' }}>
            Найдено {paginator.total} товаров
          </span>
        )}
      </h2>
      <div className="main-content-catalog">
        <Sidebar type="TIRES" collback={handleGetItems} setSwitcherFilter={setFilterType} />
        <div className="catalog-with-products">

          {filterType === 'CAR' && (<>
            <SpecificationsContent type={TypeProductEnum.TIRES} specifications={specifications} />

            {Object.keys(itemsVehicle).length > 0 &&
              <SpecifiactionItems type={TypeProductEnum.TIRES} itemsVehicle={itemsVehicle} />}

            {Object.keys(itemsVehicle).length === 0 && (
              <div style={{ margin: '0 auto' }}>
                {loading ? <ProgressSpinner /> : 'К сожалению, ничего не найдено. Попробуйте ввести другие параметры'}
              </div>
            )}
          </>)}


          {filterType === 'PARAM' && (<>

            {items.length === 0 && (
              <div style={{ margin: '0 auto' }}>
                {loading ? <ProgressSpinner /> : 'К сожалению, ничего не найдено. Попробуйте ввести другие параметры'}
              </div>
            )}

            <ParamItems type="TIRES" items={items} />
            {items.length > 0 && paginator.total > paginator.rows && (
              <Paginator first={paginator.first} rows={paginator.rows} totalRecords={paginator.total} onPageChange={onPageChange} />
            )}
          </>)}

        </div>
      </div>
    </>
  ) : <ProgressSpinner />;
}
