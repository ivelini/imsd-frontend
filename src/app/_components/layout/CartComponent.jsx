"use client"

import {useStore} from "@/store/useStore";

export default function CartComponent() {
    const { countProductsInCart } = useStore()

    return (<>
        <div className="cart header-icon-and-btn" id="busket">
            <img src="/assets/img/busket.svg" alt=""/>
            <p className="header-icon-and-btn-text">Корзина</p>
            {countProductsInCart() > 0 && <span id="count-in-busket">{countProductsInCart()}</span>}
        </div>
    </>)
}