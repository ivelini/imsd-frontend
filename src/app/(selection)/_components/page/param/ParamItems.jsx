import HorisontalItem from "./HorisontalItem";

export default function ParamItems({type, items}) {
    return (<>
        {items.map((item, index) => <HorisontalItem key={index} type={type} item={item} />)}
    </>)
}