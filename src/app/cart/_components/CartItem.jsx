"use client"
export default function CartItem({item}) {
    return (<>
        <div className="cart_item">
            <div className="cart_item_img">
                <img src="assets/img/wheel-product.png" alt=""/>
            </div>
            <div className="cart_item_info">
                <div className="cart_item_info_title">Шина Viatti V-130 Strada Asimmetrico 185/60 R15 84H летняя</div>
                <div className="cart_item_info_more">
                    <div className="cart_item_info_code">Код товара: <span>АА-00075632</span></div>
                    <div className="cart_item_info_av">Наличие <span>&gt;12 шт.</span></div>
                </div>
                <div className="cart_item_info_price"><span>29 999</span> ₽</div>
            </div>

            <div className="cart_item_quantity">
                <div className="cart_item_quantity_in">
                    <div className="cart_item_quantity_btn"><img src="assets/img/cart_minus.svg" alt=""/></div>
                    <div className="cart_item_quantity_number"><span>4</span></div>
                    <div className="cart_item_quantity_btn"><img src="assets/img/cart_plus.svg" alt=""/></div>
                </div>
            </div>
            <div className="cart_item_total">
                <div className="cart_item_total_price">29 999 ₽</div>
                <div className="cart_item_total_delete">Удалить <img src="assets/img/cart_delete.svg" alt=""/></div>
            </div>
        </div>
    </>)
}