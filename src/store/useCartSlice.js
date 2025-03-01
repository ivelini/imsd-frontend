const INITIAL_CART = {
    items: [],
}
export const useCartSlice = (set, get) => ({
    cart: INITIAL_CART,

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
    getProductFromCart: (product_article) => get().cart.items.filter(item => item.product_article === product_article),

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