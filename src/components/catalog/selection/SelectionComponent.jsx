"use client";

import {ProgressSpinner} from "primereact/progressspinner";
import {Paginator} from "primereact/paginator";
import Sidebar from "@/components/catalog/selection/Sidebar";
import ParamItems from "@/components/catalog/selection/param/ParamItems";
import SpecificationsContent from "@/components/catalog/selection/car/SpecificationsContent";
import SpecifiactionItems from "@/components/catalog/selection/car/SpecificationItems";
import {useSelection} from "@/hooks/useSelection";
import {useEffect, useState} from "react";
import {useStore} from "@/store/useStore";

/**
 * Компонент для отображения результатов подбора шин.
 * @param {string} type тип продукции
 */
export default function SelectionComponent({type}) {
    const [isReady, setReady] = useState(false);
    const {
        items,
        itemsVehicle,
        getItemsFromParamValues,
        getItemsFromSpecifications,
        specifications,
        getSpecifications,
        useStoreIsReady,
        loading,
        setSpecifications
    } = useSelection(type);

    const {getFilterType, getPaginator, getVehicleIds, setIsHidden} = useStore()

    useEffect(() => {
        let fromMain = sessionStorage.getItem("from_main")

        if(fromMain) {
            sessionStorage.removeItem("from_main")
            if (getFilterType() === "PARAM") getItemsFromParamValues()
            if (getFilterType() === "CAR") getSpecifications()
        } else {
            getItemsFromParamValues()
            setReady(useStoreIsReady)
        }
    }, []);

    //Запрос товаров при изменении спецификации
    useEffect(() => {
        getItemsFromSpecifications()
    }, [getVehicleIds(type)])

    /**
     *
     * @param {boolean} payload.isClearFilter
     */
    const handleApplyFilter = (payload) => {
        if (getFilterType() === "PARAM") getItemsFromParamValues()
        if (getFilterType() === "CAR" && !payload?.isClearFilter) getSpecifications()
        if(payload?.isClearFilter) setSpecifications({})
        if (window.screen.width <= 768) setIsHidden(false)
    }

    const handleChangePage = (data) => {
        window.history.pushState(null, "", `${window.location.pathname}?page=${data.page + 1}`);
        getItemsFromParamValues()
    }

    return (isReady && <>
            <h2>
                Подбор шин{" "}
                {getPaginator(type).total > 0 && getFilterType() === "PARAM" ? (
                    <span style={{color: "gray", fontSize: "18px"}}>
                    Найдено {getPaginator(type).total} товаров
                  </span>
                ) : (
                    <span>по параметрам автомобиля</span>
                )}
            </h2>

            <div className="main-content-catalog">
                <Sidebar type={type} onApplyFilter={(payload) => handleApplyFilter(payload)}/>

                <div className="catalog-with-products">
                    {getFilterType() === "CAR" && (
                        <>
                            <SpecificationsContent type={type} specifications={specifications}/>
                            {Object.keys(getVehicleIds(type)).length > 0
                                ? <SpecifiactionItems type={type} itemsVehicle={itemsVehicle} />
                                : <div style={{margin: "0 auto"}}>
                                    {loading ?
                                        <ProgressSpinner/> : "Для точного подбора товара уточните дополнительные параметры"}
                                </div>
                            }

                        </>
                    )}

                    {getFilterType() === "PARAM" && (
                        <>
                            {items.length === 0 && (
                                <div style={{margin: "0 auto"}}>
                                    {loading ?
                                        <ProgressSpinner/> : "К сожалению, ничего не найдено. Попробуйте ввести другие параметры"}
                                </div>
                            )}

                            <ParamItems items={items}/>
                            {items.length > 0
                                && getPaginator(type).total > getPaginator(type).rows
                                && <Paginator
                                    first={getPaginator(type).first}
                                    rows={getPaginator(type).rows}
                                    totalRecords={getPaginator(type).total}
                                    onPageChange={handleChangePage}
                                />
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
