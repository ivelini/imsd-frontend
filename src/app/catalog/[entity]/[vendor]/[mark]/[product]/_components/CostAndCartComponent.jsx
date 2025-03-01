"use client"
import { useStore } from "@/store/useStore"
import { useState } from "react"

export default function CostAndCartComponent({ children, item }) {
    const {hasProductInCart, addCart, removeFromCart} = useStore()
    const [count, setCount] = useState(1)

    return (<>
        <div className="options">
            <select id="quantity-select" className="quantity-select" onChange={(e) => console.log(e.target.value)}>
                {[1, 2, 3, 4].map((count, index) =>
                    <option key={index}
                        className="quantity-select-option"
                        value={count}
                    >{(item.price_stock_and_delivery.price * count).toLocaleString("ru-RU")} ₽ - {count} шт.</option>
                )}
            </select>
        </div>

        {children}
        {!hasProductInCart(item.product_article)
            ? <button className="add-to-cart-button primary-button">Добавить в корзину</button>
            : <button className="add-to-cart-button primary-button" style={{'background-color': 'gray'}}>Убрать из корзины</button>
        }
    </>)
}