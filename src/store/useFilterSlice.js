import BackendApi from "@/lib/BackendApi";
import {TypeProductEnum} from "@/lib/TypeProductEnum";

/**
 * Zustand store для фильтров подбора шин и дисков.
 *
 * Хранит:
 * - filterType (PARAM / CAR)
 * - фильтры шин (filterTires)
 * - фильтры дисков (filterWheels)
 * - фильтры по авто (carFilter)
 * - диапазон цен (range)
 * - параметры фильтров (paramsTires, paramsWheels, paramsCar)
 *
 * Содержит экшены:
 * - setFilterType
 * - setParamFilterTires / setParamFilterWheels
 * - setRangeFilterTires / setRangeFilterWheels
 * - setCarFilter
 * - loadTireParams / loadDiskParams / loadCarParams
 * - clearFilters
 */

const INITIAL_FILTER_PRODUCT = {
    params: {},
    car: {},
    range: {current: [0, 0], all: [0, 0]} ,
};

export const useFilterSlice = (set, get) => ({
    /** Текущий тип фильтра (PARAM / CAR) */
    filterType: "PARAM",
    setFilterType: (type) => set({ filterType: type }),

    /** Флаг активности диапазона цены */
    rangeIsActive: true,
    setRangeIsActive: (val) => set({ rangeIsActive: val }),

    /** Фильтры шин */
    filterTires: Object.assign({}, INITIAL_FILTER_PRODUCT),
    paramsTires: {},
    loadTireParams: async () => {
        const res = await BackendApi.get("/api/list/filter/tire");
        if (res.code === 200) set({ paramsTires: res.data });
    },
    /**
     * Обновляет параметры фильтра для шин.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setParamFilterTires: (payload) => set((state) => {
        let newParams = {...state.filterTires.params}

        if (payload.value !== null) {
            newParams[payload.type] = payload.value
        } else {
            delete newParams[payload.type]
        }

        return {...state, filterTires: {...state.filterTires, params: newParams}}

    }),
    /**
     * Обновляет прайс по шинам
     * @param {Object} payload
     * @param {string} payload.type
     * @param {array} payload.value
     */
    setRangeFilterTires: (payload) => set((state) => ({
        ...state,
        filterTires: {
            ...state.filterTires,
            range: {
                ...state.filterTires.range,
                [payload.type]: payload.value
            }
        }
    })),
    /**
     * Обновляет параметры автомобиля для шин.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setCarFilterTires: (payload) => set((state) => {
        let newCar = {...state.filterTires.car}

        if (payload.value !== null) {
            newCar[payload.type] = payload.value
        } else {
            delete newCar[payload.type]
        }

        return {...state, filterTires: {...state.filterTires, car: newCar}}
    }),

    /** Фильтры дисков */
    filterWheels: Object.assign({}, INITIAL_FILTER_PRODUCT),
    paramsWheels: {},
    loadDiskParams: async () => {
        const res = await BackendApi.get("/api/list/filter/disk");
        if (res.code === 200) set({ paramsWheels: res.data });
    },
    /**
     * Обновляет параметры фильтра для дисков.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setParamFilterWheels: (payload) => set((state) => {
        let newParams = {...state.filterWheels.params}

        if (payload.value !== null) {
            newParams[payload.type] = payload.value
        } else {
            delete newParams[payload.type]
        }

        return {...state, filterWheels: {...state.filterWheels, params: newParams}}
    }),
    /**
     * Обновляет прайс по дискам
     * @param {Object} payload
     * @param {string} payload.type
     * @param {array} payload.value
     */
    setRangeFilterWheels: (payload) => set((state) => ({
        ...state,
        filterWheels: {
            ...state.filterWheels,
            range: {
                ...state.filterWheels.range,
                [payload.type]: payload.value
            }
        }
    })),
    /**
     * Обновляет параметры автомобиля для дисков.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setCarFilterWheels: (payload) => set((state) => {
        let newCar = {...state.filterWheels.car}

        if (payload.value !== null) {
            newCar[payload.type] = payload.value
        } else {
            delete newCar[payload.type]
        }

        return {...state, filterWheels: {...state.filterWheels, car: newCar}}
    }),

    /** Фильтры по авто */
    carFilter: { vendor: null, model: null, year: null, modification: null },
    paramsCar: {},
    loadCarParams: async () => {
        const res = await BackendApi.get("/api/list/filter/vehicle/car/info", get().carFilter);
        if (res.code === 200) set({ paramsCar: res.data });
    },
    setCarFilter: (data) =>
        set((state) => ({
            carFilter: { ...state.carFilter, [data.type]: data.value }
        })),
    getFilterForCar: (type) => {
        if (type === TypeProductEnum.TIRES) return get().filterTires.car;
        if (type === TypeProductEnum.DISKS) return get().filterWheels.car;
        return get().carFilter;
    },

    /** Очистка всех фильтров */
    clearFilters: () =>
        set({
            filterType: "PARAM",
            rangeIsActive: true,
            filterTires: Object.assign({}, INITIAL_FILTER_PRODUCT),
            filterWheels: Object.assign({}, INITIAL_FILTER_PRODUCT),
            carFilter: { vendor: null, model: null, year: null, modification: null }
        }),

    /**
     * Обнуляем параметр сущности
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.entity - Сущность filterTires, filterWheels.
     * @param {string} payload.param - Параметр сущности params, car.
     *
     */
    clearFilter: (payload) => set((state) => {
        if (typeof payload == 'undefined') {
            return {
                ...state,
                filterType: "PARAM",
                rangeIsActive: true,
                filterTires: Object.assign({}, INITIAL_FILTER_PRODUCT),
                filterWheels: Object.assign({}, INITIAL_FILTER_PRODUCT),
                carFilter: { vendor: null, model: null, year: null, modification: null }
            }
        } else {
            return {
                ...state,
                [payload.entity]: {
                    ...state[payload.entity],
                    [payload.param]: {}
                }
            }
        }
    }),
});