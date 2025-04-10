import {Dialog} from 'primereact/dialog';
import Link from "next/link";

/**
 *
 * @param {Object} item
 * @param {string} item.name
 * @param {number} item.count
 * @param {number} item.price
 * @param {string} item.image
 * @param handleOnClose
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductInCartSuccessComponent({item, handleOnClose}) {
    return (<>
        <Dialog
            visible
            modal
            onHide={() => handleOnClose()}
            header={(<div className="cart_popup_title">Товар успешно добавлен в корзину</div>)}
            maskStyle={{'background': 'rgba(0, 0, 0, 0.7)', 'animation': 'none'}}

        >
            <div className="cart_popup" id="cart_popup" style={{'display': 'inline-block'}}>

                <div className="cart_popup_item">
                    <div className="cart_popup_item_img">
                        <img src={item.image} alt=""/>
                    </div>
                    <div className="cart_popup_item_info">
                        <div className="cart_popup_item_info_title">{item.name}</div>
                        <div className="cart_popup_item_info_single">1 шт.
                            - <span>{item.price.toLocaleString()} ₽</span></div>

                    </div>

                    <div className="cart_popup_item_quantity">
                        <div className="cart_popup_item_quantity_in">

                            <div className="cart_popup_item_quantity_number"><span>{item.count}</span></div>
                        </div>
                    </div>
                    <div className="cart_popup_item_total">{(item.price * item.count).toLocaleString()} ₽</div>
                </div>
                <div className="cart_popup_btns">
                    <a className="cart_popup_btn cart_popup_btn_close" onClick={handleOnClose}>Продолжить покупки</a>
                    <Link href="/cart" className="cart_popup_btn cart_popup_btn_cart">Перейти в корзину</Link>

                </div>
            </div>
        </Dialog>

    </>)
}