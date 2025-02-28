import LocationComponent from "@/components/ui/LocationComponent";
import Image from 'next/image';
import { useStore } from "@/store/useStore";
import Link from "next/link";


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
export default function HorisontalItem({ type, item }) {
    const { addCart, removeFromCart, hasProductInCart } = useStore()

    const handleAddCart = () => {
        addCart({
            product_article: item.product_article,
            name: item.name,
            count: 4,
            image: item.main_image.path
        })
    }

    return (<>
        <div className="catalog-product">
            <div className="catalog-product-image">
                <div className="catalog-product-image-panel">
                    {type === "TIRES" && (item.season.name == 'летняя' || item.season.name == 'всесезонная') && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"
                            fill="none">
                            <path
                                d="M12.5 19.3182C13.8485 19.3182 15.1667 18.9183 16.288 18.1691C17.4092 17.4199 18.2831 16.3551 18.7992 15.1092C19.3152 13.8633 19.4503 12.4924 19.1872 11.1698C18.9241 9.84724 18.2747 8.63236 17.3212 7.67882C16.3676 6.72528 15.1528 6.07591 13.8302 5.81283C12.5076 5.54975 11.1367 5.68477 9.89079 6.20082C8.64493 6.71687 7.58008 7.59078 6.83089 8.71202C6.0817 9.83327 5.68182 11.1515 5.68182 12.5C5.68362 14.3077 6.40254 16.0409 7.68081 17.3192C8.95908 18.5975 10.6923 19.3164 12.5 19.3182ZM12.5 7.95455C13.399 7.95455 14.2778 8.22113 15.0253 8.72059C15.7728 9.22005 16.3554 9.92996 16.6995 10.7605C17.0435 11.5911 17.1335 12.505 16.9581 13.3868C16.7827 14.2685 16.3498 15.0784 15.7141 15.7141C15.0784 16.3498 14.2685 16.7827 13.3868 16.9581C12.505 17.1335 11.5911 17.0435 10.7605 16.6995C9.92996 16.3554 9.22005 15.7728 8.72059 15.0253C8.22113 14.2778 7.95455 13.399 7.95455 12.5C7.95455 11.2945 8.43344 10.1383 9.28588 9.28588C10.1383 8.43344 11.2945 7.95455 12.5 7.95455ZM11.3636 2.27273V1.13636C11.3636 0.834981 11.4834 0.545943 11.6965 0.332833C11.9096 0.119724 12.1986 0 12.5 0C12.8014 0 13.0904 0.119724 13.3035 0.332833C13.5166 0.545943 13.6364 0.834981 13.6364 1.13636V2.27273C13.6364 2.57411 13.5166 2.86315 13.3035 3.07626C13.0904 3.28937 12.8014 3.40909 12.5 3.40909C12.1986 3.40909 11.9096 3.28937 11.6965 3.07626C11.4834 2.86315 11.3636 2.57411 11.3636 2.27273ZM12.5 21.5909C12.8014 21.5909 13.0904 21.7106 13.3035 21.9237C13.5166 22.1369 13.6364 22.4259 13.6364 22.7273V23.8636C13.6364 24.165 13.5166 24.4541 13.3035 24.6672C13.0904 24.8803 12.8014 25 12.5 25C12.1986 25 11.9096 24.8803 11.6965 24.6672C11.4834 24.4541 11.3636 24.165 11.3636 23.8636V22.7273C11.3636 22.4259 11.4834 22.1369 11.6965 21.9237C11.9096 21.7106 12.1986 21.5909 12.5 21.5909ZM18.9284 6.07159C18.7154 5.85849 18.5957 5.5695 18.5957 5.26818C18.5957 4.96686 18.7154 4.67787 18.9284 4.46477L19.7318 3.66136C19.9461 3.45437 20.2332 3.33983 20.5311 3.34242C20.8291 3.345 21.1141 3.46451 21.3248 3.67521C21.5355 3.8859 21.655 4.17091 21.6576 4.46886C21.6602 4.76681 21.5456 5.05386 21.3386 5.26818L20.5352 6.07159C20.3221 6.28463 20.0331 6.4043 19.7318 6.4043C19.4305 6.4043 19.1415 6.28463 18.9284 6.07159ZM6.07159 18.9284C6.28463 19.1415 6.4043 19.4305 6.4043 19.7318C6.4043 20.0331 6.28463 20.3221 6.07159 20.5352L5.26818 21.3386C5.05386 21.5456 4.76681 21.6602 4.46886 21.6576C4.17091 21.655 3.8859 21.5355 3.67521 21.3248C3.46451 21.1141 3.345 20.8291 3.34242 20.5311C3.33983 20.2332 3.45437 19.9461 3.66136 19.7318L4.46477 18.9284C4.67787 18.7154 4.96686 18.5957 5.26818 18.5957C5.5695 18.5957 5.85849 18.7154 6.07159 18.9284ZM25 12.5C25 12.8014 24.8803 13.0904 24.6672 13.3035C24.4541 13.5166 24.165 13.6364 23.8636 13.6364H22.7273C22.4259 13.6364 22.1369 13.5166 21.9237 13.3035C21.7106 13.0904 21.5909 12.8014 21.5909 12.5C21.5909 12.1986 21.7106 11.9096 21.9237 11.6965C22.1369 11.4834 22.4259 11.3636 22.7273 11.3636H23.8636C24.165 11.3636 24.4541 11.4834 24.6672 11.6965C24.8803 11.9096 25 12.1986 25 12.5ZM0 12.5C0 12.1986 0.119724 11.9096 0.332833 11.6965C0.545943 11.4834 0.834981 11.3636 1.13636 11.3636H2.27273C2.57411 11.3636 2.86315 11.4834 3.07626 11.6965C3.28937 11.9096 3.40909 12.1986 3.40909 12.5C3.40909 12.8014 3.28937 13.0904 3.07626 13.3035C2.86315 13.5166 2.57411 13.6364 2.27273 13.6364H1.13636C0.834981 13.6364 0.545943 13.5166 0.332833 13.3035C0.119724 13.0904 0 12.8014 0 12.5ZM20.5352 18.9284L21.3386 19.7318C21.4472 19.8366 21.5337 19.962 21.5933 20.1007C21.6529 20.2393 21.6842 20.3884 21.6855 20.5393C21.6868 20.6902 21.6581 20.8398 21.6009 20.9795C21.5438 21.1191 21.4594 21.246 21.3527 21.3527C21.246 21.4594 21.1191 21.5438 20.9795 21.6009C20.8398 21.6581 20.6902 21.6868 20.5393 21.6855C20.3884 21.6842 20.2393 21.6529 20.1007 21.5933C19.962 21.5337 19.8366 21.4472 19.7318 21.3386L18.9284 20.5352C18.7214 20.3209 18.6069 20.0339 18.6095 19.7359C18.612 19.438 18.7316 19.1529 18.9423 18.9423C19.1529 18.7316 19.438 18.612 19.7359 18.6095C20.0339 18.6069 20.3209 18.7214 20.5352 18.9284ZM3.66136 5.26818C3.45437 5.05386 3.33983 4.76681 3.34242 4.46886C3.345 4.17091 3.46451 3.8859 3.67521 3.67521C3.8859 3.46451 4.17091 3.345 4.46886 3.34242C4.76681 3.33983 5.05386 3.45437 5.26818 3.66136L6.07159 4.46477C6.18013 4.5696 6.2667 4.69499 6.32625 4.83363C6.38581 4.97227 6.41716 5.12139 6.41847 5.27227C6.41978 5.42316 6.39103 5.57279 6.33389 5.71245C6.27675 5.8521 6.19237 5.97898 6.08568 6.08568C5.97898 6.19237 5.8521 6.27675 5.71245 6.33389C5.57279 6.39103 5.42316 6.41978 5.27227 6.41847C5.12139 6.41716 4.97227 6.38581 4.83363 6.32625C4.69499 6.2667 4.5696 6.18013 4.46477 6.07159L3.66136 5.26818Z"
                                fill="#FFC10A"
                            />
                        </svg>
                    )}
                    {type === "TIRES" && (item.season.name == 'зимняя' || item.season.name == 'всесезонная') && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"
                            fill="none">
                            <path
                                d="M25 12.5C25 12.8014 24.8803 13.0904 24.6672 13.3035C24.4541 13.5166 24.165 13.6364 23.8636 13.6364H19.7886L22.3943 16.242C22.6013 16.4564 22.7159 16.7434 22.7133 17.0414C22.7107 17.3393 22.5912 17.6243 22.3805 17.835C22.1698 18.0457 21.8848 18.1652 21.5868 18.1678C21.2889 18.1704 21.0018 18.0559 20.7875 17.8489L16.575 13.6364H13.6364V16.575L17.8489 20.7875C18.0559 21.0018 18.1704 21.2889 18.1678 21.5868C18.1652 21.8848 18.0457 22.1698 17.835 22.3805C17.6243 22.5912 17.3393 22.7107 17.0414 22.7133C16.7434 22.7159 16.4564 22.6013 16.242 22.3943L13.6364 19.7886V23.8636C13.6364 24.165 13.5166 24.4541 13.3035 24.6672C13.0904 24.8803 12.8014 25 12.5 25C12.1986 25 11.9096 24.8803 11.6965 24.6672C11.4834 24.4541 11.3636 24.165 11.3636 23.8636V19.7886L8.75795 22.3943C8.65313 22.5029 8.52774 22.5894 8.3891 22.649C8.25045 22.7085 8.10134 22.7399 7.95046 22.7412C7.79957 22.7425 7.64993 22.7138 7.51028 22.6566C7.37062 22.5995 7.24375 22.5151 7.13705 22.4084C7.03035 22.3017 6.94598 22.1748 6.88884 22.0352C6.8317 21.8955 6.80295 21.7459 6.80426 21.595C6.80557 21.4441 6.83692 21.295 6.89648 21.1564C6.95603 21.0177 7.0426 20.8923 7.15114 20.7875L11.3636 16.575V13.6364H8.425L4.2125 17.8489C3.99818 18.0559 3.71113 18.1704 3.41318 18.1678C3.11523 18.1652 2.83022 18.0457 2.61952 17.835C2.40883 17.6243 2.28932 17.3393 2.28673 17.0414C2.28414 16.7434 2.39868 16.4564 2.60568 16.242L5.21136 13.6364H1.13636C0.834981 13.6364 0.545943 13.5166 0.332833 13.3035C0.119724 13.0904 0 12.8014 0 12.5C0 12.1986 0.119724 11.9096 0.332833 11.6965C0.545943 11.4834 0.834981 11.3636 1.13636 11.3636H5.21136L2.60568 8.75795C2.49715 8.65313 2.41058 8.52774 2.35102 8.3891C2.29147 8.25045 2.26012 8.10134 2.25881 7.95046C2.2575 7.79957 2.28625 7.64993 2.34338 7.51028C2.40052 7.37062 2.4849 7.24375 2.5916 7.13705C2.69829 7.03035 2.82517 6.94598 2.96482 6.88884C3.10448 6.8317 3.25412 6.80295 3.405 6.80426C3.55589 6.80557 3.705 6.83692 3.84364 6.89648C3.98228 6.95603 4.10767 7.0426 4.2125 7.15114L8.425 11.3636H11.3636V8.425L7.15114 4.2125C7.0426 4.10767 6.95603 3.98228 6.89648 3.84364C6.83692 3.705 6.80557 3.55589 6.80426 3.405C6.80295 3.25412 6.8317 3.10448 6.88884 2.96482C6.94598 2.82517 7.03035 2.69829 7.13705 2.5916C7.24375 2.4849 7.37062 2.40052 7.51028 2.34338C7.64993 2.28625 7.79957 2.2575 7.95046 2.25881C8.10134 2.26012 8.25045 2.29147 8.3891 2.35102C8.52774 2.41058 8.65313 2.49715 8.75795 2.60568L11.3636 5.21136V1.13636C11.3636 0.834981 11.4834 0.545943 11.6965 0.332833C11.9096 0.119724 12.1986 0 12.5 0C12.8014 0 13.0904 0.119724 13.3035 0.332833C13.5166 0.545943 13.6364 0.834981 13.6364 1.13636V5.21136L16.242 2.60568C16.3469 2.49715 16.4723 2.41058 16.6109 2.35102C16.7495 2.29147 16.8987 2.26012 17.0495 2.25881C17.2004 2.2575 17.3501 2.28625 17.4897 2.34338C17.6294 2.40052 17.7563 2.4849 17.8629 2.5916C17.9696 2.69829 18.054 2.82517 18.1112 2.96482C18.1683 3.10448 18.1971 3.25412 18.1957 3.405C18.1944 3.55589 18.1631 3.705 18.1035 3.84364C18.044 3.98228 17.9574 4.10767 17.8489 4.2125L13.6364 8.425V11.3636H16.575L20.7875 7.15114C20.8923 7.0426 21.0177 6.95603 21.1564 6.89648C21.295 6.83692 21.4441 6.80557 21.595 6.80426C21.7459 6.80295 21.8955 6.8317 22.0352 6.88884C22.1748 6.94598 22.3017 7.03035 22.4084 7.13705C22.5151 7.24375 22.5995 7.37062 22.6566 7.51028C22.7138 7.64993 22.7425 7.79957 22.7412 7.95046C22.7399 8.10134 22.7085 8.25045 22.649 8.3891C22.5894 8.52774 22.5029 8.65313 22.3943 8.75795L19.7886 11.3636H23.8636C24.165 11.3636 24.4541 11.4834 24.6672 11.6965C24.8803 11.9096 25 12.1986 25 12.5Z"
                                fill="#3059A8"
                            />
                        </svg>
                    )}
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
                        <Link href={item.url}>
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
                        <p className="country">Страна произв.: Россия</p>
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
                            <p className="pickup">Самовывоз <span className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_days}</span></p>
                            <p className="free-shipping">Доставка <span className="highlight-text">{item.price_stock_and_delivery.people_name_delivery_cost}</span></p>
                        </div>
                        <div className="catalog-product-flex-item catalog-product-purchase-actions">
                            {hasProductInCart(item.product_article)
                                ? (<button className="buy-now" onClick={() => removeFromCart(item.product_article)}
                                    style={{ 'background': 'gray' }}>
                                    <p>Удалить</p>
                                    <img src="/assets/img/bag.svg" alt="" />
                                </button>)
                                : (<button className="buy-now" onClick={handleAddCart}>
                                    <p>Купить</p>
                                    <img src="/assets/img/bag.svg" alt="" />
                                </button>)
                            }


                            <p className="availability">Наличие {item.price_stock_and_delivery.count} шт.</p>
                            <div style={{ 'margin': '10px 0' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}