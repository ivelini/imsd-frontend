import { useStore } from "@/store/useStore"
import { TypeProductEnum } from "@/lib/TypeProductEnum"

export default function SpecificationsContent({ type, specifications }) {
    const { getVehicleIds, setVehicleIdsFilterTires, setVehicleIdsFilterWheels } = useStore()

    const handleChecked = (isChecked, vehicleId) => {
        const setEntity = type === TypeProductEnum.TIRE
            ? setVehicleIdsFilterTires
            : setVehicleIdsFilterWheels

        if (isChecked) {
            setEntity([...getVehicleIds(type), vehicleId])
        } else {
            setEntity(getVehicleIds(type).filter(elId => elId !== vehicleId))
        }
    }

    function returnHtmlTypeSpecification(typeGroup, title) {
        if (!specifications[typeGroup]?.length) return null;

        return (
            <div>
                <div>{title}</div>
                {specifications[typeGroup].map((el) => (
                    <div key={el.id}>
                        <input
                            type="checkbox"
                            value={el.id}
                            onChange={(e) => handleChecked(e.target.checked, el.id)}
                            checked={getVehicleIds(type).includes(el.id) ?? false}
                        />
                        <span>{el.name}</span>
                    </div>
                ))}
            </div>
        )
    }

    return (<>
        {returnHtmlTypeSpecification('default', 'Рекомендованная')}
        {returnHtmlTypeSpecification('alternative', 'Альтернатива')}
        {returnHtmlTypeSpecification('tuning', 'Тюнинг')}
    </>)
}