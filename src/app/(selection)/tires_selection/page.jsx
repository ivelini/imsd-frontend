"use client"
import { useState, useEffect } from "react";
import BackendApi from "@/utils/BackendApi";
import Sidebar from "../_components/page/Sidebar";
import HorisontalItem from "../_components/page/HorisontalItem";
import { useStore } from "@/store/useStore";
import { ProgressSpinner } from 'primereact/progressspinner';


export default function TiresSelection() {
  const { filterTires, setRangeFilterTires } = useStore()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (Object.keys(filterTires.params).length == 0) {
      getItems()
    }
  }, [])

  const getItems = async () => {
    setLoading(true)
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

      setRangeFilterTires({type: 'all', value: data.meta.range_price.all})
      setItems(data.data)
      setTotal(data.meta.total)
      setTimeout(() => setLoading(false), 3000)
    }
  }

  return (<>
    <h2>Подбор шин {total > 0 && <span style={{'color': 'gray', 'fontSize': '18px'}}>Найдено {total} товаров </span>}</h2>
    <div className="main-content-catalog">
      <Sidebar type="TIRES" collback={getItems} />
      <div className="catalog-with-products">
        {items.length == 0 && <div style={{ "margin": '0 auto' }}>
          {loading == true
              ? <ProgressSpinner/>
              : 'К сожалению, ничего не найдено. Попробуйте ввести другие параметры'}
          </div>}

        {items.map((item, index) => <HorisontalItem key={index} item={item} />)}
      </div>
    </div>
  </>)
}
