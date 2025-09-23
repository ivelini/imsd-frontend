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
 * Компонент для отображения результатов подбора дисков.
 *
 * - Использует useSelection("DISKS") для загрузки данных.
 * - Показывает либо товары по параметрам, либо по авто.
 * - Включает пагинацию, сайдбар и спиннер загрузки.
 */
export default function WheelsSelectionComponent() {
    const {
        items,
        itemsVehicle,
        specifications,
        filterType,
        paginator,
        loading,
        isStoreReady,
        resetFilters,
        onPageChange
    } = useSelection("DISKS");

    if (!isStoreReady) return <ProgressSpinner />;

    return (
        <>
            <h2>
                Подбор дисков{" "}
                {paginator.total > 0 && filterType === "PARAM" ? (
                    <span style={{ color: "gray", fontSize: "18px" }}>
            Найдено {paginator.total} товаров
          </span>
                ) : (
                    <span>по параметрам автомобиля</span>
                )}
            </h2>

            <div className="main-content-catalog">
                <Sidebar type={TypeProductEnum.DISK} collback={resetFilters} setSwitcherFilter={() => {}} />

                <div className="catalog-with-products">
                    {filterType === "CAR" && (
                        <>
                            <SpecificationsContent type={TypeProductEnum.DISK} specifications={specifications} />
                            {Object.keys(itemsVehicle).length > 0 && (
                                <SpecifiactionItems type={TypeProductEnum.DISK} itemsVehicle={itemsVehicle} />
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

                            <ParamItems type={TypeProductEnum.DISK} items={items} />
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
