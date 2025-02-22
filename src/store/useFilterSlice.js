const INITIAL_FILTER_TIRES = {
        params: {},
        car: {},
        range: [],
};

const INITIAL_FILTER_WHEELS = {
        params: {},
        car: {},
        range: [],
};

export const useFilterSlice = (set) => ({
        filterTires: INITIAL_FILTER_TIRES,
        filterWheels: INITIAL_FILTER_WHEELS,

        /**
         * Обновляет параметры фильтра для шин.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "width", "profile").
         * @param {string} payload.value - Значение параметра.
         */
        setParamFilterTires: (payload) => set((state) => {
                let newParams = { ...state.filterTires.params }

                if (payload.value !== null) {
                        newParams[payload.type] = payload.value
                } else {
                        delete newParams[payload.type]
                }

                return { ...state, filterTires: { ...state.filterTires, params: newParams } }

        }),

        /**
         * Обновляет параметры фильтра для дисков.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "width", "profile").
         * @param {string} payload.value - Значение параметра.
         */
        setParamFilterWheels: (payload) => set((state) => {
                let newParams = { ...state.filterWheels.params }

                if (payload.value !== null) {
                        newParams[payload.type] = payload.value
                } else {
                        delete newParams[payload.type]
                }

                return { ...state, filterWheels: { ...state.filterWheels, params: newParams } }
        }),

        setRangeFilterTires: (payload) => set((state) => ({
                ...state,
                filterTires: {
                        ...state.filterTires,
                        range: payload
                }
        })),

        /**
         * Обновляет параметры автомобиля для шин.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "width", "profile").
         * @param {string} payload.value - Значение параметра.
         */
        setCarFilterTires: (payload) => set((state) => {
                let newCar = { ...state.filterTires.car }

                if (payload.value !== null) {
                        newCar[payload.type] = payload.value
                } else {
                        delete newCar[payload.type]
                }

                return { ...state, filterTires: { ...state.filterTires, car: newCar } }
        }),

        /**
         * Обновляет параметры автомобиля для дисков.
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.type - Ключ параметра (например, "width", "profile").
         * @param {string} payload.value - Значение параметра.
         */
        setCarFilterWheels: (payload) => set((state) => {
                let newCar = { ...state.filterWheels.car }

                if (payload.value !== null) {
                        newCar[payload.type] = payload.value
                } else {
                        delete newCar[payload.type]
                }

                return { ...state, filterWheels: { ...state.filterWheels, car: newCar } }
        }),

        /**
         * Обнуляем параметр сущности
         * @param {Object} payload - Объект с данными для обновления фильтра.
         * @param {string} payload.entity - Сущность filterTires, filterWheels.
         * @param {string} payload.param - Параметр сущности params, car.
         *
         */
        clearFilter: (payload) => set((state) => ({
                ...state,
                filterTires: INITIAL_FILTER_WHEELS,
                filterWheels: INITIAL_FILTER_WHEELS
        })),
});