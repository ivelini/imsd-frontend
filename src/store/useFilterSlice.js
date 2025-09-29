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
    tire: Object.assign({}, INITIAL_FILTER_PRODUCT),
    disk: Object.assign({}, INITIAL_FILTER_PRODUCT),
    car: Object.assign({}, INITIAL_FILTER_CAR),
}

export const useFilterSlice = (set, get) => ({
        filter: INITIAL_FILTER,

        getFilterType: () => get().filter.type,
        getRangeIsActive: () => get().filter.range_is_active,
        getIsHidden: () => get().filter.is_hidden,

        getListFilter: (type) => get().filter[type].list ?? {},
        getValuesFilter: (type) => get().filter[type].values,
        getRangeFilter: (type) => get().filter[type].range,
        getPaginator: (type) => get().filter[type].paginator,
        getVehicleIds: (type) => get().filter[type].vehicleIds ?? [],

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
            let newValues = {...state.filter.tire.values}

            if (payload.value !== null) {
                newValues[payload.type] = payload.value
            } else {
                delete newValues[payload.type]
            }

            return {filter: {...state.filter, tire: {...state.filter.tire, values: newValues}}}

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
                tire: {
                    ...state.filter.tire,
                    range: {...state.filter.tire.range, [payload.type]: payload.value}
                }
            }
        })),
        /**
         * @param {number} payload.first
         * @param {number} payload.rows
         * @param {number} payload.total
         */
        setPaginatorFilterTires: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                tire: {
                    ...state.filter.tire,
                    paginator: payload
                }
            }
        })),
        /**
         * @param {array} payload
         */
        setVehicleIdsFilterTires: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                type: "PARAM",
                tire: {
                    ...state.filter.tire,
                    vehicleIds: payload
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

            return {filter: {...state.filter, type: "CAR", car: {...state.filter.car, values: newCar}}}

        }),

        /** Фильтры дисков */
        /**
         * Обновляет параметры фильтра для шин.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "width", "profile").
         * @param {string} payload.value - Значение параметра.
         */
        setValueFilterWheels: (payload) => set((state) => {
            let newValues = {...state.filter.disk.values}

            if (payload.value !== null) {
                newValues[payload.type] = payload.value
            } else {
                delete newValues[payload.type]
            }

            return {filter: {...state.filter, type: "PARAM", disk: {...state.filter.disk, values: newValues}}}

        }),
        /**
         * Обновляет прайс по шинам
         * @param {Object} payload
         * @param {string} payload.type
         * @param {array} payload.value
         */
        setRangeFilterWheels: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                disk: {
                    ...state.filter.disk,
                    range: {...state.filter.disk.range, [payload.type]: payload.value}
                }
            }
        })),
        /**
         *
         * @param {number} payload.first
         * @param {number} payload.rows
         * @param {number} payload.total
         */
        setPaginatorFilterWheels: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                disk: {
                    ...state.filter.disk,
                    paginator: payload
                }
            }
        })),
        /**
         * @param {array} payload
         */
        setVehicleIdsFilterWheels: (payload) => set((state) => ({
            filter: {
                ...state.filter,
                disk: {
                    ...state.filter.disk,
                    vehicleIds: payload
                }
            }
        })),


        /** Асинхронные запросы к базе за списком значений для фильтра */
        loadListFilter: async (type) => {
            const res = await BackendApi.get(`/api/list/filter/${type}`);
            if (res.code === 200) set((state) => ({
                filter: {
                    ...state.filter,
                    [type]: {...state.filter[type], list: res.data}
                }
            }))
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
         * @param {string} payload.entity - Сущность tire, disk, car
         * @param {string} payload.param - Параметр сущности values, vehicleIds.
         *
         */
        clearFilter: (payload) => set((state) => {
            if (typeof payload == 'undefined') {
                let newFilter = Object.assign({}, INITIAL_FILTER);

                delete newFilter.tire.list
                delete newFilter.disk.list
                newFilter.car.list.vendor = state.filter.car.list.vendor

                return {
                    filter: {
                        ...state.filter,
                        tire: {...state.filter.tire, ...newFilter.tire},
                        disk: {...state.filter.disk, ...newFilter.disk},
                        car: newFilter.car,
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