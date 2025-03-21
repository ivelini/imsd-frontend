"use client"

import { useStore } from "@/store/useStore"
import Image from "next/image"

/**
 * Компонент элемента корзины
 * 
 * @param {Object} props
 * @param {Object} props.item - Данные товара
 * @param {string} props.item.name - Название товара
 * @param {string} props.item.product_article - артикул из 1С
 * @param {string} props.item.image - Путь к изображению или ссылка
 * @param {number} props.item.count - Выбранное количество товара
 * @param {string} props.item.stock_count - Количество на складе
 * @param {number} props.item.price - Цена товара
 * @param {number} props.item.sum - Сумма товара (цена * количество)
 * @param {string} props.item.url - Ссылка натовар
 * 
 * @returns {JSX.Element} Элемент товара в корзине
 */
export default function CartItem({ item, isStub = false }) {
    const { removeFromCart } = useStore()

    const handleRemoveFromCart = () => {
        removeFromCart(item.product_article)
    }

    return (<>
        <div className="cart_item">
            <div className="cart_item_img">
                <Image
                    src={item.image}
                    width={172}
                    height={172}
                    alt={item.name}
                    unoptimized
                />
            </div>
            <div className="cart_item_info">
                <div className="cart_item_info_title">
                    <a href={item.url}>
                        {item.name}
                    </a>
                </div>
                {!isStub && (<>
                    <div className="cart_item_info_more">
                        <div className="cart_item_info_code">Код товара: <span>{item.product_article}</span></div>
                        <div className="cart_item_info_av">Наличие <span>{item.stock_count} шт.</span></div>
                    </div>
                    <div className="cart_item_info_price"><span>29 999</span> ₽</div>
                </>)}

            </div>

            <div className="cart_item_quantity">
                <div className="cart_item_quantity_in">
                    <div className="cart_item_quantity_btn"><img src="assets/img/cart_minus.svg" alt="" /></div>
                    <div className="cart_item_quantity_number"><span>4</span></div>
                    <div className="cart_item_quantity_btn"><img src="assets/img/cart_plus.svg" alt="" /></div>
                </div>
            </div>
            <div className="cart_item_total">
                <div className="cart_item_total_price">{isStub ? 0 : item.sum} ₽</div>
                <div className="cart_item_total_delete" onClick={handleRemoveFromCart}>
                    Удалить <img src="/assets/img/cart_delete.svg" alt="" />
                </div>
            </div>
        </div>
    </>)
}