import { useStore } from "@/store/useStore"

export default function CountProductsInCart() {
    const { countProductsInCart } = useStore()

    return (<>
       {countProductsInCart() > 0 && <span id="count-in-busket">{countProductsInCart()}</span>}
    </>)
}