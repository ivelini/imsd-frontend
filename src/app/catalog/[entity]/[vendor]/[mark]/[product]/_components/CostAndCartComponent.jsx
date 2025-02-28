export default function CostAndCartComponent({children}) {
    return (<>
        <div className="options">
            <select id="quantity-select" className="quantity-select">
                <option className="quantity-select-option" value="4">129 999 ₽ - 4 шт.</option>
                <option className="quantity-select-option" value="8">259 999 ₽ - 8 шт.</option>
            </select>
        </div>

        {children}

        <button className="add-to-cart-button primary-button">Добавить в корзину</button>
    </>)
}