import Sidebar from "./_components/page/Sidebar";

export default function SelectionLayout({ children }) {
    return (<>
        <section className="catalog-section container">
            {children}
        </section>
    </>)
}
