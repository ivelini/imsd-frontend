import CostAndCartComponent from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/CostAndCartComponent";
import SeasonIconComponent from "@/components/ui/SeasonIconComponent";
import GalleryImage from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/Gallery/GalleryImage";
import EuroLabel from "@/app/(selection)/_components/page/param/EuroLabel";
import {deliveryPointsExists, deliveryPointsNotExists} from "@/lib/TextInformation";
import BadgePopUpComponent from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/BadgePopUpComponent";
import PromotionIconComponent from "@/components/ui/PromotionIconComponent";


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
 * @param {string} item.euro_label
 * @param {array} item.promotions
 * @param {Object} item.price_stock_and_delivery
 * @param {number} item.price_stock_and_delivery.count
 * @param {number} item.price_stock_and_delivery.delivery_days
 * @param {string} item.price_stock_and_delivery.people_name_delivery_cost
 * @param {string} item.price_stock_and_delivery.people_name_delivery_days
 * @param {string} item.price_stock_and_delivery.people_name_price
 * @param {string} item.price_stock_and_delivery.people_name_price_percent_higher
 *
 */
export default function InfoProduct({item}) {
    const htmlDeliveryInfo = () => {

        //ЕСЛИ в выбранном городе есть точки выдачи
        if (item.price_stock_and_delivery.is_delivery_points_exists_current_city) {
            return '<div><strong>Самовывоз из ПВЗ по адресу:</strong></div>' + deliveryPointsExists(item, false)
        } else {
            return deliveryPointsNotExists(item)
        }
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
        <div className="container product-container">
            <div className="gallery">
                <div className="gallery-panel">
                    <SeasonIconComponent seasonName={item.season?.name}/>
                    <PromotionIconComponent promotions={item.promotions}/>
                </div>
                <GalleryImage images={[item.main_image]}/>
                {item.euro_label !== undefined &&
                    item.euro_label.length > 0 && (
                        <EuroLabel euroLabel={item.euro_label}/>)
                }
            </div>
            <div className="details">
                <h1 className="details-name">{item.name}</h1>

                <div className="product-info">
                    <div className="product-parameters">
                        <ul className="parameters-list">

                            {Object.keys(item.parameters_to_front).map((key, index) => (
                                <li key={index} className="parameter-item">
                                    <span className="parameter-name">{key}:</span>

                                    {typeof item.parameters_to_front[key] == 'object'
                                        ? <BadgePopUpComponent
                                            title={key}
                                            value={item.parameters_to_front[key][0]}
                                            content={item.parameters_to_front[key][1]}/>
                                        : <span className="parameter-value">{item.parameters_to_front[key]}</span>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="price-payment-shipping">
                        <div className="price-info">
                            <span className="current-price">{item.price_stock_and_delivery.people_name_price} ₽</span>
                            <span
                                className="old-price">{item.price_stock_and_delivery.people_name_price_percent_higher} ₽</span>
                        </div>

                        <CostAndCartComponent item={item}>

                            <div className="payment-info">
                                <div className="payment-option">
                                    <span className="payment-title">Оплата при получении</span>

                                    <span
                                        className="payment-details">Наличие {item.price_stock_and_delivery.count} шт.</span>

                                    <span className="payment-details">Самовывоз &nbsp;
                                        <span
                                            className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_days}</span>
                                    </span>

                                    <span className="payment-details">Доставка до ПВЗ&nbsp;
                                        <span
                                            className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_cost}</span>
                                    </span>
                                </div>

                                {item.promotions.length > 0 &&
                                    <div className="payment-option">
                                        {item.promotions.map(promotion => <BadgePopUpComponent
                                            isInline
                                            title={promotion.name}
                                            value={promotion.name}
                                            content={`<div class="promotion-description">${promotion.description} </br><a target="_blank" href="${promotion.link}">Подробнее</a></div>`}/>
                                        )}
                                    </div>}
                            </div>

                            <div className="payment-option"
                                 dangerouslySetInnerHTML={{__html: htmlDeliveryInfo()}}></div>
                        </CostAndCartComponent>
                    </div>
                </div>
            </div>
        </div>
    </>)
}