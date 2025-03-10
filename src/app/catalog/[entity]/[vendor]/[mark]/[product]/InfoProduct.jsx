import CostAndCartComponent from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/CostAndCartComponent";
import SeasonIconComponent from "@/components/ui/SeasonIconComponent";
import Image from "next/image";
import GalleryImage from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/Gallery/GalleryImage";

/**
 *
 * @param {Object} item
 * @param {number} item.id
 * @param {string} item.name
 * @param {string} item.product_article
 * @param {string} item.product_id
 * @param {string} item.season.name
 * @param {string} item.main_image.url
 * @param {string} item.slug
 * @param {array} item.parameters_to_front
 * @param {number} item.width
 * @param {number} item.height
 * @param {string} item.diameter
 * @param {boolean} item.is_spike
 * @param {boolean} item.is_runflat
 * @param {string} item.url
 * @param {Object} item.price_stock_and_delivery
 * @param {number} item.price_stock_and_delivery.count
 * @param {number} item.price_stock_and_delivery.delivery_days
 * @param {string} item.price_stock_and_delivery.people_name_delivery_cost
 * @param {string} item.price_stock_and_delivery.people_name_delivery_days
 * @param {string} item.price_stock_and_delivery.people_name_price
 * @param {string} item.price_stock_and_delivery.people_name_price_percent_higher
 *
 */
export default function InfoProduct({ item }) {

    return (<>
        <div className="container product-container">
            <div className="gallery">
                <div className="gallery-panel">
                    <SeasonIconComponent seasonName={item.season?.name} />
                </div>
                <GalleryImage images={[item.main_image]}/>
            </div>
            <div className="details">
                <h1 className="details-name">{item.name}</h1>

                <div className="product-info">
                    <div className="product-parameters">
                        <h2>Параметры</h2>
                        <ul className="parameters-list">

                            {Object.keys(item.parameters_to_front).map((key, index) => (<>
                                <li key={index} className="parameter-item">
                                    <span className="parameter-name">{key}:</span>
                                    <span className="parameter-value">{item.parameters_to_front[key]}</span>
                                </li>
                            </>))}
                        </ul>
                    </div>

                    <div className="price-payment-shipping">
                        <div className="price-info">
                            <span className="current-price">{item.price_stock_and_delivery.people_name_price} ₽</span>
                            <span className="old-price">{item.price_stock_and_delivery.people_name_price_percent_higher} ₽</span>
                        </div>

                        <CostAndCartComponent item={item}>

                            <div className="payment-info">
                                <div className="payment-option">
                                    <span className="payment-title">Оплата при получении</span>
                                    <span
                                        className="payment-details">Наличие {item.price_stock_and_delivery.count} шт.</span>
                                    <span className="payment-details">Самовывоз <span
                                        className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_days}</span></span>
                                    <span className="payment-details">Доставка <span
                                        className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_cost}</span></span>
                                </div>

                                <div className="payment-option">
                                    <span className="payment-title">Шиномонтаж в подарок</span>
                                    <span className="payment-details">Расширенная гарантия</span>
                                </div>
                            </div>

                        </CostAndCartComponent>

                    </div>
                </div>
            </div>
        </div>
    </>)
}