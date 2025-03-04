'use client'

import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { useStore } from "@/store/useStore";
import BackendApi from "@/lib/BackendApi";


export default function LocationComponent() {
    const { selectedCity, setCity } = useStore()
    const [visible, setVisible] = useState(false);

    const [cities, setCities] = useState([])
    const [cityName, setCityName] = useState('')

    useEffect(() => {
        if (cityName.length > 2) {
            getCities({ 'name': cityName })
        }

    }, [cityName])    

    const getCities = async (params = null) => {
        let response = await BackendApi.get('/api/list/cities', params)

        if (response.code === 200) {
            setCities(response.data)
        }
    }

    return (<>
        <a className="choice-city" onClick={() => {
            getCities()
            setVisible(true)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path
                    d="M2.05034 1.91438C3.36309 0.688624 5.14355 0 7.00005 0C8.85655 0 10.637 0.688624 11.9498 1.91438C13.2625 3.14014 14 4.80263 14 6.53611C14 8.2696 13.2625 9.93208 11.9498 11.1578L10.9955 12.0391C10.2921 12.6832 9.37964 13.5119 8.25737 14.5252C7.92007 14.8298 7.46924 15 7.00005 15C6.53086 15 6.08003 14.8298 5.74273 14.5252L2.93626 11.976C2.58334 11.6525 2.2883 11.38 2.05034 11.1578C1.40031 10.5509 0.884667 9.83039 0.532868 9.03739C0.181069 8.24439 0 7.39445 0 6.53611C0 5.67777 0.181069 4.82783 0.532868 4.03483C0.884667 3.24183 1.40031 2.5213 2.05034 1.91438ZM11.0968 2.71007C10.0101 1.69554 8.53621 1.12566 6.99948 1.1258C5.46275 1.12594 3.98902 1.69609 2.90249 2.71082C1.81596 3.72555 1.20564 5.10174 1.2058 6.53664C1.20595 7.97155 1.81656 9.34762 2.9033 10.3622L4.09791 11.4641C4.92312 12.217 5.75062 12.9676 6.58041 13.716C6.69285 13.8176 6.84319 13.8744 6.99965 13.8744C7.15611 13.8744 7.30644 13.8176 7.41889 13.716L10.1474 11.2389C10.5252 10.8929 10.8412 10.6009 11.096 10.3622C12.1825 9.34761 12.7929 7.97161 12.7929 6.53686C12.7929 5.10211 12.1825 3.72612 11.096 2.71157L11.0968 2.71007ZM7.00005 4.48985C7.31698 4.48985 7.6308 4.54814 7.9236 4.66138C8.2164 4.77463 8.48245 4.94062 8.70655 5.14987C8.93065 5.35912 9.10842 5.60754 9.2297 5.88094C9.35098 6.15434 9.41341 6.44736 9.41341 6.74329C9.41341 7.03922 9.35098 7.33224 9.2297 7.60564C9.10842 7.87904 8.93065 8.12746 8.70655 8.33671C8.48245 8.54596 8.2164 8.71195 7.9236 8.8252C7.6308 8.93844 7.31698 8.99673 7.00005 8.99673C6.36772 8.98595 5.76519 8.74384 5.32209 8.32248C4.879 7.90112 4.63074 7.33419 4.63074 6.74367C4.63074 6.15314 4.879 5.58621 5.32209 5.16485C5.76519 4.74349 6.36772 4.50063 7.00005 4.48985ZM7.00005 5.61582C6.84148 5.61582 6.68447 5.64498 6.53797 5.70164C6.39147 5.7583 6.25836 5.84135 6.14623 5.94605C6.03411 6.05074 5.94517 6.17503 5.88448 6.31183C5.8238 6.44862 5.79257 6.59523 5.79257 6.74329C5.79257 6.89135 5.8238 7.03796 5.88448 7.17475C5.94517 7.31155 6.03411 7.43584 6.14623 7.54053C6.25836 7.64523 6.39147 7.72828 6.53797 7.78494C6.68447 7.8416 6.84148 7.87076 7.00005 7.87076C7.32019 7.87076 7.62721 7.75201 7.85358 7.54064C8.07996 7.32927 8.20713 7.04259 8.20713 6.74367C8.20713 6.44474 8.07996 6.15806 7.85358 5.94669C7.62721 5.73532 7.32019 5.61582 7.00005 5.61582Z"
                    fill="#DD062A"></path>
            </svg>&nbsp;
            {selectedCity.name}&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9" fill="none">
                <path d="M1 1L5 4.5L1 8" stroke="black" strokeLinecap="round"></path>
            </svg>
        </a>

        <Dialog showHeader={false}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}>
            <div>
                <div className="geo-window">
                    <div className="geo-window-panel">
                        <div className="geo-title">Ваш город</div>
                        <a href="#" className="geo-location-window-exit" onClick={() => setVisible(false)}>
                            <img src="/assets/img/close.svg" />
                        </a>
                    </div>
                    <div className="geo-location-window-search">
                        <div className="geo-location-window-search-text">Выберите город</div>
                        <input type="text"
                            className="geo-location-window-search-input"
                            value={cityName}
                            onChange={(e) => {
                                setCityName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="geo-location-window__location-list">
                        <div className="geo-location-window__city-list">

                            {cities.length > 0 && cities.map((city, index) => (
                                <div key={index} className="geo-location-window__city">
                                    <span className="geo-location-window__link"
                                        title={city.name}
                                        data-id={city.id}
                                        onClick={() => {
                                            setCity({ id: city.id, name: city.name, name_en: city.name_en })
                                            setVisible(false)
                                            setCityName('')
                                        }}
                                    >
                                        {city.name}
                                    </span>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </>)
}