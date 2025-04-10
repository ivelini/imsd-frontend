import Link from "next/link";

export default function FooterSection() {
    return (<>
        <footer>
            <div className="footer-content container">
                <div className="footer-group footer-group-center">
                    <p className="footer-grup-num">+7 (351) 700-03-19</p>
                    {/*<button className="footer-get-call" type="button">Заказать звонок</button>*/}
                    <div className="footer-group-city">2025 г. Автоальянс</div>
                </div>
                <div className="footer-group fg-hide">
                    <Link href="/article" className="footer-group-link">Новости</Link>
                    <Link href="/delivery" className="footer-group-link">Доставка</Link>
                    <Link href="/pay" className="footer-group-link">Оплата</Link>

                </div>
                <div className="footer-group fg-hide">
                    <Link href="/refound" className="footer-group-link">Возврат</Link>
                    <Link href="/contacts" className="footer-group-link">Контакты</Link>
                    <Link href="/company_us" className="footer-group-link">О компании</Link>
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