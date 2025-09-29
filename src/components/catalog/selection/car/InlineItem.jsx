import { TypeProductEnum } from "@/lib/TypeProductEnum";
import HorisontalItem from "../param/HorisontalItem";

export default function InlineItems({ itemsGroup }) {

    return (<>
        <h2 className="catalog-product-title">{itemsGroup.specification}</h2>
        {itemsGroup.tires !== undefined && itemsGroup.tires.map((item) => <HorisontalItem key={item.id} item={item} />)}
        {itemsGroup.disks !== undefined && itemsGroup.disks.map((item) => <HorisontalItem key={item.id} item={item} />)}
    </>)
}
