"use client"

import {Carousel} from 'primereact/carousel';
import Image from "next/image";
import SeasonIconComponent from "@/components/ui/SeasonIconComponent";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useStore} from "@/store/useStore";
import ProductInCartSuccessComponent from "@/components/ui/ProductInCartSuccessComponent";
import dynamic from "next/dynamic";
import PromotionIconComponent from "@/components/ui/PromotionIconComponent";

const CartButtonInHorisontalItem = dynamic(() => import('@/app/(selection)/_components/page/param/CartButtonInHorisontalItem'), {ssr: false});

/**
 *
 * @param {array} items
 * @returns {JSX.Element}
 * @constructor
 */
export default function CaruselComponent({items}) {
    const [itemAddedToCart, setItemAddedToCart,] = useState({})
    const {addCart, removeFromCart, getCityQueryParam} = useStore()
    const [storeIsReady, setStoreIsReady] = useState(false)

    useEffect(() => {
        if (!getCityQueryParam()) return
        setStoreIsReady(true)
    }, [getCityQueryParam()]);

    const handleAddCart = (item) => {
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

        setItemAddedToCart(item)
    }

    const handleRemoveFromCart = (item) => {
        removeFromCart(item.product_article)
    }


    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 2,
            numScroll: 1
        }
    ];

    /**
     *
     * @param {Object} item
     * @param {number} item.id
     * @param {string} item.slug
     * @param {string} item.product_article
     * @param {string} item.name
     * @param {boolean|null} item.is_spike
     * @param {string} item.product_type
     * @param {Object} item.vendor
     * @param {string} item.vendor.slug
     * @param {Object} item.mark
     * @param {string} item.mark.slug
     * @param {Object} item.price_stock_and_delivery
     * @param {number} item.price_stock_and_delivery.price
     * @param {number} item.price_stock_and_delivery.count
     * @param {string} item.price_stock_and_delivery.people_name_price
     * @param {string} item.price_stock_and_delivery.people_name_price_percent_higher
     * @param {string} item.url
     * @param {Object} item.main_image
     * @param {string} item.main_image.url
     * @param {Object|null} item.season
     * @param {string|null} item.season.name
     * @returns {JSX.Element}
     */
    const productTemplate = (item) => {
        return (<>
            <div className="section-product">
                <div className="product-photo-blk">
                    <Image
                        src={item.main_image.url}
                        alt={item.name}
                        width={142}
                        height={142}
                        unoptimized
                    />
                </div>
                <h3 className="product-title">
                    <Link href={{
                        pathname: `\/catalog\/${item.product_type}\/${item.vendor.slug}\/${item.mark.slug}\/${item.slug}`,
                        query: getCityQueryParam()
                    }}>
                        {item.name}
                    </Link>
                </h3>
                <div className="product-details">
                    <div className="icons">
                        {item.season?.name !== null && <SeasonIconComponent seasonName={item.season?.name}/>}
                        <PromotionIconComponent promotions={item.promotions} size="1rem" margin="none"/>

                        {item.is_spike === true && <Image
                            src="/assets/img/sh.svg"
                            alt={item.name}
                            width={25}
                            height={25}
                            unoptimized
                        />}
                    </div>
                </div>
                <div className="price-info">
                    <span className="current-price">{item.price_stock_and_delivery.people_name_price} ₽</span>
                    <span
                        className="old-price">{item.price_stock_and_delivery.people_name_price_percent_higher} ₽</span>
                </div>
                <div className="buy-button-blk">
                    <CartButtonInHorisontalItem
                        item={item}
                        add={() => handleAddCart(item)}
                        remove={() => handleRemoveFromCart(item)}
                    />
                </div>
            </div>
        </>)
    }

    return (<>
        {Object.keys(itemAddedToCart).length > 0 && <ProductInCartSuccessComponent item={{
            name: itemAddedToCart.name,
            count: 4,
            price: itemAddedToCart.price_stock_and_delivery.price,
            image: itemAddedToCart.main_image.url,

        }} handleOnClose={() => setItemAddedToCart({})}/>}

        {storeIsReady && <Carousel
            value={items}
            numVisible={5}
            numScroll={1}
            circular
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
            showIndicators={false}
            className="product-list responsive"

        />}
    </>)
}