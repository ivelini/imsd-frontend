"use client"
import { useState, useEffect } from "react";
import BackendApi from "@/lib/BackendApi";
import Sidebar from "../_components/page/Sidebar";
import { useStore } from "@/store/useStore";
import { ProgressSpinner } from 'primereact/progressspinner';
import ParamItem from "../_components/page/param/ParamItem";
import { Paginator } from 'primereact/paginator';
import SpecificationsContent from "../_components/page/car/SpecificationsContent";

const INITIAL_PAGINATOR = {
  first: 0,
  rows: 0,
  total: 0
}

export default function TiresSelection() {
  const { filterTires, setRangeFilterTires, getSelectedCity, getCityQueryParamString } = useStore()
  const [items, setItems] = useState([])
  const [specifications, setSpecifications] = useState({})
  const [filterType, setFilterType] = useState('')
  const [loading, setLoading] = useState(true)
  const [paginator, setPaginator] = useState(INITIAL_PAGINATOR)

  useEffect(() => {
    if (Object.keys(filterTires.params).length > 0) {
      setFilterType('PARAM')
    }

    if (Object.keys(filterTires.car).length > 0) {
      setFilterType('CAR')
    }
  }, [])

  useEffect(() => {
    getItems()
  }, [filterType, getSelectedCity()])

  const getItems = () => {
    setItems([])
    setLoading(true)

    if (filterType == 'PARAM') {
      getParamItems()
    }

    if (filterType == 'CAR') {
      getCarSpecification()
    }

    setTimeout(() => setLoading(false), 3000)
  }

  const getParamItems = async (page = null) => {
    let queryString = ''

    //Если присутствует запрос из пагинации
    for (const key in filterTires.params) {
      queryString += key + '|' + filterTires.params[key] + ';'
    }

    queryString = '?filters=' + queryString.slice(0, queryString.length - 1)

    if (filterTires.range.current.length > 0 && filterTires.range.current[0] !== 1 && filterTires.range.current[1] !== 2) {

      queryString += (queryString === '?filters=')
        ? 'price|'
        : ';price|'

      queryString += filterTires.range.current[0] + ',' + filterTires.range.current[1]
    }

    if (page != null) {
      queryString += '&page=' + page
    }

    queryString += getCityQueryParamString()

    let response = await BackendApi.get('/api/catalog/tire' + queryString)

    if (response.code === 200) {
      let data = await response

      setRangeFilterTires({
        type: 'current',
        value: [
          data.meta.range_price.currentFilter[0] >= data.meta.range_price.all[0] &&
            data.meta.range_price.currentFilter[0] < data.meta.range_price.all[1]
            ? data.meta.range_price.currentFilter[0]
            : data.meta.range_price.all[0],

          data.meta.range_price.currentFilter[1] <= data.meta.range_price.all[1] &&
            data.meta.range_price.currentFilter[1] > data.meta.range_price.all[0]
            ? data.meta.range_price.currentFilter[1]
            : data.meta.range_price.all[1]
        ]
      })

      setRangeFilterTires({ type: 'all', value: data.meta.range_price.all })
      setItems(data.data)
      setPaginator({
        first: data.meta.from,
        rows: data.meta.per_page,
        total: data.meta.total
      })
    }
  }

  const getCarSpecification = async () => {
    let response = await BackendApi.get('/api/list/filter/vehicle/tire/specifications', filterTires.car)

    if (response.code === 200) {
      setSpecifications((await response).data)
    }
  }


  const onPageChange = (data) => {
    if (filterType === 'PARAM') {
      getParamItems(data.page + 1)

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 50)
    }
  }

  const setSwitcherFilter = (data) => {
    setFilterType(data)
  }

  return (<>
    <h2>Подбор шин {paginator.total > 0 && <span style={{ 'color': 'gray', 'fontSize': '18px' }}>Найдено {paginator.total} товаров </span>}</h2>
    <div className="main-content-catalog">
      <Sidebar type="TIRES" collback={getItems} setSwitcherFilter={setSwitcherFilter} />
      <div className="catalog-with-products">

        {filterType === 'CAR' && <SpecificationsContent specifications={specifications} />}

        {items.length === 0 && <div style={{ "margin": '0 auto' }}>
          {loading === true
            ? <ProgressSpinner />
            : 'К сожалению, ничего не найдено. Попробуйте ввести другие параметры'}
        </div>}

        {filterType === 'PARAM' && <ParamItem type="TIRES" items={items} />}


        {items.length > 0 && paginator.total > paginator.rows &&
          <Paginator first={paginator.first} rows={paginator.rows} totalRecords={paginator.total} onPageChange={onPageChange} />
        }
      </div>
    </div>
  </>)
}

