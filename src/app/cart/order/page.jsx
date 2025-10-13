"use client"

import {useStore} from "@/store/useStore"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {InputText} from 'primereact/inputtext';
import {InputMask} from 'primereact/inputmask';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {RadioButton} from "primereact/radiobutton";
import BackendApi from "@/lib/BackendApi";
import OrderStoreSuccess from "@/components/cart/OrderStoreSuccess";
import Link from "next/link";
import ToastMessageServerComponent from "@/components/ui/ToastMessageServerComponent";

//Сформированный заказ
const INITIAL_ORDER = {
    user: { // Информация о пользователе
        name: '',
        surname: '',
        patronimyc: '',
        phone: '',
        email: ''
    },
    description: '', // Комментарий пользователя к заказу
    delivery: { //Информация о доставке
        delivery_type: 'deliveryPoint', // Тип доставки (точка выдачи, доставка курьером, доставка транспортной)
        delivery_point_id: null, // Если точка выдачи, то ID этой точки выдачи
        shipment_address: '', // Если курьерская доставка, то адрес куда доставляем
        shipment_transport_company: '' // Если транспортная компания, то заполняется в свободной форме
    },
    products: []    // Массив товаров
}

export default function OrderPage() {
    const router = useRouter()
    const {
        getProductsInCart,
        countProductsInCart,
        getFullPriceInCart,
        getSelectedCity,
        getCityQueryParamString,
        clearCart
    } = useStore()
    const [isStoreReady, setIsStoreReady] = useState(false)
    const [isOrderSuccess, setIsOrderSuccess] = useState(false)
    const [order, setOrder] = useState(INITIAL_ORDER)
    const [deliveryPoints, setDeliveryPoints] = useState([])
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (countProductsInCart() === 0) {
            router.push('/cart')
        } else {
            setIsStoreReady(true)
        }
    }, [router])

    useEffect(() => {
        if (!isStoreReady) return

        let city = getCityQueryParamString({isFirst: true})

            if(city === '') {
                city = '?city_name=Chelyabinsk'
            }
        (async () => {
            let response = await BackendApi.get('/api/list/order/delivery-point' + city)

            if (response.code === 200) {
                setDeliveryPoints(response.data)
                setOrder({
                    ...order,
                    delivery: {
                        ...order.delivery,
                        delivery_point_id: response.data[0].id
                    }
                })
            }
        })()

    }, [isStoreReady])

    /**
     * Валидация заказа
     */
    const isFill = () => {
        let requiredFields = [
            'user.name',
            'user.phone',
            'delivery.delivery_type',
        ];

        if (order.delivery.delivery_type === 'deliveryPoint') requiredFields.push('delivery.delivery_point_id');
        if (order.delivery.delivery_type === 'toClient') requiredFields.push('delivery.shipment_address');
        if (order.delivery.delivery_type === 'toTransportCompany') requiredFields.push('delivery.shipment_transport_company');

        //Разбираем массив обязательных полей
        for (let field of requiredFields) {
            let keys = field.split('.') //Разбираем поле на массив, например user.name

            let value = order
            for (let k of keys) {
                value = value[k]
            }

            if (value === null || value === '') return false
        }

        return true
    }

    const handleStoreOrder = async () => {

        order.user.phone = order.user.phone.replace(/^\+7/, '').replace(/[()\-\s]/g, '');
        order.products = getProductsInCart()

        let response = await BackendApi.post('/api/cart/order' + getCityQueryParamString({isFirst: true}), order)

        if (response.code === 201) {
            setIsOrderSuccess(true)
        }

        if(response.code === 422) {
            setErrors(response)
        }
    }

    const clearOrder = () => {
        clearCart()
        router.push('/')
    }

    return isStoreReady && (<>
        <ToastMessageServerComponent errors={errors} clearErrors={() => {
            setErrors(null)
        }}/>

        {isOrderSuccess && <OrderStoreSuccess handleOnClick={clearOrder}/>}

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
                                    value={order.user.surname}
                                    onChange={e => setOrder({
                                        ...order,
                                        user: {...order.user, surname: e.target.value}
                                    })}
                                    placeholder="Фамилия"
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.name}
                                    onChange={e => setOrder({...order, user: {...order.user, name: e.target.value}})}
                                    placeholder="Имя*"
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="order_form_details_input">
                                <InputText
                                    value={order.user.patronimyc}
                                    onChange={e => setOrder({
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
                                onChange={e => setOrder({...order, user: {...order.user, phone: e.target.value}})}
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
                                onChange={e => setOrder({...order, user: {...order.user, email: e.target.value}})}
                                placeholder="Почта"
                                className="p-inputtext-sm"
                            />
                            <div className="order_form_details_input_prompt">Для отправки статуса заказа и документов
                                (не обязательно)
                            </div>
                        </div>
                        <div className="order_form_details_input">
                            <InputText
                                value={order.description}
                                onChange={e => setOrder({...order, description: e.target.value})}
                                placeholder="Комментарий к заказу"
                                className="p-inputtext-sm"
                                style={{'maxWidth': '100%'}}
                            />
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
                        {deliveryPoints.length > 0 &&
                            <>
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
                                        <div className="order_form_delivery_item_title">
                                            Самовывоз со склада
                                        </div>
                                        <div className="order_form_delivery_item_list">
                                            {deliveryPoints.map((item, index) => (

                                                <div key={index}>
                                                    <RadioButton
                                                        name="point"
                                                        inputId={item.id}
                                                        value={item}
                                                        onChange={(e) => setOrder({
                                                            ...order,
                                                            delivery: {...order.delivery, delivery_point_id: item.id}
                                                        })}
                                                        checked={order.delivery.delivery_point_id === item.id || index === 0 && order.delivery.delivery_point_id == null}
                                                    />
                                                    <label htmlFor={item.id}
                                                           className="ml-2">
                                                        {item.full_name}&nbsp;
                                                        {Object.keys(item.work_time)
                                                            .map(key => key + ': ' + item.work_time[key])
                                                            .join(', ')
                                                        }</label>
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
                                        <div className="order_form_delivery_item_title">
                                            <p>Доставка курьером.</p>
                                            <p>Стоимость доставки курьером, оплачивается отдельно. <Link href="/delivery" target="_blank">Тарифы на доставку.</Link>
                                            </p>
                                        </div>
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
                                            <div className="order_form_delivery_item_input_prompt">*Позвоним, что бы
                                                согласовать
                                                детали заказа (обязательно)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        <div className={`order_form_delivery_item ${order.delivery.delivery_type === 'toTransportCompany' && 'active'} ${deliveryPoints.length == 0 && 'active'}`}
                            onClick={() => setOrder({
                                ...order,
                                delivery: {...order.delivery, delivery_type: 'toTransportCompany'}
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
                            <img src="/assets/img/order_check.svg" alt="" />
                            <span>Картами Visa, MasterCard, Мир. Система быстрых платежей</span>
                        </div>

                        <div className="order_form_method_btn">
                            <button className={`order_form_method_btn_submit ${!isFill() && 'disabled'}`}
                                    onClick={handleStoreOrder}

                            >Подтвердить заказ
                            </button>
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
                                {getProductsInCart().map((item, index) => (
                                    <div key={index}>
                                        <span>{item.name}</span>
                                        <span>{item.count}шт. х {item.price.toLocaleString()} ₽</span>
                                    </div>
                                ))}
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