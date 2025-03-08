export default function GroupSpecificationItems({ title, items }) {
    console.log(items)
    return (<>
        <div>{title}</div>
        {items
            .sort(function (itemsGroupA, itemsGroupB) {
                return itemsGroupA.specification_id - itemsGroupB.specification_id
            })
            .map(function (itemsGroup) {
                return (<>
                    {Boolean(itemsGroup.is_grouping) === true ?
                        1 :
                        2}
                </>)
            })}
    </>)
}