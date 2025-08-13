import Link from "next/link";
import LocationComponent from "@/components/ui/LocationComponent";
import CartComponent from "@/app/_components/layout/cart/CartComponent";
import SearchInCatalogComponent from "@/app/_components/layout/SearchInCatalogComponent";
import LoginIconComponent from "@/app/_components/layout/LoginIconComponent";
import OverlaySidebarComponent from "@/app/_components/layout/OverlaySidebarComponent";

export default function HeaderSection() {

    return (<>
        <header className="container">
            <div className="header-container">
                <div className="header-location-block">
                    <p className="header-location-block-main">
                        <span className="choice-city-h">Ваш город: </span>
                        <LocationComponent/>
                    </p>
                    <p className="header-number"><a href="tel:+73517000319">+7 (351) 70-00-319</a></p>
                </div>
                <div className="navigation-block">
                    <ul>

                        <li><Link href="/article">Новости</Link></li>
                        <li><Link href="/delivery">Доставка</Link></li>
                        <li><Link href="/pay">Оплата</Link></li>
                        <li><Link href="/refound">Возврат</Link></li>
                        <li><Link href="/contacts">Контакты</Link></li>
                    </ul>
                </div>
            </div>


            <div className="additional-menu">
                <div className="gr1">
                    <OverlaySidebarComponent />
                    <div className="logo">
                        <Link href="/">
                            <img src="/assets/img/logo.svg" alt=""/>
                        </Link>
                    </div>
                    {/*<div className="catalog-button">*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12"*/}
                    {/*        fill="none">*/}
                    {/*        <path*/}
                    {/*            d="M0.5 0.666667C0.5 0.489856 0.579018 0.320286 0.71967 0.195262C0.860322 0.0702379 1.05109 0 1.25 0H14.75C14.9489 0 15.1397 0.0702379 15.2803 0.195262C15.421 0.320286 15.5 0.489856 15.5 0.666667C15.5 0.843478 15.421 1.01305 15.2803 1.13807C15.1397 1.2631 14.9489 1.33333 14.75 1.33333H1.25C1.05109 1.33333 0.860322 1.2631 0.71967 1.13807C0.579018 1.01305 0.5 0.843478 0.5 0.666667ZM1.25 6.66667H14.75C14.9489 6.66667 15.1397 6.59643 15.2803 6.4714C15.421 6.34638 15.5 6.17681 15.5 6C15.5 5.82319 15.421 5.65362 15.2803 5.5286C15.1397 5.40357 14.9489 5.33333 14.75 5.33333H1.25C1.05109 5.33333 0.860322 5.40357 0.71967 5.5286C0.579018 5.65362 0.5 5.82319 0.5 6C0.5 6.17681 0.579018 6.34638 0.71967 6.4714C0.860322 6.59643 1.05109 6.66667 1.25 6.66667ZM1.25 12H14.75C14.9489 12 15.1397 11.9298 15.2803 11.8047C15.421 11.6797 15.5 11.5101 15.5 11.3333C15.5 11.1565 15.421 10.987 15.2803 10.8619C15.1397 10.7369 14.9489 10.6667 14.75 10.6667H1.25C1.05109 10.6667 0.860322 10.7369 0.71967 10.8619C0.579018 10.987 0.5 11.1565 0.5 11.3333C0.5 11.5101 0.579018 11.6797 0.71967 11.8047C0.860322 11.9298 1.05109 12 1.25 12Z"*/}
                    {/*            fill="#DD062A"*/}
                    {/*        />*/}
                    {/*    </svg>*/}
                    {/*    <a id="get-catalog">Меню</a>*/}
                    {/*</div>*/}
                </div>
                <div className="gr2">
                    <SearchInCatalogComponent/>
                    <div className="user-panel">
                        {/*<div className="status-order header-icon-and-btn" id="order-status">*/}
                        {/*    <img src="/assets/img/note.svg" alt=""/>*/}
                        {/*    <p className="header-icon-and-btn-text hide-on-mobile">Статус заказа</p>*/}
                        {/*    <p className="header-icon-and-btn-text show-on-mobile">Мой заказ</p>*/}
                        {/*</div>*/}
                        <LoginIconComponent />
                        <CartComponent/>
                    </div>
                </div>
            </div>
            <div className="search-query-blk">
                <p className="search-query"></p>
            </div>
        </header>
    </>)
}