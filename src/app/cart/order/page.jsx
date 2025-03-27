"use client"

import {useStore} from "@/store/useStore"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {InputText} from 'primereact/inputtext';
import {InputMask} from 'primereact/inputmask';
import {Accordion, AccordionTab} from 'primereact/accordion';
import BackendApi from "@/lib/BackendApi";

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
    const {
        getProductsInCart,
        countProductsInCart,
        getFullPriceInCart,
        getSelectedCity,
        getCityQueryParamString
    } = useStore()
    const [isStoreReady, setIsStoreReady] = useState(false)
    const [order, setOrder] = useState(INITIAL_ORDER)
    const [deliveryPoints, setDeliveryPoints] = useState([])

    useEffect(() => {
        if (countProductsInCart() === 0) {
            router.push('/cart')
        } else {
            setIsStoreReady(true)
        }
    }, [router])

    useEffect(() => {
        if (!isStoreReady) return

        (async () => {
            let response = await BackendApi.get('/api/list/order/delivery-point' + getCityQueryParamString({isFirst: true}))

            if (response.code === 200) {
                setDeliveryPoints(response.data)
            }
        })()

    }, [isStoreReady])

    useEffect(() => {
        console.log("Order state changed:", order);
    }, [order]);

    if (!isStoreReady) return null // Чтобы не рендерить пустой экран до редиректа

    return isStoreReady && (<>
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
                                    onInput={e => setOrder({
                                        ...order,
                                        user: {...order.user, surnemae: e.target.value}
                                    })}
                                    placeholder="Фамилия"
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.name}
                                    onInput={e => setOrder({...order, user: {...order.user, name: e.target.value}})}
                                    placeholder="Имя*"
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.patronimyc}
                                    onInput={e => setOrder({
                                        ...order,
                                        user: {...order.user, patronimyc: e.target.value}
                                    })}
                                    placeholder="Отчество"
                                    className="p-inputtext-sm"
                                />
                            </div>
                        </div>
                        <div className="order_form_details_input">
                            <InputMask
                                value={order.user.phone}
                                onInput={e => setOrder({...order, user: {...order.user, phone: e.target.value}})}
                                mask="+7(999)-999-99-99"
                                placeholder="+7(___)-___-__-__"
                            />
                            <div className="order_form_details_input_prompt">*Позвоним, что бы согласовать детали заказа
                                (обязательно)
                            </div>
                        </div>
                        <div className="order_form_details_input">
                            <InputText
                                value={order.user.email}
                                onInput={e => setOrder({...order, user: {...order.user, email: e.target.value}})}
                                placeholder="Почта"
                                className="p-inputtext-sm"
                            />
                            <div className="order_form_details_input_prompt">Для отправки статуса заказа и документов
                                (не обязательно)
                            </div>
                        </div>
                    </div>
                    <div className="order_form_in order_form_delivery">
                        <div className="order_form_title"><span>2</span> Способ получения</div>
                        <div className="order_form_subtitle">*стоимость заказа могут изменяться в зависимости от
                            выбранного города
                        </div>
                        <div className="order_form_delivery_town">
                            <img src="/assets/img/town.svg" alt=""/>
                            <span>Ваш город</span>
                            <b>{getSelectedCity().name}</b>
                        </div>
                        <div
                            className={`order_form_delivery_item ${order.delivery.delivery_type === 'deliveryPoint' && 'active'}`}
                            onClick={() => setOrder({
                                ...order,
                                delivery: {...order.delivery, delivery_type: 'deliveryPoint'}
                            })}
                        >
                            <div className="order_form_delivery_item_img">
                                <img src="/assets/img/delivery_1.svg" alt=""/>
                            </div>
                            <div className="order_form_delivery_item_cont">
                                <div className="order_form_delivery_item_title">Самовывоз со склада с 14.02 по 17.02
                                </div>
                                <div className="order_form_delivery_item_list">
                                    {deliveryPoints.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                console.log({...order, delivery: {...order.delivery, delivery_point_id: item.id}})
                                                setOrder({...order, delivery: {...order.delivery, delivery_point_id: item.id}})
                                            }}

                                        >
                                            <img
                                                src={order.delivery.delivery_point_id === item.id
                                                    ? '/assets/img/order_check_a.svg'
                                                    : '/assets/img/order_check.svg'}
                                                alt=""
                                            />
                                            <span>{item.full_name} ({item.work_time})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`order_form_delivery_item ${order.delivery.delivery_type === 'toClient' && 'active'}`}
                            onClick={() => setOrder({
                                ...order,
                                delivery: {...order.delivery, delivery_type: 'toClient'}
                            })}
                        >
                            <div className="order_form_delivery_item_img">
                                <img src="/assets/img/delivery_2.svg" alt=""/>
                            </div>
                            <div className="order_form_delivery_item_cont">
                                <div className="order_form_delivery_item_title">Доставка в Вашем
                                    городе <span>бесплатно</span>. В удаленные районы согласно установленным <a
                                        href="#">тарифам</a></div>
                                <div className="order_form_delivery_item_input">
                                    <InputText
                                        value={order.delivery.shipment_address}
                                        onInput={e => setOrder({
                                            ...order,
                                            delivery: {...order.delivery, shipment_address: e.target.value}
                                        })}
                                        placeholder="Адрес в свободной форме* "
                                        className="p-inputtext-sm"
                                    />
                                    <div className="order_form_delivery_item_input_prompt">*Позвоним, что бы согласовать
                                        детали заказа (обязательно)
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`order_form_delivery_item ${order.delivery.delivery_type === 'toProductCompany' && 'active'}`}
                            onClick={() => setOrder({
                                ...order,
                                delivery: {...order.delivery, delivery_type: 'toProductCompany'}
                            })}
                        >
                            <div className="order_form_delivery_item_img">
                                <img src="/assets/img/delivery_3.svg" alt=""/>
                            </div>
                            <div className="order_form_delivery_item_cont">
                                <div className="order_form_delivery_item_title">Отправим Ваш заказ транспортной
                                    компанией “Энергия”, “ПЭК”, “КИТ”, “Деловые линии”. Доставка до ТК бесплатно.
                                </div>
                                <div className="order_form_delivery_item_input">
                                    <InputText
                                        value={order.delivery.shipment_transport_company}
                                        onInput={e => setOrder({
                                            ...order,
                                            delivery: {...order.delivery, shipment_transport_company: e.target.value}
                                        })}
                                        placeholder="Город, пожелание по ТК (в свободной форме)* "
                                        className="p-inputtext-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order_form_in order_form_method">
                        <div className="order_form_title"><span>3</span> Способ оплаты</div>
                        <div className="order_form_method_item active">
                            <img src="/assets/img/order_check_a.svg" alt=""/>
                            <span>Наличными при получении</span>
                        </div>
                        <div className="order_form_method_item">
                            <img src="/assets/img/order_check.svg" alt=""/>
                            <span>Картами Visa, MasterCard, Мир. Система быстрых платежей</span>
                        </div>

                        <div className="order_form_method_btn">
                            <a className="order_form_method_btn_submit" href="#">Оформить заказ</a>
                            <div className="order_form_method_btn_info">
                                <img src="/assets/img/order_check_a.svg" alt=""/>
                                <span>Продолжая оформление заказа, я соглашаюсь с условиями <a href="#">Политики конфиденциальности</a>&nbsp;и&nbsp;
                                    <a href="#">Публичной оферты</a>, включающей условия обработки персональных данных</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order_total">
                    <div className="order_total_top">
                        <div className="order_total_top_title">К оплате</div>
                        <div className="order_total_top_price">{getFullPriceInCart().toLocaleString()} ₽</div>
                    </div>
                    <Accordion activeIndex={0}>
                        <AccordionTab
                            header={`Товаров, ${getProductsInCart().reduce((sum, item) => sum + item.count, 0)} шт`}>
                            <div className="order_total_list">
                                {getProductsInCart().map((item, index) => (<>
                                    <div key={index}>
                                        <span>{item.name}</span>
                                        <span>{item.count}шт. х {item.price.toLocaleString()} ₽</span>
                                    </div>
                                </>))}
                            </div>
                        </AccordionTab>
                    </Accordion>
                    <div className="order_total_list">
                        <div>
                            Вы можете вернуть товар в течении 14 дней
                        </div>
                        <div>
                            Бесплатно заменим бракованный товар и возместим расходы
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}