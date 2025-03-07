import Filter from "./filter/Filter";
import MobileHeader from "./MobileHeader";

export default function Sidebar({type, collback, setSwitcherFilter}) {
    return (<>
        <MobileHeader />
        <Filter type={type} collback={collback} setSwitcherFilter={setSwitcherFilter}/>
    </>)
}