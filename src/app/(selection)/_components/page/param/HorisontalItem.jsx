"use client"

import dynamic from "next/dynamic"
import LocationComponent from "@/components/ui/LocationComponent";
import Image from 'next/image';
import { useStore } from "@/store/useStore";
import Link from "next/link";
import SeasonIconComponent from "@/components/ui/SeasonIconComponent";
import {useState} from "react";
import ProductInCartSuccessComponent from "@/components/ui/ProductInCartSuccessComponent";
import PopUpComponent from "@/components/ui/PopUpComponent";

const CartButtonInHorisontalItem = dynamic(() => import('@/app/(selection)/_components/page/param/CartButtonInHorisontalItem'), {ssr: false}) ;

/**
 *
 * @param {Object} item
 * @param {number} item.id
 * @param {string} item.name
 * @param {string} item.product_type
 * @param {string} item.product_article
 * @param {string} item.product_id
 * @param {string} item.season.name
 * @param {string} item.main_image.url
 * @param {string} item.slug
 * @param {number} item.width
 * @param {number} item.height
 * @param {string} item.diameter
 * @param {boolean} item.is_spike
 * @param {boolean} item.is_runflat
 * @param {string} item.url
 * @param {Object} item.country
 * @param {string} item.country.name
 * @param {Object} item.price_stock_and_delivery
 * @param {string} item.price_stock_and_delivery.price
 * @param {boolean} item.price_stock_and_delivery.is_delivery_points_exists_current_city
 * @param {boolean} item.price_stock_and_delivery.is_free_shipping
 * @param {array} item.price_stock_and_delivery.delivery_points
 * @param {number} item.price_stock_and_delivery.count
 * @param {number} item.price_stock_and_delivery.delivery_days
 * @param {string} item.price_stock_and_delivery.people_name_delivery_cost
 * @param {string} item.price_stock_and_delivery.people_name_delivery_days
 * @param {string} item.price_stock_and_delivery.people_name_price
 * @param {string} item.price_stock_and_delivery.people_name_price_percent_higher
 *
 */
