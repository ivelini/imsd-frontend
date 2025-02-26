import HorisontalItem from "./HorisontalItem";

export default function ParamItem({type, items}) {
    return (<>
        {items.map((item, index) => <HorisontalItem key={index} type={type} item={item} />)}
    </>)
}