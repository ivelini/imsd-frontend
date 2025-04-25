"use client"
import {useStore} from "@/store/useStore"
import {useEffect, useState} from "react"
import ProductInCartSuccessComponent from "@/components/ui/ProductInCartSuccessComponent";
import { Skeleton } from 'primereact/skeleton';

export default function CostAndCartComponent({children, item}) {
    const {useStoreIsReady, hasProductInCart, getProductFromCart, addCart, removeFromCart} = useStore()
    const [count, setCount] = useState(getProductFromCart(item.product_article)?.count ?? 4)
    const [isPopUppVisible, setIsPoUppVisible] = useState(false)
    const [storeIsReady, setStoreIsReady] = useState(false)

    useEffect(() => {

        if(useStoreIsReady) {
            setStoreIsReady(true)
        }
    }, [useStoreIsReady]);

    const handleAddProduct = () => {
        addCart({
            product_type: item.product_type,
            id: item.id,
            product_article: item.product_article,
            name: item.name,
            count,
            stock_count: item.price_stock_and_delivery.count,
            image: item.main_image.url,
            slug: item.slug,
            url: item.url,
            price: item.price_stock_and_delivery.price,
        })

        setIsPoUppVisible(true)
    }

    const handleRemoveProduct = () => {
        removeFromCart(item.product_article)
    }

    if (!storeIsReady) {
        return (<>
            <div className="options">
                <Skeleton></Skeleton>
            </div>
            {children}
            <Skeleton></Skeleton>
        </>)
    }

    let countSelectElements = [1,2,3,4]
    if(count > 4) {
        countSelectElements = []
        for(let i = 1; i <= count; i++) {
            countSelectElements.push(i)
        }
    }

    return (<>
        {isPopUppVisible && <ProductInCartSuccessComponent item={{
            name: item.name,
            count: count,
            price: item.price_stock_and_delivery.price,
            image: item.main_image.url,
        }} handleOnClose={() => setIsPoUppVisible(false)}/>}

        <div className="options">
            <select id="quantity-select"
                    disabled={hasProductInCart(item.product_article)}
                    className="quantity-select"
                    style={hasProductInCart(item.product_article) ? {'backgroundColor': '#D8D8D8'} : {}}
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
            >
                {countSelectElements.map((count, index) =>
                    <option key={index}
                            className="quantity-select-option"
                            value={count}>
                        {(item.price_stock_and_delivery.price * count).toLocaleString("ru-RU")} ₽ - {count} шт.
                    </option>
                )}
            </select>
        </div>

        {children}

        {!hasProductInCart(item.product_article)
            ?
            <button className="add-to-cart-button primary-button" onClick={handleAddProduct}>Добавить в корзину</button>
            : <button className="add-to-cart-button primary-button"
                      style={{'backgroundColor': '#D8D8D8', 'color': '#444444'}}
                      onClick={handleRemoveProduct}
            >Убрать из корзины</button>
        }
    </>)
}