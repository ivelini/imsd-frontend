import SelectionComponent from "@/components/catalog/selection/SelectionComponent";
import {TypeProductEnum} from "@/lib/TypeProductEnum";


export const metadata = {
  title: 'Подбор дисков по параметрам'
}

export default function WheelsSelection() {
  return <SelectionComponent type={TypeProductEnum.DISK} />
}
