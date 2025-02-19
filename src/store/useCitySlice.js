const INITIAL_CITY = {
    id: 1042,
    name: 'Челябинск'
}

export const useCitySlice = (set) => ({
    selectedCity: INITIAL_CITY,

    /**
     * Установка города
     * @param {int} payload.id
     * @param {string} payload.name
     */
    setCity: (payload) => set(state => ({
        ...state,
        selectedCity: payload
    }))
})