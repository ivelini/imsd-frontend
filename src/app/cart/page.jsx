"use client"

import { useEffect, useState } from "react";
import CartItem from "@/app/cart/_components/CartItem";
import { useStore } from "@/store/useStore";
import LocationReloadComponent from "@/components/LocationReloadComponent";


export default function CartPage() {
    const { getProductsInCart, countProductsInCart } = useStore()
    const [isStoreRedy, setIsStoreRedy] = useState(false)

    useEffect(() => {
        if (getProductsInCart()) {
            setIsStoreRedy(true)
        }
    }, [getProductsInCart()])

    useEffect(() => {
        if(!isStoreRedy) return

    }, [isStoreRedy])

    console.log(getProductsInCart())

    const themplateAddFreePack = () => {

        let itemsCount = getProductsInCart().reduce((sum, item) => sum + item.count, 0)

        if(itemsCount >= 4) {
            return <CartItem item={{
                image: '/assets/img/cart.png',
                name: 'Пакеты для шин и перчатки',
                count: Math.floor(itemsCount / 4),
            }} isStub />

        }
    }

    if (countProductsInCart() === 0) {
        return isStoreRedy && (<>Ваша корзина пуста</>)
    }

    return isStoreRedy && (<>
        <LocationReloadComponent />
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
                        <div className="cart_total_top_price">29 999 ₽</div>
                    </div>
                    <div className="cart_total_list">
                        <div><img src="assets/img/cart_total_list.svg" alt="" /><span>Вы можете вернуть товар в течении 14 дней</span>
                        </div>
                        <div><img src="assets/img/cart_total_list.svg" alt="" /><span>Бесплатно заменим бракованный товар и возместим расходы </span>
                        </div>
                    </div>
                    <a href="#" className="cart_total_next">Оформить заказ</a>
                </div>
            </div>
        </section>
    </>)
}