export default function HorisontalItem({ item }) {

    const {getSelectedCity} = useStore()

    const { addCart, removeFromCart, hasProductInCart, getCityQueryParam } = useStore()
    const [isPopUppAddCartVisible, setIsPoUppAddCartVisible] = useState(false)
    const [isPopUppDeliveryVisible, setIsPopUppDeliveryVisible] = useState(false)
    const [isPopUppDeliveryPointsVisible, setIsPopUppDeliveryPointsVisible] = useState(false)

    const handleAddCart = () => {
        addCart({
            product_type: item.product_type,
            id: item.id,
            product_article: item.product_article,
            name: item.name,
            count: 4,
            stock_count: item.price_stock_and_delivery.count,
            image: item.main_image.url,
            slug: item.slug,
            url: item.url,
            price: item.price_stock_and_delivery.price,
        })

        setIsPoUppAddCartVisible(true)
    }

    const handleRemoveFromCart = () => {
        removeFromCart(item.product_article)
    }

    const htmContentDeliveryPointsForPopUpp = () => {

        //ЕСЛИ выбранный город Челябинск
        //ТО выводим информацию для центральных складов
        if (getSelectedCity().name === 'Челябинск') {
            return 'Самовывоз осуществляется из центального офиса:' +
            '<div><strong>Aдрес:</strong> ' + item.price_stock_and_delivery.delivery_points[0].address + '</div>' +
                '<div><strong>Время работы:</strong>' + Object.keys(item.price_stock_and_delivery.delivery_points[0].work_time)
                    .map((key) => ' ' + key + ': ' + item.price_stock_and_delivery.delivery_points[0].work_time[key])
                    .toString() + '</div>'
        }

        //ЕСЛИ нет точек выдачи для данного города
        //ТО выводим текст о не возможности забрать заказ из пункта выдачи
        //ИНАЧЕ выводим пункты выдачи заказа
        if(!item.price_stock_and_delivery.is_delivery_points_exists_current_city) {
            return '<div>В вашем городе нет точек самовывоза.</div>' +
                '<div><strong>' + item.price_stock_and_delivery.people_name_delivery_days + ' шины поступят на центральный склад в г. Челябинск</strong>, ' +
                'откуда их можно забрать самостоятельно, либо оформить доставку в Ваш город транспортной компанией.</div>' +
                '<div>По выбору транспортной компании и расчету стоимости, обратитесь к нашим менеджерам.</div>'
        } else {
            return item.price_stock_and_delivery.people_name_delivery_days + ' заказ можно получить в транспортной компании «Луч». ' +
                '<div><strong>Aдрес:</strong> ' + item.price_stock_and_delivery.delivery_points[0].address + '</div>' +
                '<div><strong>Время работы:</strong>' + Object.keys(item.price_stock_and_delivery.delivery_points[0].work_time)
                    .map((key) => ' ' + key + ': ' + item.price_stock_and_delivery.delivery_points[0].work_time[key])
                    .toString() + '</div>'
        }
    }

    const htmContentDeliveryForPopUpp = () => {

        //ЕСЛИ выбранный город Челябинск
        //ТО выводим информацию для центральных складов
        if (getSelectedCity().name === 'Челябинск') {
            return'<div>Доставка осуществляется, по согласованию с заказчиком, с 9:00 до 20:00.</div>' +
                '<div>Доставка осуществляется в пределах городской черты. Стоимость доставки 400р.</div>' +
                '<div>Доставка в отдаленные районы города согласно тарифам доставки в удаленные районы.</div>'
        }

        //ЕСЛИ нет точек выдачи для данного города
        //ТО выводим текст, что не доставляем по городу заказ, только транспортной коомпанией
        //ИНАЧЕ выводим текст, что доставляем
        if(!item.price_stock_and_delivery.is_delivery_points_exists_current_city) {
            return '<div>Доставка по городу <strong>г. ' + getSelectedCity().name + '</strong> не осуществляется.</div> ' +
                '<div>Доставка в Ваш город возможна транспортной компанией.</div> ' +
                '<div>По выбору транспортной компании и расчету стоимости, обратитесь к нашим менеджерам.</div>'
        } else {
            return '<div>Вы можете оформить адресную доставку курьером в пределах  городской черты г. ' +getSelectedCity().name+ '.</div>' +
                '<div>Стоимость доставки курьером, оплачивается отдельно, согласно тарифам ТК «Луч».</div>'
        }
    }

    return (<>
        {isPopUppAddCartVisible && <ProductInCartSuccessComponent item={{
            name: item.name,
            count: 4,
            price: item.price_stock_and_delivery.price,
            image: item.main_image.url,

        }} handleOnClose={() => setIsPoUppAddCartVisible(false)}/>}

        {isPopUppDeliveryPointsVisible &&
            <PopUpComponent title={"Пункты выдачи товара в городе " + getSelectedCity().name}
                            content={() => htmContentDeliveryPointsForPopUpp()}
                            handleOnClose={() => setIsPopUppDeliveryPointsVisible(false)}
            />}

        {isPopUppDeliveryVisible &&
            <PopUpComponent title={"Доставка по городу " + getSelectedCity().name}
                            content={() => htmContentDeliveryForPopUpp()}
                            handleOnClose={() => setIsPopUppDeliveryVisible(false)}
            />}


        <div className="catalog-product">
            <div className="catalog-product-image">
                <div className="catalog-product-image-panel">
                    <SeasonIconComponent seasonName={item.season?.name} />
                </div>
                <Image
                    src={item.main_image.url}
                    width={172}
                    height={172}
                    alt={item.name}
                    unoptimized
                />
            </div>

            <div className="catalog-product-details">
                <div className="catalog-product-info">
                    <h2 className="catalog-product-title">
                        <Link href={{
                            pathname: item.url,
                            query: getCityQueryParam()
                        }}>
                            {item.name}
                        </Link>
                    </h2>
                    <div className="catalog-product-prices">
                        <p className="catalog-product-new-price">{item.price_stock_and_delivery.people_name_price} ₽</p>
                        <p className="catalog-product-old-price">{item.price_stock_and_delivery.people_name_price_percent_higher} ₽</p>
                    </div>
                </div>
                <div className="catalog-product-flex-container">
                    <div className="catalog-product-flex-item catalog-product-general-info">
                        <p className="product-code"><b>Код товара:</b> {item.product_article}</p>
                        <p className="country">Страна произв.: {item.country.name}</p>
                        <div style={{ 'margin': '10px 0' }}></div>
                    </div>

                    <div className="catalog-product-flex-item catalog-product-promotions">
                        <a href="#" className="promotion-title">
                            <svg className="gift-svg" xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                                viewBox="0 0 19 19" fill="none">
                                <path
                                    d="M17.417 5.54174H16.5414C16.601 5.28218 16.6292 5.01638 16.6253 4.75008C16.6589 4.32568 16.6001 3.89903 16.4528 3.49958C16.3056 3.10012 16.0734 2.73736 15.7724 2.43633C15.4714 2.13529 15.1086 1.90314 14.7092 1.75589C14.3097 1.60864 13.8831 1.54979 13.4587 1.58341C11.7455 1.58341 10.3165 3.38129 9.50033 4.69308C8.68412 3.38129 7.25516 1.58341 5.54199 1.58341C5.11759 1.54979 4.69095 1.60864 4.29149 1.75589C3.89204 1.90314 3.52928 2.13529 3.22824 2.43633C2.9272 2.73736 2.69505 3.10012 2.5478 3.49958C2.40055 3.89903 2.34171 4.32568 2.37533 4.75008C2.37143 5.01638 2.3996 5.28218 2.45924 5.54174H1.58366C1.3737 5.54174 1.17233 5.62515 1.02387 5.77362C0.8754 5.92208 0.791992 6.12345 0.791992 6.33341V10.2917C0.791992 10.5017 0.8754 10.7031 1.02387 10.8515C1.17233 11 1.3737 11.0834 1.58366 11.0834H2.37533V16.6251C2.37533 16.835 2.45873 17.0364 2.6072 17.1849C2.75567 17.3333 2.95703 17.4167 3.16699 17.4167H15.8337C16.0436 17.4167 16.245 17.3333 16.3935 17.1849C16.5419 17.0364 16.6253 16.835 16.6253 16.6251V11.0834H17.417C17.627 11.0834 17.8283 11 17.9768 10.8515C18.1253 10.7031 18.2087 10.5017 18.2087 10.2917V6.33341C18.2087 6.12345 18.1253 5.92208 17.9768 5.77362C17.8283 5.62515 17.627 5.54174 17.417 5.54174ZM5.54199 3.16674C6.42312 3.16674 7.45703 4.41995 8.16082 5.54174H5.98216C3.95866 5.54174 3.95866 5.22508 3.95866 4.75008C3.95866 3.33141 4.86274 3.16674 5.54199 3.16674ZM8.70866 15.8334H3.95866V11.0834H8.70866V15.8334ZM8.70866 9.50008H2.37533V7.12508H8.70866V9.50008ZM13.4587 3.16674C14.1379 3.16674 15.042 3.33141 15.042 4.75008C15.042 5.22508 15.042 5.54174 13.0185 5.54174H10.8398C11.5436 4.41995 12.5775 3.16674 13.4587 3.16674ZM15.042 15.8334H10.292V11.0834H15.042V15.8334ZM16.6253 9.50008H10.292V7.12508H16.6253V9.50008Z"
                                    fill="#DD062A"
                                />
                            </svg>
                            <b className="hide-on-mobile">Акции</b>
                        </a>
                        <div className="col">
                            <p className="promotion-description">Шиномонтаж в подарок</p>
                            <p className="promotion-description">Расширенная гарантия</p>
                            <p className="promotion-description hide-on-mobile">-10% на покупку дисков</p>
                        </div>
                    </div>
                    <div className="merge-block">
                        <div className="catalog-product-flex-item catalog-product-location-info">
                            <LocationComponent />
                            <p className="payment">Оплата при получении</p>
                            <p className="pickup">Самовывоз
                                <a onClick={() => setIsPopUppDeliveryPointsVisible(true)} style={{fontWeight: 'bold'}}>
                                    <span className="highlight-text"> {item.price_stock_and_delivery.people_name_delivery_days}</span>
                                </a>
                            </p>
                            <p className="free-shipping">Доставка
                                <a onClick={() => setIsPopUppDeliveryVisible(true)} style={{fontWeight: 'bold'}}>
                                    <span className="highlight-text"> {item.price_stock_and_delivery.people_name_delivery_cost}</span>
                                </a>
                            </p>
                        </div>
                        <div className="catalog-product-flex-item catalog-product-purchase-actions">
                            <CartButtonInHorisontalItem
                                item={item}
                                add={handleAddCart}
                                remove={handleRemoveFromCart} />
                            <p className="availability">Наличие {item.price_stock_and_delivery.count} шт.</p>
                            <div style={{ 'margin': '10px 0' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}