import GroupSpecificationItems from "./GroupSpecificationItems"

export default function SpecifiactionItems({ type, itemsVehicle }) {
    return (<>
        {itemsVehicle.default?.length > 0 && <GroupSpecificationItems title="Рекомендованная производителем" items={itemsVehicle.default} />}
        {itemsVehicle.alternative?.length > 0 && <GroupSpecificationItems title="Альтернатива" items={itemsVehicle.alternative} />}
        {itemsVehicle.tuning?.length > 0 && <GroupSpecificationItems title="Тюнинг" items={itemsVehicle.tuning} />}
    </>)
}