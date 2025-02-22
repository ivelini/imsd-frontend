import Sidebar from "./_components/layout/Sidebar";

export default function SelectionLayout({ children }) {
    return (<>
        <section className="catalog-section container">
            {children}
        </section>
    </>)
}
