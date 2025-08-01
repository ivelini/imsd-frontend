import CostAndCartComponent from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/CostAndCartComponent";
import SeasonIconComponent from "@/components/ui/SeasonIconComponent";
import Image from "next/image";
import GalleryImage from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/Gallery/GalleryImage";
import EuroLabel from "@/app/(selection)/_components/page/param/EuroLabel";

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

    const htmlDeliveryInfo = () => {

        //ЕСЛИ в выбранном городе есть точки выдачи
        if(item.price_stock_and_delivery.is_delivery_points_exists_current_city) {
            return '<div><strong>Самовывоз из ПВЗ по адресу:</strong></div><div> ' + item.price_stock_and_delivery.delivery_points[0].address + '</div>' +
                '<div><strong>Время работы:</strong></div><div>' + Object.keys(item.price_stock_and_delivery.delivery_points[0].work_time)
                    .map((key) => ' ' + key + ': ' + item.price_stock_and_delivery.delivery_points[0].work_time[key])
                    .toString() + '</div>'
        } else {
            return '<div style="color: red; font-size: 16px; font-weight: bold">В вашем городе нет точек самовывоза.</div>' +
                '<div><strong>' + item.price_stock_and_delivery.people_name_delivery_days + ' шины поступят на центральный склад в г. Челябинск</strong>, ' +
                'откуда их можно забрать самостоятельно, либо оформить доставку в Ваш город транспортной компанией.</div>'
        }
    }

    return (<>
        <div className="container product-container">
            <div className="gallery">
                <div className="gallery-panel">
                    <SeasonIconComponent seasonName={item.season?.name} />
                </div>
                <GalleryImage images={[item.main_image]}/>
                <EuroLabel />
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

                                    <span className="payment-details">Самовывоз &nbsp;
                                        <span
                                            className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_days}</span>
                                    </span>

                                    <span className="payment-details">Доставка до ПВЗ&nbsp;
                                        <span
                                            className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_cost}</span>
                                    </span>
                                </div>

                                <div className="payment-option">
                                    <span className="payment-title">Шиномонтаж в подарок</span>
                                    <span className="payment-details">Расширенная гарантия</span>
                                </div>
                            </div>

                            <div className="payment-option" dangerouslySetInnerHTML={{__html:htmlDeliveryInfo()}}></div>
                        </CostAndCartComponent>
                    </div>
                </div>
            </div>
        </div>
    </>)
}