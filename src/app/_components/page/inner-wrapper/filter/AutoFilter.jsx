import {useEffect, useState} from "react";

const AutoFilter = () => {
    // Объект параметров запроса для вывода фильтра
    const [query, setQuery] = useState({})
    // Объект параметров для вывода фильтра
    const [params, setParams] = useState({})

    // Запуск получения параметров фильтра при изменении запроса для вывода фильтра
    useEffect(() => {
        getParams()
    }, [query])

    // Метод получения параметров для вывода фильтра
    async function getParams() {

        let url = import.meta.env.VITE_APP_URL + '/api/list/filter/vehicle/car/info'
        let params = new URLSearchParams(query).toString()

        url += params.length > 0 ? '?' + params : ''

        let res = await fetch(url, {headers: {'Accept': 'application/json'}})
        let resdata = await res.json()

        if(res.ok) {
            setParams(resdata.data)
        }
    }

    return (<>
        <div className="filter-content-item auto">
            <div className="select-row">
                {Object.keys(params).length > 0 && (<>
                    <SelectVehicle className={styles.mainFilterSelect} key="vendor" name="Марка" type="vendor"/>
                    <SelectVehicle key={query.model != null ? query.model : 'model'} name="Модель" type="model"/>
                </>)}
            </div>

            <div className="select-row">
                {Object.keys(params).length > 0 && (<>
                    <SelectVehicle className={styles.mainFilterSelect} key={query.year != null ? query.year : 'year'} name="Год выпуска" type="year"/>
                    <SelectVehicle key={query.modification != null ? query.modification : 'modification'} name="Модификация" type="modification"/>
                </>)}
            </div>
        </div>
    </>)
}
export default AutoFilter
