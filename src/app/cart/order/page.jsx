"use client"

import { useStore } from "@/store/useStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OrderPage({ order }) {
    const router = useRouter()
    const { getProductsInCart, countProductsInCart, getFullPriceInCart } = useStore()
    const [isStoreReady, setIsStoreReady] = useState(false)

    useEffect(() => {
        if (countProductsInCart() === 0) {
            router.push('/cart')
        } else {
            setIsStoreReady(true)
        }
    }, [countProductsInCart, router]) 

    if (!isStoreReady) return null // Чтобы не рендерить пустой экран до редиректа


    return (<>

    </>)
}