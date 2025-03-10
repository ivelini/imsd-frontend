import { useState, useEffect } from "react"
import { useStore } from "@/store/useStore"
import { TypeProductEnum } from "@/lib/TypeProductEnum"

export default function SpecificationsContent({ type, specifications }) {
    const { filterTires, setCarFilterTires, setCarFilterWheels, getFilterForCar } = useStore()
    const [isStoreReady, setIsStoreReady] = useState(false)

    useEffect(() => {
        if (filterTires) {
            setIsStoreReady(true);
        }
    }, []);

    const handleChecked = (isChecked, vehicleId) => {
        const setEntity = type === TypeProductEnum.TIRES
            ? setCarFilterTires
            : setCarFilterWheels

        const vehicleIds = [...getFilterForCar().vehicleIds ?? []]

        if (isChecked) {
            setEntity({
                type: 'vehicleIds',
                value: [...vehicleIds, vehicleId]
            })
        } else {
            setEntity({
                type: 'vehicleIds',
                value: vehicleIds.filter(elId => elId !== vehicleId)
            })
        }
    }

    function returnHtmlTypeSpecification(type, title) {
        if (!specifications[type]?.length || !isStoreReady) return null;

        return (
            <div>
                <div>{title}</div>
                {specifications[type].map((el) => (
                    <div key={el.id}>
                        <input
                            type="checkbox"
                            value={el.id}
                            onChange={(e) => handleChecked(e.target.checked, el.id)}
                            checked={getFilterForCar().vehicleIds?.includes(el.id) ?? false}
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