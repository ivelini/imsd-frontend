import {useState} from "react";

const DiskFilter = () => {
    const [params, setParams] = useState({})    // Параметры для показа фильтра
    const paramsTireFilter = useSelector(selectParamsDiskFilter)                //Параметры для формирования запроса

    useState(() => {
        (async function() {
            setParams((await getFetch(import.meta.env.VITE_APP_URL + '/api/list/filter/disk')).data)
        })()
    }, [params])

    return (<>
        <div className="filter-content-item wheel">
            <div className="select-row">
                {Object.keys(params).length > 0 && (
                    <>
                        <SelectParamDisk className={styles.mainFilterSelect} key="width" name="Ширина" type="width" values={params.width} />
                        <SelectParamDisk className={styles.mainFilterSelect} key="diameter" name="Диаметр" type="diameter" values={params.diameter} />
                    </>
                )}

            </div>

            <div className="select-row">
                {Object.keys(params).length > 0 && (
                    <>
                        <SelectParamDisk className={styles.mainFilterSelect} key="pcd" name="Крепеж (PCD)" type="pcd" values={params.pcd} />
                        <SelectParamDisk className={styles.mainFilterSelect} key="et" name="Вылет (ET)" type="et" values={params.et} />
                        <SelectParamDisk className={styles.mainFilterSelect} key="dia" name="Ступица" type="dia" values={params.dia} />
                    </>
                )}
            </div>
            <div className="select-row">
                {Object.keys(params).length > 0 && (
                    <>
                        <SelectParamDisk className={styles.mainFilterSelect} key="vendor" name="Производитель" type="vendor" values={params.vendor} />
                    </>
                )}
            </div>
        </div>
    </>)
}
export default DiskFilter
