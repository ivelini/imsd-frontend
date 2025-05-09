import GroupItems from "./GroupItems"
import InlineItems from "./InlineItem"

export default function GroupSpecificationItems({ title, items }) {
    return (<>
        <div>{title}</div>
        {items
            .sort(function (itemsGroupA, itemsGroupB) {
                return itemsGroupA.specification_id - itemsGroupB.specification_id
            })
            .map(function (itemsGroup, index) {

                if(Boolean(itemsGroup.is_grouping) === true) {
                    return <GroupItems key={index} groupingItemsGroup={itemsGroup} />
                } else {
                    return <InlineItems key={index} itemsGroup={itemsGroup} />
                }
            })}
    </>)
}