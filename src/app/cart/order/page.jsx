"use client"

import { useStore } from "@/store/useStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

const INITIAL_ORDER = {
    user: {
        name: '',
        surnemae: '',
        patronimyc: '',
        phone: '',
        email: ''
    },
    description: '',
    delivery: {
        delivery_type: 'deliveryPoint',
        delivery_point_id: null,
        shipment_address: '',
        shipment_transport_company: ''
    },
    products: []
}

export default function OrderPage() {
    const router = useRouter()
    const { getProductsInCart, countProductsInCart, getFullPriceInCart, getSelectedCity } = useStore()
    const [isStoreReady, setIsStoreReady] = useState(false)
    const [order, setOrder] = useState(INITIAL_ORDER)

    useEffect(() => {
        if (countProductsInCart() === 0) {
            router.push('/cart')
        } else {
            setIsStoreReady(true)
        }
    }, [countProductsInCart, router])

    if (!isStoreReady) return null // Чтобы не рендерить пустой экран до редиректа

    return (<>
        <section className="order-section container">
            <h2>Оформление заказа</h2>
            <div className="order_row">
                <div className="order_form">
                    <div className="order_form_in order_form_details">
                        <div className="order_form_title"><span>1</span> Данные получателя</div>
                        <div className="order_form_subtitle">*поля являются обязательными для заполнения</div>
                        <div className="order_form_details_row">
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.surnemae}
                                    onChange={e => setOrder({ ...order, user: { ...order.user, surnemae: e.target.value } })}
                                    placeholder="Фамилия"
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.name}
                                    onChange={e => setOrder({ ...order, user: { ...order.user, name: e.target.value } })}
                                    placeholder="Имя*"
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.patronimyc}
                                    onChange={e => setOrder({ ...order, user: { ...order.user, patronimyc: e.target.value } })}
                                    placeholder="Отчество"
                                    className="p-inputtext-sm"
                                />
                            </div>
                        </div>
                        <div className="order_form_details_input">
                            <InputMask
                                value={order.user.phone}
                                onChange={e => setOrder({ ...order, user: { ...order.user, phone: e.target.value } })}
                                mask="+7(999)-999-99-99"
                                placeholder="+7(___)-___-__-__"
                            />
                            <div className="order_form_details_input_prompt">*Позвоним, что бы согласовать детали заказа (обязательно)</div>
                        </div>
                        <div className="order_form_details_input">
                            <InputText
                                value={order.user.email}
                                onChange={e => setOrder({ ...order, user: { ...order.user, email: e.target.value } })}
                                placeholder="Почта"
                                className="p-inputtext-sm"
                            />
                            <div className="order_form_details_input_prompt">Для отправки статуса заказа и документов (не обязательно)</div>
                        </div>
                    </div>
                    <div className="order_form_in order_form_delivery">
                        <div className="order_form_title"><span>2</span> Способ получения</div>
                        <div className="order_form_subtitle">*стоимость заказа могут изменяться в зависимости от выбранного города</div>
                        <div className="order_form_delivery_town">
                            <img src="/assets/img/town.svg" alt="" />
                            <span>Ваш город</span>
                            <b>{getSelectedCity().name}</b>
                        </div>
                        <div className={`order_form_delivery_item ${order.delivery.delivery_type === 'deliveryPoint' && 'active'}`} >
                            <div className="order_form_delivery_item_img">
                                <img src="/assets/img/delivery_1.svg" alt="" />
                            </div>
                            <div className="order_form_delivery_item_cont">
                                <div className="order_form_delivery_item_title">Самовывоз со склада с 14.02 по 17.02 </div>
                                <div className="order_form_delivery_item_list">
                                    <div>
                                        <img src="/assets/img/order_check_a.svg" alt="" />
                                        <span>Свердловский тракт, 3-н (пн-пт 9:00-19:00, вых 9:00-19:00)</span>
                                    </div>
                                    <div>
                                        <img src="/assets/img/order_check.svg" alt="" />
                                        <span>Ленина, 1-н (пн-пт 9:00-19:00, вых 9:00-19:00)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`order_form_delivery_item ${order.delivery.delivery_type === 'toClient' && 'active'}`}>
                            <div className="order_form_delivery_item_img">
                                <img src="/assets/img/delivery_2.svg" alt="" />
                            </div>
                            <div className="order_form_delivery_item_cont">
                                <div className="order_form_delivery_item_title">Доставка в Вашем городе <span>бесплатно</span>. В удаленные районы согласно установленным <a href="#">тарифам</a>   </div>
                                <div className="order_form_delivery_item_input">
                                    <input type="text" placeholder="Адрес в свободной форме* " />
                                    <div className="order_form_delivery_item_input_prompt">*Позвоним, что бы согласовать детали заказа (обязательно)</div>
                                </div>
                            </div>
                        </div>
                        <div className={`order_form_delivery_item ${order.delivery.delivery_type === 'toProductCompany' && 'active'}`}>
                            <div className="order_form_delivery_item_img">
                                <img src="/assets/img/delivery_3.svg" alt="" />
                            </div>
                            <div className="order_form_delivery_item_cont">
                                <div className="order_form_delivery_item_title">Отправим Ваш заказ транспортной компанией “Энергия”, “ПЭК”, “КИТ”, “Деловые линии”. Доставка до ТК бесплатно. </div>
                                <div className="order_form_delivery_item_input">
                                    <input type="text" placeholder="Город, пожелание по ТК (в свободной форме)* " />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order_form_in order_form_method">
                        <div className="order_form_title"><span>3</span> Способ оплаты</div>
                        <div className="order_form_method_item active">
                            <img src="/assets/img/order_check_a.svg" alt="" />
                            <span>Наличными при получении</span>
                        </div>
                        <div className="order_form_method_item">
                            <img src="/assets/img/order_check.svg" alt="" />
                            <span>Картами Visa, MasterCard, Мир. Система быстрых платежей</span>
                        </div>

                        <div className="order_form_method_btn">
                            <a className="order_form_method_btn_submit" href="#">Оформить заказ</a>
                            <div className="order_form_method_btn_info">
                                <img src="/assets/img/order_check_a.svg" alt="" />
                                <span>Продолжая оформление заказа, я соглашаюсь с условиями <a href="#">Политики конфиденциальности</a>&nbsp;и&nbsp;<a href="#">Публичной оферты</a>, включающей условия обработки персональных данных</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order_total">
                    <div className="order_total_top">
                        <div className="order_total_top_title">К оплате</div>
                        <div className="order_total_top_price">29 999 ₽</div>
                    </div>
                    <div className="order_total_list">
                        <div>
                            <span>Вы можете вернуть товар в течении 14 дней</span>
                            <span>4шт. х 29 999 ₽<span>
                            </span></span></div>
                        <div>
                            <span>Бесплатно заменим бракованный товар и возместим расходы</span>
                            <span>1шт. х 0 ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}