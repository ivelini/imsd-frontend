import {useStore} from "@/store/useStore";

export default function CartButtonInHorisontalItem({item, add, remove}) {
    const {hasProductInCart} = useStore()

    return (<>
        {hasProductInCart(item.product_article)
            ? <button className="buy-now"
                      style={{'backgroundColor': '#D8D8D8'}}
                      onClick={remove}
            >
                <p>Удалить</p>
                <img src="/assets/img/bag.svg" alt=""/>
            </button>
            : <button className="buy-now" onClick={add}>
                <p>Купить</p>
                <img src="/assets/img/bag.svg" alt=""/>
            </button>
        }
    </>)
}