
const INITIAL_AUTH_USER_DATA = {
    token: null,
}

export const useAuthUserData = (set, get) => ({
    authUserData: INITIAL_AUTH_USER_DATA,

    /**
     * Получение токена авторизации
     */
    getToken: () => get().authUserData.token,

    /**
     * Установка токена авторизации
     * @param {string} payload
     *
     */
    setToken: (payload) => set(state => ({
        ...state,
        authUserData: {
            ...state.authUserData,
            token: payload}
    })),

    /**
     * Удаление токена авторизации
     */
    clearToken: () => set(state => ({
        ...state,
        authUserData: {
            ...state.authUserData,
            token: null
        }
    }))
})
