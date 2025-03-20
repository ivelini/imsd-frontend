"use client"

import CartItem from "@/app/cart/_components/CartItem";
import {useStore} from "@/store/useStore";
import LocationReloadComponent from "@/components/LocationReloadComponent";

export default function CartPage() {
    const {getProductsInCart} = useStore()


    console.log(getProductsInCart())

    return (<>
        <LocationReloadComponent />
        <section className="cart-section container">
            <h2>Корзина</h2>
            <div className="cart_row">
                <div className="cart_in">
                    {getProductsInCart().map((item, index) => <CartItem key={index} item={item} />)}

                </div>
                <div className="cart_total">
                    <div className="cart_total_top">
                        <div className="cart_total_top_title">Итого</div>
                        <div className="cart_total_top_price">29 999 ₽</div>
                    </div>
                    <div className="cart_total_list">
                        <div><img src="assets/img/cart_total_list.svg" alt=""/><span>Вы можете вернуть товар в течении 14 дней</span>
                        </div>
                        <div><img src="assets/img/cart_total_list.svg" alt=""/><span>Бесплатно заменим бракованный товар и возместим расходы </span>
                        </div>
                    </div>
                    <a href="#" className="cart_total_next">Оформить заказ</a>
                </div>
            </div>
        </section>
    </>)
}