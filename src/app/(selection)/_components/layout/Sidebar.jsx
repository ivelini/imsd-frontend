import Filter from "./Filter";
import MobileHeader from "./MobileHeader";

export default function Sidebar({type, collback}) {
    return (<>
        <MobileHeader />
        <Filter type={type} collback={collback}/>
    </>)
}