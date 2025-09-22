"use client";

import { ProgressSpinner } from "primereact/progressspinner";
import { Paginator } from "primereact/paginator";
import Sidebar from "@/app/(selection)/_components/page/Sidebar";
import ParamItems from "@/app/(selection)/_components/page/param/ParamItems";
import SpecificationsContent from "@/app/(selection)/_components/page/car/SpecificationsContent";
import SpecifiactionItems from "@/app/(selection)/_components/page/car/SpecificationItems";
import { TypeProductEnum } from "@/lib/TypeProductEnum";
import { useSelection } from "@/hooks/useSelection";

/**
 * Компонент для отображения результатов подбора шин.
 *
 * - Использует useSelection("TIRES") для загрузки данных.
 * - Показывает либо товары по параметрам, либо по авто.
 * - Включает пагинацию, сайдбар и спиннер загрузки.
 */
export default function TiresSelectionComponent() {
    const {
        useStoreIsReady,
        filterType,
        paginator
    } = useSelection(TypeProductEnum.TIRES);

    if (!useStoreIsReady) return <ProgressSpinner />;

    return (
        <>
            <h2>
                Подбор шин{" "}
                {paginator.total > 0 && filterType === "PARAM" ? (
                    <span style={{ color: "gray", fontSize: "18px" }}>
            Найдено {paginator.total} товаров
          </span>
                ) : (
                    <span>по параметрам автомобиля</span>
                )}
            </h2>

            <div className="main-content-catalog">
                <Sidebar type={TypeProductEnum.TIRES} />

                <div className="catalog-with-products">
                    {filterType === "CAR" && (
                        <>
                            <SpecificationsContent type={TypeProductEnum.TIRES} specifications={specifications} />
                            {Object.keys(itemsVehicle).length > 0 && (
                                <SpecifiactionItems type={TypeProductEnum.TIRES} itemsVehicle={itemsVehicle} />
                            )}
                            {Object.keys(itemsVehicle).length === 0 && (
                                <div style={{ margin: "0 auto" }}>
                                    {loading ? <ProgressSpinner /> : "Для точного подбора товара уточните дополнительные параметры"}
                                </div>
                            )}
                        </>
                    )}

                    {filterType === "PARAM" && (
                        <>
                            {items.length === 0 && (
                                <div style={{ margin: "0 auto" }}>
                                    {loading ? <ProgressSpinner /> : "К сожалению, ничего не найдено. Попробуйте ввести другие параметры"}
                                </div>
                            )}

                            <ParamItems items={items} />
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
    );
}
