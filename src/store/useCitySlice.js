const INITIAL_CITY = {
    id: 1042,
    name: 'Челябинск',
    name_en: 'Chelyabinsk'
}

export const useCitySlice = (set, get) => ({
    selectedCity: INITIAL_CITY,

    /**
     * Установка города
     * @param {int} payload.id
     * @param {string} payload.name
     * @param {string} payload.name_en
     */
    setCity: (payload) => set(state => ({
        ...state,
        selectedCity: payload
    })),

    getSelectedCity: () => get().selectedCity,

    getCityQueryParam: () => {
        if (get().selectedCity.name_en !== 'Chelyabinsk') {
            return {city_name: get().selectedCity.name_en}
        }

        return {}
    },

    /**
     * 
     * @param {Object} payload
     * @param {boolean} payload.isFirst
     * @returns string
     */
    getCityQueryParamString: (payload) => {
        if (get().selectedCity.name_en !== 'Chelyabinsk') {
            return payload.isFirst ? `?city_name=${get().selectedCity.name_en}` : `&city_name=${get().selectedCity.name_en}`
        }

        return ''
    },
})