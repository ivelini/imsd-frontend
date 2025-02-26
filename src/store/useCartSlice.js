const INITIAL_CART = {
    items: [],
}
export const useCartSlice = (set, get) => ({
    cart: INITIAL_CART,

    /**
     * Проверка наличия позиции в корзине по product_article
     * @param {string} product_article
     */
    hasProductInCart: (product_article) => get().cart.items.some(item => item.product_article === product_article),

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
})