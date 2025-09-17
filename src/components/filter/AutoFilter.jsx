import { useStore } from "@/store/useStore";
import FilterDropdown from "./FilterDropdown";

/**
 * Фильтры по автомобилю.
 *
 * - Загружает параметры через store.loadCarParams().
 * - Управляет выбором авто (vendor → model → year → modification).
 * - При выборе значения сбрасывает зависимые поля.
 *
 * @param {string} type - TIRES или DISKS.
 */
export default function AutoFilter({ type }) {
    const { getFilterForCar, setCarFilter, paramsCar, loadCarParams } = useStore();
    const filter = getFilterForCar(type);

    const handleChange = (key, value, resetKeys = []) => {
        setCarFilter({ type: key, value });
        resetKeys.forEach((rk) => setCarFilter({ type: rk, value: null }));
        loadCarParams(); // подгружаем зависимые параметры
    };

    return (
        <div className="calatog-select-col">
            <FilterDropdown label="Производитель" options={paramsCar.vendor} value={filter.vendor} onChange={(v) => handleChange("vendor", v.name, ["model", "year", "modification"])} />
            <FilterDropdown label="Модель" options={paramsCar.model} value={filter.model} onChange={(v) => handleChange("model", v.name, ["year", "modification"])} />
            <FilterDropdown label="Год выпуска" options={paramsCar.year} value={filter.year} onChange={(v) => handleChange("year", v.name, ["modification"])} />
            <FilterDropdown label="Модификация" options={paramsCar.modification} value={filter.modification} onChange={(v) => handleChange("modification", v.name)} />
        </div>
    );
}
