const INITIAL_CART = {
    items: [],
}
export const useCartSlice = (set, get) => ({
    cart: INITIAL_CART,

    /**
     * Получить все позиции из корзины
     * @return array
     */
    getProductsInCart: () => get().cart.items,

    /**
     * Получить сумму всех позиций из корзины
     * @returns number
     */
    getFullPriceInCart: () => get().cart.items.reduce((sum, item) => sum + item.price * item.count, 0),

    /**
     * Количество продуктов в корзине
     * @return number
     */
    countProductsInCart: () => get().cart.items.length,

    /**
     * Проверка наличия позиции в корзине по product_article
     * @param {string} product_article
     */
    hasProductInCart: (product_article) => get().cart.items.some(item => item.product_article === product_article),

    /**
     * Получить продукт из корзины по product_article
     * @param {string} product_article
     */
    getProductFromCart: (product_article) => get().cart.items.filter(item => item.product_article === product_article)[0],

    /**
     * Добавление позиции в корзину
     * @param {Object} payload
     * @param {string} payload.product_article
     * @param {string} payload.name
     * @param {string} payload.count
     * @param {string} payload.image
     *
     */
    addCart: (payload) => set(state => ({
        ...state,
        cart: {
            ...state.cart,
            items: [...state.cart.items, payload]
        }
    })),

    /**
     * Изменение информации о товаре
     * @param {Object} payload 
     * @param {string} payload.product_article
     * @param {Object} payload.params - Динамические параметры товара пример {count: 4}
     * @returns 
     */
    changeProductInCart: (payload) => set(state => {

        const nextState = { ...state }
        const index = nextState.cart.items.findIndex(el => el.product_article === payload.product_article)

        if (index !== -1) {
            nextState.cart.items[index] = {
                ...nextState.cart.items[index],
                ...payload.params
            };
        }

        return nextState
    }),

    /**
     * Удаление позиции из корзины по product_article
     * @param {string} product_article
     */

    removeFromCart: (product_article) => set(state => ({
        ...state,
        cart: {
            ...state.cart,
            items: state.cart.items.filter(item => item.product_article !== product_article)
        }
    })),

    /**
     * Полная очистка корзины
     */
    clearCart: () => set(state => ({...state, cart: INITIAL_CART}))
})