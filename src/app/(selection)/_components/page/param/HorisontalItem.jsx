"use client"

import dynamic from "next/dynamic"
import LocationComponent from "@/components/ui/LocationComponent";
import Image from 'next/image';
import {useStore} from "@/store/useStore";
import Link from "next/link";
import SeasonIconComponent from "@/components/ui/SeasonIconComponent";
import {useState} from "react";
import ProductInCartSuccessComponent from "@/components/ui/ProductInCartSuccessComponent";
import PopUpComponent from "@/components/ui/PopUpComponent";
import {
    deliveryCityExistPoints,
    deliveryCityNotExistPoints,
    deliveryMainCity,
    deliveryPointsExists,
    deliveryPointsNotExists
} from "@/lib/TextInformation";
import EuroLabel from "@/app/(selection)/_components/page/param/EuroLabel";

import {Badge} from "primereact/badge";
import PromotionIconComponent from "@/components/ui/PromotionIconComponent";

const CartButtonInHorisontalItem = dynamic(() => import('@/app/(selection)/_components/page/param/CartButtonInHorisontalItem'), {ssr: false});

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
export default function HorisontalItem({item}) {

    const {getSelectedCity} = useStore()

    const {addCart, removeFromCart, hasProductInCart, getCityQueryParam} = useStore()
    const [popUpp, setPoUpp] = useState({visible: false})
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

        //ЕСЛИ есть точки выдачи для данного города
        //ТО выводим текст где забрать
        //ИНАЧЕ выводим текст, что их нет
        if (item.price_stock_and_delivery.is_delivery_points_exists_current_city) {
            return deliveryPointsExists(item)
        } else {
            return deliveryPointsNotExists(item)
        }
    }

    const htmContentDeliveryForPopUpp = () => {

        //ЕСЛИ выбранный город Челябинск
        //ТО выводим информацию для центральных складов
        if (getSelectedCity().name === 'Челябинск') {
            return deliveryMainCity()
        }

        //ЕСЛИ нет точек выдачи для данного города
        //ТО выводим текст, что не доставляем по городу заказ, только транспортной коомпанией
        //ИНАЧЕ выводим текст, что доставляем
        if (item.price_stock_and_delivery.is_delivery_points_exists_current_city) {
            return deliveryCityExistPoints(getSelectedCity().name)
        } else {
            return deliveryCityNotExistPoints(getSelectedCity().name)
        }
    }

    /**
     * Получить параметры изображения в зависимости от размера экрана
     */
    const getWidthImage = () => {
        if (window.screen.width <= 596) {
            return 238
        }

        return 172
    }

    const badgeStyle = {
        borderRadius: '5px',
        padding: '0 5px',
        cursor: 'pointer',
        display: 'initial',
        background: '#f5f5f5',
        color: '#383838',
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

        {popUpp.visible &&
            <PopUpComponent title={popUpp.title}
                            content={() => popUpp.content}
                            handleOnClose={() => setPoUpp({visible: false})}
            />}

        <div className="catalog-product">
            <div className="catalog-product-image">
                <div className="catalog-product-image-panel">
                    <SeasonIconComponent seasonName={item.season?.name}/>
                    <PromotionIconComponent promotions={item.promotions} size="1.6rem" />
                </div>
                <div>
                    <Image
                        src={item.main_image.url}
                        width={getWidthImage()}
                        height={getWidthImage()}
                        alt={item.name}
                        unoptimized
                        style={{
                            width: window.screen.width <= 596 ? 'auto' : getWidthImage() + 'px',
                            height: window.screen.width <= 596 ? 'auto' : getWidthImage() + 'px',
                        }}
                    />
                </div>
                {item.euro_label !== undefined &&
                    item.euro_label.length > 0 && (
                        <div>
                            <EuroLabel euroLabel={item.euro_label}/>
                        </div>
                    )
                }
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
                        <p className="country">Производитель:&nbsp;
                            <Badge onClick={() => setPoUpp({
                                visible: true,
                                title: "Информация о производителе",
                                content: item.vendor.description?.[1] ?? ''
                            })} style={badgeStyle}
                                   value={(item.vendor.description?.[0] ?? '') + ' >'}
                                   severity="secondary">
                            </Badge>
                        </p>
                        <p className="country">Страна производства:&nbsp;
                            <Badge onClick={() => setPoUpp({
                                visible: true,
                                title: "Страна производства шин",
                                content: item.manufacture_country?.[1] ?? null
                            })}
                                   style={badgeStyle}
                                   value={(item.manufacture_country?.[0] ?? '') + ' >'}
                                   severity="secondary">
                            </Badge>
                        </p>
                        <p className="country">Год выпуска: &nbsp;
                            <Badge onClick={() => setPoUpp({
                                visible: true,
                                title: "Год выпуска шин",
                                content: item.manufacture_year?.[1]
                            })}
                                   style={badgeStyle}
                                   value={(item.manufacture_year?.[0] ?? '') + ' >'}
                                   severity="secondary">
                            </Badge>
                        </p>
                    </div>

                    <div className="merge-block">
                        <div className="catalog-product-flex-item catalog-product-location-info">
                            <LocationComponent/>
                            {/*<p className="payment">Оплата при получении</p>*/}

                            <p className="pickup">Самовывоз &nbsp;
                                <Badge onClick={() => setIsPopUppDeliveryPointsVisible(true)}
                                       style={badgeStyle}
                                       value={item.price_stock_and_delivery.people_name_delivery_days + ' >'}
                                >
                                </Badge>
                            </p>
                            <p className="free-shipping">Доставка до ПВЗ &nbsp;
                                <Badge onClick={() => setIsPopUppDeliveryVisible(true)}
                                       style={badgeStyle}
                                       value={item.price_stock_and_delivery.people_name_delivery_cost + ' >'}
                                       severity="secondary">
                                </Badge>
                            </p>
                        </div>
                        {window.screen.width > 599 && (
                            <div className="catalog-product-flex-item catalog-product-purchase-actions">
                                <CartButtonInHorisontalItem
                                    item={item}
                                    add={handleAddCart}
                                    remove={handleRemoveFromCart}/>
                                <p className="availability">Наличие {item.price_stock_and_delivery.count} шт.</p>
                                <div style={{'margin': '10px 0'}}></div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </>)
}