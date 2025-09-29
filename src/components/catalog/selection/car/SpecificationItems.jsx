import GroupSpecificationItems from "./GroupSpecificationItems"

export default function SpecifiactionItems({ type, itemsVehicle }) {
    return (<>
        {itemsVehicle.default?.length > 0 && <GroupSpecificationItems key={1} title="Рекомендованная производителем" items={itemsVehicle.default} />}
        {itemsVehicle.alternative?.length > 0 && <GroupSpecificationItems key={2} title="Альтернатива" items={itemsVehicle.alternative} />}
        {itemsVehicle.tuning?.length > 0 && <GroupSpecificationItems key={3} title="Тюнинг" items={itemsVehicle.tuning} />}
    </>)
}