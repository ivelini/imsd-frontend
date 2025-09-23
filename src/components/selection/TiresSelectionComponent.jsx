"use client";

import {ProgressSpinner} from "primereact/progressspinner";
import {Paginator} from "primereact/paginator";
import Sidebar from "@/app/(selection)/_components/page/Sidebar";
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
        getItems,
        useStoreIsReady,
        filterType,
        paginator,
        loading,
    } = useSelection(TypeProductEnum.TIRES);

    const {setIsHidden} = useStore()

    useEffect(() => {
        getItems(TypeProductEnum.TIRES)
        setReady(useStoreIsReady)
    }, []);

    const handleApplyFilter = () => {
        getItems(TypeProductEnum.TIRES)
        if(window.screen.width <= 768) setIsHidden(false)
    }

    return (isReady && <>
            <h2>
                Подбор шин{" "}
                {paginator.total > 0 && filterType === "PARAM" ? (
                    <span style={{color: "gray", fontSize: "18px"}}>
                    Найдено {paginator.total} товаров
                  </span>
                ) : (
                    <span>по параметрам автомобиля</span>
                )}
            </h2>

            <div className="main-content-catalog">
                <Sidebar type={TypeProductEnum.TIRES} onApplyFilter={() => handleApplyFilter()}/>

                <div className="catalog-with-products">
                    {filterType === "CAR" && (
                        <>
                            <SpecificationsContent type={TypeProductEnum.TIRES} specifications={specifications}/>
                            {Object.keys(itemsVehicle).length > 0 && (
                                <SpecifiactionItems type={TypeProductEnum.TIRES} itemsVehicle={itemsVehicle}/>
                            )}
                            {Object.keys(itemsVehicle).length === 0 && (
                                <div style={{margin: "0 auto"}}>
                                    {loading ? <ProgressSpinner/> : "Для точного подбора товара уточните дополнительные параметры"}
                                </div>
                            )}
                        </>
                    )}

                    {filterType === "PARAM" && (
                        <>
                            {items.length === 0 && (
                                <div style={{margin: "0 auto"}}>
                                    {loading ? <ProgressSpinner/> : "К сожалению, ничего не найдено. Попробуйте ввести другие параметры"}
                                </div>
                            )}

                            <ParamItems items={items}/>
                            {items.length > 0 && paginator.total > paginator.rows && (
                                <Paginator
                                    first={paginator.first}
                                    rows={paginator.rows}
                                    totalRecords={paginator.total}
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
