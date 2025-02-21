import Sidebar from "./_components/layout/Sidebar";

export default function SelectionLayout({ children }) {
    return (<>
        <section className="catalog-section container">
            <h2>Шины на авто в Челябинске</h2>
            <div className="main-content-catalog">
                <Sidebar />
                <div className="catalog-with-products">
                    {children}
                </div>
            </div>
        </section>
    </>)
}
