"use client";

import {ProgressSpinner} from "primereact/progressspinner";
import {Paginator} from "primereact/paginator";
import Sidebar from "@/components/selection/Sidebar";
import ParamItems from "@/app/(selection)/_components/page/param/ParamItems";
import SpecificationsContent from "@/app/(selection)/_components/page/car/SpecificationsContent";
import SpecifiactionItems from "@/app/(selection)/_components/page/car/SpecificationItems";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import {useSelection} from "@/hooks/useSelection";
import {useEffect, useState} from "react";
import {useStore} from "@/store/useStore";

/**
 * Компонент для отображения результатов подбора шин.
 *
 * - Использует useSelection("TIRES") для загрузки данных.
 * - Показывает либо товары по параметрам, либо по авто.
 * - Включает пагинацию, сайдбар и спиннер загрузки.
 */
export default function TiresSelectionComponent() {
    const [isReady, setReady] = useState(false);
    const {
        items,
        getItemsForParamsFilter,
        specifications,
        getSpecifications,
        useStoreIsReady,
        loading,
    } = useSelection(TypeProductEnum.TIRE);

    const {getFilterType, getPaginatorTires, getVehicleIdsTires, setIsHidden} = useStore()

    useEffect(() => {
        getItemsForParamsFilter()
        setReady(useStoreIsReady)
    }, []);

    const handleApplyFilter = () => {
        if (getFilterType() === "PARAM") getItemsForParamsFilter()
        if (getFilterType() === "CAR") getSpecifications()
        if (window.screen.width <= 768) setIsHidden(false)
    }

    return (isReady && <>
            <h2>
                Подбор шин{" "}
                {getPaginatorTires().total > 0 && getFilterType() === "PARAM" ? (
                    <span style={{color: "gray", fontSize: "18px"}}>
                    Найдено {getPaginatorTires().total} товаров
                  </span>
                ) : (
                    <span>по параметрам автомобиля</span>
                )}
            </h2>

            <div className="main-content-catalog">
                <Sidebar type={TypeProductEnum.TIRE} onApplyFilter={() => handleApplyFilter()}/>

                <div className="catalog-with-products">
                    {getFilterType() === "CAR" && (
                        <>
                            <SpecificationsContent type={TypeProductEnum.TIRE} specifications={specifications}/>
                            {Object.keys(getVehicleIdsTires()).length > 0
                                ? <SpecifiactionItems type={TypeProductEnum.TIRE}/>
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
                            {items.length > 0 && getPaginatorTires().total > getPaginatorTires().rows && (
                                <Paginator
                                    first={getPaginatorTires().first}
                                    rows={getPaginatorTires().rows}
                                    totalRecords={getPaginatorTires().total}
                                    onPageChange={onPageChange}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
