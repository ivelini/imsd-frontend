export default function FooterSection() {
    return (<>
        <footer>
            <div className="footer-content container">
                <div className="footer-group footer-group-center">
                    <p className="footer-grup-num">8-351-700-03-19</p>
                    <button className="footer-get-call" type="button">Заказать звонок</button>
                    <div className="footer-group-city">2023 г. Автоальянс</div>
                </div>
                <div className="footer-group fg-hide">
                    <a href="#" className="footer-group-link">Каталог</a>
                    <a href="#" className="footer-group-link">Компания</a>
                    <a href="#" className="footer-group-link">Новости и акции</a>
                    <a href="#" className="footer-group-link">Статьи</a>
                    <a href="#" className="footer-group-link">Доставка</a>
                    <a href="#" className="footer-group-link">Оплата</a>
                </div>
                <div className="footer-group fg-hide">
                    <a href="#" className="footer-group-link">Компания</a>
                    <a href="#" className="footer-group-link">Сервис</a>
                    <a href="#" className="footer-group-link">Доставка и оплата</a>
                    <a href="#" className="footer-group-link">Гарантия</a>
                    <a href="#" className="footer-group-link">Отзывы</a>
                    <a href="#" className="footer-group-link">Магазины</a>
                </div>
                <div className="footer-group"></div>
                <div className="footer-group footer-group-center fg-hide-2">
                    <p className="we-are-in-social">Мы в соцсетях</p>
                    <div className="social-row">
                        <img src="/assets/img/tg.svg" alt="" className="social-row-item"/>
                        <img src="/assets/img/wa.svg" alt="" className="social-row-item"/>
                        <img src="/assets/img/vib.svg" alt="" className="social-row-item"/>
                        <img src="/assets/img/vk.svg" alt="" className="social-row-item"/>
                        <img src="/assets/img/fb.svg" alt="" className="social-row-item"/>
                        <img src="/assets/img/inst.svg" alt="" className="social-row-item"/>
                        <img src="/assets/img/youtube.svg" alt="" className="social-row-item"/>
                    </div>
                </div>
            </div>
        </footer>
    </>)
}