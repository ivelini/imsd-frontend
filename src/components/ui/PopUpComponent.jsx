import {Dialog} from 'primereact/dialog';

/**
 *
 * @param handleOnClose
 * @returns {JSX.Element}
 * @constructor
 */
export default function PopUpComponent({title, content, handleOnClose}) {
    return (<>
        <Dialog
            visible
            modal
            onHide={() => handleOnClose()}
            header={(<div className="cart_popup_title">{title}</div>)}
            maskStyle={{'background': 'rgba(0, 0, 0, 0.7)', 'animation': 'none'}}
        >
            <div className="cart_popup" id="cart_popup" style={{'display': 'inline-block'}}>
                <div className="about-company-text" dangerouslySetInnerHTML={{__html: content()}}></div>
            </div>
        </Dialog>
    </>)
}