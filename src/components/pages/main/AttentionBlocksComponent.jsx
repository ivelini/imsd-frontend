export default function AttentionBlocksComponent() {
    return (<>
        <section className="three-blocks container">
            <div className="block customer-reviews">
                <h3 className="block-title">Отзывы покупателей Автоальянс</h3>
                <div className="rating-block">
                    <div className="rating-stars">
                        <img src="/assets/img/gold-star.svg" alt=""/>
                        <img src="/assets/img/gold-star.svg" alt=""/>
                        <img src="/assets/img/gold-star.svg" alt=""/>
                        <img src="/assets/img/gold-star.svg" alt=""/>
                        <img src="/assets/img/white-star.svg" alt=""/>
                    </div>
                    <span className="num-rating">4,3</span>
                </div>
                <button type="button" className="white-button">Читать отзывы</button>
                <img className="decoration" src="/assets/img/korona.svg" alt=""/>
            </div>

            <div className="block manufacturer-warranty">
                <h3 className="block-title">Мы поддерживаем все расширенные гарантии производителя</h3>
                <button type="button" className="primary-button red-btn">Гарантия на шины</button>
                <img className="decoration" src="/assets/img/galki.svg" alt=""/>
            </div>

            <div className="block help-and-selection">
                <h3 className="block-title">Нужна помощь в подборе? Узнать страну, дату выпуска шин?</h3>
                <button type="button" className="primary-button red-btn">Хочу общаться</button>
                <img className="decoration" src="/assets/img/Group 33992.svg" alt=""/>
            </div>
        </section>
    </>)
}