/**
 *
 * @param {array} euroLabel
 */
export default function EuroLabel({ euroLabel }) {

    console.log(euroLabel)
    return (<>
        <div className="eu-label">
            <i className={"rolling-resistance category-" + euroLabel[0]}>{euroLabel[0]}</i>
            <i className={"wet-grip category-" + euroLabel[1]}>{euroLabel[1]}</i>
            <i className={"noise-emission noise-emission"}>{euroLabel[2]}</i>
        </div>
    </>)
}