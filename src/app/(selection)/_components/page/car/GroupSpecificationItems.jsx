import GroupItems from "./GroupItems"
import InlineItems from "./InlineItem"

export default function GroupSpecificationItems({ title, items }) {
    console.log(items)
    return (<>
        <div>{title}</div>
        {items
            .sort(function (itemsGroupA, itemsGroupB) {
                return itemsGroupA.specification_id - itemsGroupB.specification_id
            })
            .map(function (itemsGroup, index) {
                return (<>
                    {Boolean(itemsGroup.is_grouping) === true ?
                        <GroupItems key={index} groupingItemsGroup={itemsGroup} /> :
                        <InlineItems key={index} itemsGroup={itemsGroup} />}
                </>)
            })}
    </>)
}