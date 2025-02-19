import FilterComponent from "@/app/_components/page/inner-wrapper/filter/FilterComponent";

export default function InnerWrapperComponent() {
    return (<>
        <div className="inner-wrapper">
            <div className="container main-block">

                <FilterComponent />
                <section className="discount-block">
                    <h2 className="block-title">
                        Эксклюзивная Скидка: 10% <br/>
                        На литые диски!
                    </h2>
                    <p className="block-text">*максимальная скидка при покупке комплекта шин.</p>
                    <a href="#" className="block-button primary-button">Подробнее</a>
                </section>
            </div>
        </div>
    </>)
}