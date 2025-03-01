"use client"
import { useStore } from "@/store/useStore"
import { useState } from "react"

export default function CostAndCartComponent({ children, item }) {
    const { hasProductInCart, getProductFromCart, addCart, removeFromCart } = useStore()
    const [count, setCount] = useState(getProductFromCart(item.product_article).count || 4)

    const handleAddProduct = () => {
        addCart({
            product_article: item.product_article,
            name: item.name,
            count,
            image: item.main_image.url
        })
    }

    const handleRemoveProduct = () => {
        removeFromCart(item.product_article)
    }

    return (<>
        <div className="options">
            <select id="quantity-select"
                disabled={hasProductInCart(item.product_article)}
                className="quantity-select"
                style={hasProductInCart(item.product_article) ? {'backgroundColor': '#D8D8D8'} : {}}
                value={count} onChange={(e) => setCount(e.target.value)}
            >
                {[1, 2, 3, 4].map((count, index) =>
                    <option key={index}
                        className="quantity-select-option"
                        value={count}>
                        {(item.price_stock_and_delivery.price * count).toLocaleString("ru-RU")} ₽ - {count} шт.
                    </option>
                )}
            </select>
        </div>

        {children}
        
        {!hasProductInCart(item.product_article)
            ? <button className="add-to-cart-button primary-button" onClick={handleAddProduct}>Добавить в корзину</button>
            : <button className="add-to-cart-button primary-button"
                style={{ 'backgroundColor': '#D8D8D8', 'color': '#444444' }}
                onClick={handleRemoveProduct}
            >Убрать из корзины</button>
        }
    </>)
}