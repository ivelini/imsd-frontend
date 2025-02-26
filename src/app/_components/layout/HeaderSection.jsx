import Link from "next/link";
import LocationComponent from "@/components/ui/LocationComponent";
import CartComponent from "@/app/_components/layout/CartComponent";

export default function HeaderSection() {
    return (<>
        <header className="container">
            <div className="header-container">
                <div className="header-location-block">
                    <p className="header-location-block-main">
                        <span className="choice-city-h">Ваш город: </span>
                        <LocationComponent />
                    </p>
                    <p className="header-number">+7 (351) 70-00-319</p>
                </div>
                <div className="navigation-block">
                    <ul>
                        <li><a href="#">Отзывы о нас</a></li>
                        <li><a href="#">Новости и акции</a></li>
                        <li><a href="#">Статьи</a></li>
                        <li><a href="#">Доставка</a></li>
                        <li><a href="#">Оплата</a></li>
                        <li><a href="#">Возврат</a></li>
                        <li><a href="#">Контакты</a></li>
                    </ul>
                </div>
            </div>


            <div className="additional-menu">
                <div className="gr1">
                    <div id="hide-show-catalog">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"
                             fill="none">
                            <path
                                d="M6.56818 3.36842H18.5M1 9.68421H18.5M1 16H18.5M1 5.73684L3.38636 3.36842L1 1"
                                stroke="#303030"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="logo">
                        <Link href={'/'}>
                            <img src="/assets/img/logo.svg" alt=""/>
                        </Link>
                    </div>
                    <div className="catalog-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12"
                             fill="none">
                            <path
                                d="M0.5 0.666667C0.5 0.489856 0.579018 0.320286 0.71967 0.195262C0.860322 0.0702379 1.05109 0 1.25 0H14.75C14.9489 0 15.1397 0.0702379 15.2803 0.195262C15.421 0.320286 15.5 0.489856 15.5 0.666667C15.5 0.843478 15.421 1.01305 15.2803 1.13807C15.1397 1.2631 14.9489 1.33333 14.75 1.33333H1.25C1.05109 1.33333 0.860322 1.2631 0.71967 1.13807C0.579018 1.01305 0.5 0.843478 0.5 0.666667ZM1.25 6.66667H14.75C14.9489 6.66667 15.1397 6.59643 15.2803 6.4714C15.421 6.34638 15.5 6.17681 15.5 6C15.5 5.82319 15.421 5.65362 15.2803 5.5286C15.1397 5.40357 14.9489 5.33333 14.75 5.33333H1.25C1.05109 5.33333 0.860322 5.40357 0.71967 5.5286C0.579018 5.65362 0.5 5.82319 0.5 6C0.5 6.17681 0.579018 6.34638 0.71967 6.4714C0.860322 6.59643 1.05109 6.66667 1.25 6.66667ZM1.25 12H14.75C14.9489 12 15.1397 11.9298 15.2803 11.8047C15.421 11.6797 15.5 11.5101 15.5 11.3333C15.5 11.1565 15.421 10.987 15.2803 10.8619C15.1397 10.7369 14.9489 10.6667 14.75 10.6667H1.25C1.05109 10.6667 0.860322 10.7369 0.71967 10.8619C0.579018 10.987 0.5 11.1565 0.5 11.3333C0.5 11.5101 0.579018 11.6797 0.71967 11.8047C0.860322 11.9298 1.05109 12 1.25 12Z"
                                fill="#DD062A"
                            />
                        </svg>
                        <a href="#" id="get-catalog">Каталог</a>
                    </div>
                </div>
                <div className="gr2">
                    <div className="search-input">
                        <input type="text" placeholder="Поиск по товарам"/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                             fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.741 12.5698L9.90857 8.73656C10.5943 7.79931 10.961 6.66679 10.9549 5.50558C10.9486 4.04929 10.368 2.65427 9.33907 1.62346C8.31017 0.592654 6.91608 0.009289 5.45954 5.30082e-05C4.74108 -0.00311958 4.02911 0.13615 3.36482 0.409807C2.70053 0.683464 2.09709 1.08608 1.5894 1.59437C1.08172 2.10266 0.679853 2.70654 0.407054 3.37108C0.134256 4.03563 -0.00406507 4.74765 9.09475e-05 5.46598C0.00617262 6.92304 0.587229 8.31881 1.61695 9.34988C2.64668 10.381 4.04184 10.964 5.49915 10.9722C6.66577 10.9774 7.80277 10.6052 8.74045 9.9112H8.74418L12.5729 13.7415C12.6488 13.8217 12.7401 13.886 12.8413 13.9303C12.9425 13.9747 13.0516 13.9984 13.162 13.9999C13.2725 14.0014 13.3822 13.9808 13.4846 13.9392C13.587 13.8976 13.68 13.8359 13.7581 13.7578C13.8362 13.6796 13.8979 13.5866 13.9394 13.4842C13.9809 13.3818 14.0015 13.2721 13.9999 13.1617C13.9983 13.0512 13.9746 12.9422 13.9301 12.841C13.8857 12.7399 13.8214 12.6487 13.741 12.5728V12.5698ZM5.49542 9.87458C4.3297 9.8679 3.21371 9.40159 2.3899 8.57695C1.56609 7.75231 1.10101 6.63597 1.09572 5.47046C1.09245 4.89578 1.20315 4.32615 1.4214 3.7945C1.63965 3.26285 1.96113 2.77973 2.36726 2.37305C2.77339 1.96637 3.25611 1.6442 3.78752 1.42517C4.31893 1.20614 4.88849 1.09459 5.46328 1.09697C6.62951 1.10307 7.74619 1.56923 8.57051 2.39409C9.39482 3.21895 9.86012 4.33582 9.86522 5.50184C9.86839 6.07646 9.75762 6.64601 9.53932 7.17757C9.32103 7.70913 8.99953 8.19217 8.59341 8.59877C8.18729 9.00537 7.70461 9.32747 7.17325 9.54645C6.64188 9.76544 6.07238 9.87696 5.49766 9.87458H5.49542Z"
                                fill="#EDEDED"
                            />
                        </svg>
                    </div>
                    <div className="user-panel">
                        <div className="status-order header-icon-and-btn" id="order-status">
                            <img src="/assets/img/note.svg" alt=""/>
                            <p className="header-icon-and-btn-text hide-on-mobile">Статус заказа</p>
                            <p className="header-icon-and-btn-text show-on-mobile">Мой заказ</p>
                        </div>
                        <div className="login header-icon-and-btn" id="header-login">
                            <img src="/assets/img/login.svg" alt=""/>
                            <p className="header-icon-and-btn-text">Войти</p>
                        </div>
                        <CartComponent />
                    </div>
                </div>
            </div>
            <div className="search-query-blk">
                <p className="search-query"></p>
            </div>
        </header>
    </>)
}