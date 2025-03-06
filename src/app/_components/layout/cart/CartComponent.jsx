"use client"

import dynamic from "next/dynamic"
const CountProductsInCart = dynamic(() => import('./CountProductInCart'), {ssr: false})

export default function CartComponent() {
    return (<>
        <div className="cart header-icon-and-btn" id="busket">
            <img src="/assets/img/busket.svg" alt="" />
            <p className="header-icon-and-btn-text">Корзина</p>
            <CountProductsInCart />
        </div>
    </>)
}