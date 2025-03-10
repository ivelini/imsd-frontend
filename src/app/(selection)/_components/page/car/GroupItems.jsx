import { TypeProductEnum } from "@/lib/TypeProductEnum"
import HorisontalItem from "../param/HorisontalItem"


export default function GroupItems({groupingItemsGroup}) {

    const items = groupingItemsGroup.tires !== undefined
        ? groupingItemsGroup.tires
        : groupingItemsGroup.disks

    const entity = groupingItemsGroup.tires !== undefined
        ? TypeProductEnum.TIRES
        : TypeProductEnum.DISKS

    return (<>
        <h2 className="catalog-product-title">{groupingItemsGroup.specification}</h2>
        {items.map((group) => (<>
            <div className="devider-group-items">
                {group.map((item) => <HorisontalItem key={item.id} entity={entity} item={item}/>)}
            </div>
        </>))}
    </>)
}