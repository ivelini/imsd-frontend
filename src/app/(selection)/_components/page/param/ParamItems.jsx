import HorisontalItem from "./HorisontalItem";

export default function ParamItems({items}) {
    return (<>
        {items.map((item, index) => <HorisontalItem key={index} item={item}/>)}
    </>)
}