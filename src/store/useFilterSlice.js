import BackendApi from "@/lib/BackendApi";

/**
 * Zustand store для фильтров подбора шин и дисков.
 */

const INITIAL_FILTER_PRODUCT = {
    list: {},
    values: {},
    vehicleIds: [],
    range: {current: [0, 0], all: [0, 0]},
    paginator: {first: 0, rows: 0, total: 0}
};

const INITIAL_FILTER_CAR = {
    list: {vendor: null, model: null, year: null, modification: null},
    values: {}
}


const INITIAL_FILTER = {
    // Текущий тип фильтра (PARAM / CAR)
    type: 'PARAM',
    /** Флаг активности диапазона цены */
    range_is_active: true,
    /** Флаг статуса показывать фильтр или скрыть*/
    is_hidden: true,
    tires: Object.assign({}, INITIAL_FILTER_PRODUCT),
    wheels: Object.assign({}, INITIAL_FILTER_PRODUCT),
    car: Object.assign({}, INITIAL_FILTER_CAR),
}

export const useFilterSlice = (set, get) => ({
        filter: INITIAL_FILTER,

        getFilterType: () => get().filter.type,
        getRangeIsActive: () => get().filter.range_is_active,
        getIsHidden: () => get().filter.is_hidden,

        getListFilterTires: () => get().filter.tires.list ?? {},
        getValuesFilterTires: () => get().filter.tires.values,
        getRangeFilterTires: () => get().filter.tires.range,
        getPaginatorTires: () => get().filter.tires.paginator,
        getVehicleIdsTires: () => get().filter.tires.vehicleIds ?? [],

        getListFilterWheels: () => get().filter.wheels.list,
        getValuesFilterWheels: () => get().filter.wheels.values,
        getRangeFilterWheels: () => get().filter.wheels.range,
        getPaginatorWheels: () => get().filter.wheels.paginator,

        getListFilterCar: () => get().filter.car.list ?? {},
        getValuesFilterCar: () => get().filter.car.values,

        setFilterType: (type) => set((state) => ({filter: {...state.filter, type: type}})),
        setRangeIsActive: (val) => set((state) => ({filter: {...state.filter, range_is_active: val}})),
        setIsHidden: (val) => set((state) => ({filter: {...state.filter, is_hidden: val}})),

        /** Фильтры шин */
        /**
         * Обновляет параметры фильтра для шин.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "width", "profile").
         * @param {string} payload.value - Значение параметра.
         */
        setValueFilterTires: (payload) => set((state) => {
            let newValues = {...state.filter.tires.values}

            if (payload.value !== null) {
                newValues[payload.type] = payload.value
            } else {
                delete newValues[payload.type]
            }

            return {filter: {...state.filter, tires: {...state.filter.tires, values: newValues}}}

        }),
        /**
         * Обновляет прайс по шинам
         * @param {Object} payload
         * @param {string} payload.type
         * @param {array} payload.value
         */
        setRangeFilterTires: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                tires: {
                    ...state.filter.tires,
                    range: {...state.filter.tires.range, [payload.type]: payload.value}
                }
            }
        })),
        /**
         *
         * @param {number} payload.first
         * @param {number} payload.rows
         * @param {number} payload.total
         */
        setPaginatorFilterTires: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                tires: {
                    ...state.filter.tires,
                    paginator: payload
                }
            }
        })),
        /**
         * Обновляет параметры автомобиля для шин.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "vendor", "model").
         * @param {string} payload.value - Значение параметра.
         */
        setValueFilterCar: (payload) => set((state) => {
            let newCar = {...state.filter.car.values}

            if (payload.value !== null) {
                newCar[payload.type] = payload.value
            } else {
                delete newCar[payload.type]
            }

            return {filter: {...state.filter, car: {...state.filter.car, values: newCar}}}

        }),

        /** Фильтры дисков */
        filterWheels: Object.assign({}, INITIAL_FILTER_PRODUCT),
        paramsWheels: {},

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

        /** Асинхронные запросы к базе за списком значений для фильтра */
        loadListFilterTire: async () => {
            const res = await BackendApi.get("/api/list/filter/tire");
            if (res.code === 200) set((state) => ({
                filter: {
                    ...state.filter,
                    tires: {...state.filter.tires, list: res.data}
                }
            }));
        },
        loadDiskParams: async () => {
            const res = await BackendApi.get("/api/list/filter/disk");
            if (res.code === 200) set({paramsWheels: res.data});
        },
        loadListCarParams: async () => {
            const res = await BackendApi.get("/api/list/filter/vehicle/car/info", get().filter.car.values);
            if (res.code === 200) set((state) => ({
                filter: {
                    ...state.filter,
                    car: {...state.filter.car, list: res.data}
                }
            }));
        },

        /**
         * Обнуляем параметр сущности
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.entity - Сущность tires, wheels, car
         * @param {string} payload.param - Параметр сущности values, vehicleIds.
         *
         */
        clearFilter: (payload) => set((state) => {
            if (typeof payload == 'undefined') {
                let newFilter = Object.assign({}, INITIAL_FILTER);

                delete newFilter.tires.list
                delete newFilter.wheels.list

                return {
                    filter: {
                        ...state.filter,
                        tires: {...state.filter.tires, ...newFilter.tires},
                        wheels: {...state.filter.wheels, ...newFilter.wheels},
                        car: newFilter.car
                    }
                }
            } else {
                return {
                    filter: {
                        ...state.filter,
                        [payload.entity]: {
                            ...state.filter[payload.entity],
                            [payload.param]: payload.entity === 'car'
                                ? INITIAL_FILTER_CAR[payload.param]
                                : INITIAL_FILTER_PRODUCT[payload.param]
                        }
                    }
                }
            }
        }),
    }
);