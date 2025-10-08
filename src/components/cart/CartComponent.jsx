"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

const CountProductsInCart = dynamic(() => import('@/components/cart/CountProductsInCart'), { ssr: false })

export default function CartComponent() {
    return (<>
        <Link href="/cart">
            <div className="cart header-icon-and-btn" id="busket">
                <i className="pi pi-shopping-bag" style={{fontSize: '20px', color: 'black'}} />
                <p className="header-icon-and-btn-text">Корзина</p>
                <CountProductsInCart />
            </div>
        </Link>
    </>)
}