"use client"
import { useState, useEffect } from "react";
import BackendApi from "@/utils/BackendApi";
import Sidebar from "../_components/layout/Sidebar";
import HorisontalItem from "../_components/page/HorisontalItem";
import { useStore } from "@/store/useStore";
import { ProgressSpinner } from 'primereact/progressspinner';


export default function TiresSelection() {
  const { filterTires, setRangeFilterTires } = useStore()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (Object.keys(filterTires.params).length == 0) {
      getItems()
    }
  }, [])

  const getItems = async () => {

    let queryString = ''

    //Если присутствует запрос из пагинации
    for (const key in filterTires.params) {
      queryString += key + '|' + filterTires.params[key] + ';'
    }

    queryString = '?filters=' + queryString.slice(0, queryString.length - 1)

    if (filterTires.range.length > 0) {

      queryString += (queryString === '?filters=')
        ? 'price|'
        : ';price|'

      queryString += filterTires.range[0] + ',' + filterTires.range[1]
    }

    let response = await BackendApi.get('/api/catalog/tire' + queryString)

    if (response.code === 200) {
      let data = await response
      
      setRangeFilterTires(data.meta.range_price.all)
      setItems(data.data)
    }
  }

  return (<>
    <h2>Шины на авто в Челябинске</h2>
    <div className="main-content-catalog">
      <Sidebar type="TIRES" collback={getItems} />
      <div className="catalog-with-products">
        {items.length == 0 &&
          <div style={{ "margin": '0 auto' }}>
            <ProgressSpinner />
          </div>}
        {items.map((item, index) => <HorisontalItem key={index} item={item} />)}
      </div>
    </div>
  </>)
}
