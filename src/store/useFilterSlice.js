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
                let newParams = {...state.filterTires.params}

                if(payload.value !== null) {
                        newParams[payload.type] = payload.value
                } else {
                        delete newParams[payload.type]
                }

                return  {...state, filterTires: {...state.filterTires, params: newParams}}

        }),
});