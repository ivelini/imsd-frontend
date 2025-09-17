import { Dropdown } from "primereact/dropdown";

/**
 * Универсальный компонент Dropdown для фильтров.
 *
 * Используется в TireFilter, DiskFilter и AutoFilter.
 * Показывает выпадающий список с возможностью выбрать значение.
 *
 * @param {string} label - placeholder (подпись).
 * @param {Array} options - список значений [{id, name}].
 * @param {any} value - выбранное значение (id или name).
 * @param {Function} onChange - обработчик выбора.
 */
export default function FilterDropdown({ label, options, value, onChange }) {
    return (
        <div className="custom-select-wrapper custom-select-wrapper-cat">
            <Dropdown
                value={options?.find((item) => item.id === value || item.name === value)}
                onChange={(e) => onChange(e.value)}
                options={[{ id: null, name: "Любой" }, ...(options ?? [])]}
                optionLabel="name"
                placeholder={label}
                className={`custom-select ${value ? "p-dropdown-selected" : ""}`}
            />
        </div>
    );
}
