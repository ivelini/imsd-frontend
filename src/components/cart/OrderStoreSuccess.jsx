import { Dialog } from 'primereact/dialog';
export default function OrderStoreSuccess({handleOnClick}) {
    return (<>
        <Dialog
            visible
            modal
            onHide={handleOnClick}
            header={(<div className="cart_popup_title">Ваш заказ отправлен</div>)}
            maskStyle={{'background': 'rgba(0, 0, 0, 0.7)', 'animation': 'none'}}

        >
            <div className="cart_popup" id="cart_popup" style={{'display': 'inline-block'}}>
                <div className="cart_popup_item">
                    Мы свяжемся с вами в ближайшее время
                </div>
                <div className="cart_popup_btns">
                    <a className="cart_popup_btn cart_popup_btn_cart" onClick={handleOnClick}>Ок</a>
                </div>
            </div>
        </Dialog>
    </>)
}