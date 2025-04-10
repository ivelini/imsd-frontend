"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

const CountProductsInCart = dynamic(() => import('@/app/_components/layout/cart/CountProductsInCart'), { ssr: false })

export default function CartComponent() {
    return (<>
        <Link href="/cart">
            <div className="cart header-icon-and-btn" id="busket">
                <img src="/assets/img/busket.svg" alt="" />
                <p className="header-icon-and-btn-text">Корзина</p>
                <CountProductsInCart />
            </div>
        </Link>
    </>)
}