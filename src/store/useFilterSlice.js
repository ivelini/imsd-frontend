import {TypeProductEnum} from "@/lib/TypeProductEnum";

const INITIAL_FILTER_TIRES = {
    params: {},
    car: {},
    range: {
        current: [],
        all: []
    }
};

const INITIAL_FILTER_WHEELS = {
    params: {},
    car: {},
    range: {
        current: [],
        all: []
    }
};

export const useFilterSlice = (set, get) => ({
    filterTires: INITIAL_FILTER_TIRES,
    filterWheels: INITIAL_FILTER_WHEELS,

    /**
     * Параметры фильтрации по авто
     *
     * @return {Object|null}
     */
    getFilterForCar: (type) => {
        return type === TypeProductEnum.TIRES
            ? get().filterTires.car
            : get().filterWheels.car

    },

    /**
     * Обновляет параметры фильтра для шин.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setParamFilterTires: (payload) => set((state) => {
        console.log('setParamFilterTires')
        let newParams = {...state.filterTires.params}

        if (payload.value !== null) {
            newParams[payload.type] = payload.value
        } else {
            delete newParams[payload.type]
        }

        return {...state, filterTires: {...state.filterTires, params: newParams}}

    }),

    /**
     * Обновляет параметры фильтра для дисков.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setParamFilterWheels: (payload) => set((state) => {
        console.log('setParamFilterWheels')
        let newParams = {...state.filterWheels.params}

        if (payload.value !== null) {
            newParams[payload.type] = payload.value
        } else {
            delete newParams[payload.type]
        }

        return {...state, filterWheels: {...state.filterWheels, params: newParams}}
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
     * Обновляет параметры автомобиля для шин.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setCarFilterTires: (payload) => set((state) => {
        console.log('setCarFilterTires', payload)
        let newCar = {...state.filterTires.car}

        if (payload.value !== null) {
            newCar[payload.type] = payload.value
        } else {
            delete newCar[payload.type]
        }

        return {...state, filterTires: {...state.filterTires, car: newCar}}
    }),

    /**
     * Обновляет параметры автомобиля для дисков.
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.type - Ключ параметра (например, "width", "profile").
     * @param {string} payload.value - Значение параметра.
     */
    setCarFilterWheels: (payload) => set((state) => {
        console.log('setCarFilterWheels', payload)
        let newCar = {...state.filterWheels.car}

        if (payload.value !== null) {
            newCar[payload.type] = payload.value
        } else {
            delete newCar[payload.type]
        }

        return {...state, filterWheels: {...state.filterWheels, car: newCar}}
    }),

    /**
     * Обнуляем параметр сущности
     * @param {Object} payload - Объект с данными для обновления фильтра.
     * @param {string} payload.entity - Сущность filterTires, filterWheels.
     * @param {string} payload.param - Параметр сущности params, car.
     *
     */
    clearFilter: (payload) => set((state) => {
        console.log('clearFilter')
        if (typeof payload == 'undefined') {
            return {
                ...state,
                filterTires: INITIAL_FILTER_WHEELS,
                filterWheels: INITIAL_FILTER_WHEELS
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