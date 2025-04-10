"use client"

import { useEffect, useState } from "react";
import CartItem from "@/app/cart/_components/CartItem";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import BackendApi from "@/lib/BackendApi";


export default function CartPage() {
    const { getProductsInCart, countProductsInCart, getFullPriceInCart, changeProductInCart, getCityQueryParamString, getSelectedCity } = useStore()
    const [isStoreRedy, setIsStoreRedy] = useState(false)
    const [isCartReady, setIsCartReady] = useState(false)

    useEffect(() => {
        if (getProductsInCart()) {
            setIsStoreRedy(true)
        }
    }, [getProductsInCart()])

    useEffect(() => {
        if (!isStoreRedy) return

        (async () => {
            let param = {
                items: getProductsInCart()
                    .map(item => ({ product_article: item.product_article, product_type: item.product_type }))
            }

            let response = await BackendApi.post('/api/cart' + getCityQueryParamString({ isFirst: true }), param)

            if (response.code === 200) {
                (await response).data
                    .map(item => {
                        changeProductInCart({
                            product_article: item.product_article,
                            params: {
                                price: item.price,
                                is_active: item.is_active,
                                stock_count: item.count
                            }
                        })
                    })

                setIsCartReady(true)
            }
        })()

    }, [isStoreRedy, getSelectedCity()])

    const themplateAddFreePack = () => {

        const itemsCount = getProductsInCart().reduce((sum, item) => sum + Number(item.count), 0)

        if (itemsCount >= 4) {
            return <CartItem
                isStub
                item={{
                    image: '/assets/img/cart.png',
                    name: 'Пакеты для шин и перчатки',
                    count: Math.floor(itemsCount / 4),
                }} />
        }
    }

    if (countProductsInCart() === 0) {
        return isStoreRedy && (<>Ваша корзина пуста</>)
    }

    return isCartReady && (<>
        {/*<LocationReloadComponent />*/}
        <section className="cart-section container">
            <h2>Корзина</h2>
            <div className="cart_row">
                <div className="cart_in">
                    {getProductsInCart().map((item, index) => <CartItem key={index} item={item} />)}
                    {themplateAddFreePack()}
                </div>
                <div className="cart_total">
                    <div className="cart_total_top">
                        <div className="cart_total_top_title">Итого</div>
                        <div className="cart_total_top_price">{getFullPriceInCart().toLocaleString()} ₽</div>
                    </div>
                    <div className="cart_total_list">
                        <div><img src="assets/img/cart_total_list.svg" alt="" /><span>Вы можете вернуть товар в течении 14 дней</span>
                        </div>
                        <div><img src="assets/img/cart_total_list.svg" alt="" /><span>Бесплатно заменим бракованный товар и возместим расходы </span>
                        </div>
                    </div>
                    <Link href="/cart/order" className="cart_total_next">Оформить заказ</Link>
                </div>
            </div>
        </section>
    </>)
}