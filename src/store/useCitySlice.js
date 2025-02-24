const INITIAL_CITY = {
    id: 1042,
    name: 'Челябинск',
    name_en: 'Chelyabinsk'
}

export const useCitySlice = (set) => ({
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
    }))
})