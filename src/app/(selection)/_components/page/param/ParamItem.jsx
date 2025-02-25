import HorisontalItem from "./HorisontalItem";

export default function ParamItem({items}) {
    return (<>
        {items.map((item, index) => <HorisontalItem key={index} item={item} />)}
    </>)
}