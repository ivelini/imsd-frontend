import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import '@/styles/prime.custom.css'

import HeaderSection from "@/app/_components/layout/HeaderSection";
import FooterSection from "@/app/_components/layout/FooterSection";


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <div className="app">
                    <div className="wrapper">
                        <div className="catalog-hidden-menu catalog-page-hide" id="catalog-menu">
                            <div className="catalog-page-panel">
                                <div></div>
                                <div className="catalog-page-logo">
                                    <img src="/assets/img/logo.svg" alt="" />
                                </div>
                                <div className="catalog-page-close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.89202 2.05729C2.60508 1.75857 2.13985 1.75857 1.8529 2.05729C1.56596 2.35602 1.56596 2.84035 1.8529 3.13907L8.2104 9.75755L2.03439 16.1834C1.74736 16.482 1.74736 16.9662 2.03439 17.2648C2.32142 17.5635 2.78679 17.5635 3.07382 17.2648L9.24953 10.8393L15.4214 17.2646C15.7084 17.5633 16.1736 17.5633 16.4605 17.2646C16.7475 16.9659 16.7475 16.4815 16.4605 16.1828L10.289 9.75788L16.6464 3.14326C16.9335 2.84462 16.9335 2.36043 16.6464 2.06179C16.3594 1.76315 15.894 1.76315 15.607 2.06179L9.24982 8.67609L2.89202 2.05729Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="search-input catalog-page-seacrh-input">
                                <input type="text" placeholder="Поиск по товарам" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.741 12.5698L9.90857 8.73656C10.5943 7.79931 10.961 6.66679 10.9549 5.50558C10.9486 4.04929 10.368 2.65427 9.33907 1.62346C8.31017 0.592654 6.91608 0.009289 5.45954 5.30082e-05C4.74108 -0.00311958 4.02911 0.13615 3.36482 0.409807C2.70053 0.683464 2.09709 1.08608 1.5894 1.59437C1.08172 2.10266 0.679853 2.70654 0.407054 3.37108C0.134256 4.03563 -0.00406507 4.74765 9.09475e-05 5.46598C0.00617262 6.92304 0.587229 8.31881 1.61695 9.34988C2.64668 10.381 4.04184 10.964 5.49915 10.9722C6.66577 10.9774 7.80277 10.6052 8.74045 9.9112H8.74418L12.5729 13.7415C12.6488 13.8217 12.7401 13.886 12.8413 13.9303C12.9425 13.9747 13.0516 13.9984 13.162 13.9999C13.2725 14.0014 13.3822 13.9808 13.4846 13.9392C13.587 13.8976 13.68 13.8359 13.7581 13.7578C13.8362 13.6796 13.8979 13.5866 13.9394 13.4842C13.9809 13.3818 14.0015 13.2721 13.9999 13.1617C13.9983 13.0512 13.9746 12.9422 13.9301 12.841C13.8857 12.7399 13.8214 12.6487 13.741 12.5728V12.5698ZM5.49542 9.87458C4.3297 9.8679 3.21371 9.40159 2.3899 8.57695C1.56609 7.75231 1.10101 6.63597 1.09572 5.47046C1.09245 4.89578 1.20315 4.32615 1.4214 3.7945C1.63965 3.26285 1.96113 2.77973 2.36726 2.37305C2.77339 1.96637 3.25611 1.6442 3.78752 1.42517C4.31893 1.20614 4.88849 1.09459 5.46328 1.09697C6.62951 1.10307 7.74619 1.56923 8.57051 2.39409C9.39482 3.21895 9.86012 4.33582 9.86522 5.50184C9.86839 6.07646 9.75762 6.64601 9.53932 7.17757C9.32103 7.70913 8.99953 8.19217 8.59341 8.59877C8.18729 9.00537 7.70461 9.32747 7.17325 9.54645C6.64188 9.76544 6.07238 9.87696 5.49766 9.87458H5.49542Z"
                                        fill="#EDEDED"
                                    />
                                </svg>
                            </div>
                            <div className="catalog-page-link-group">
                                <h3 className="link-group-title">Каталог</h3>
                                <a href="#" className="link-group-item"
                                >Компания
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                        <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href="#" className="link-group-item"
                                >Новости и акции
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                        <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href="#" className="link-group-item"
                                >Статьи
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                        <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href="#" className="link-group-item"
                                >Доставка
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                        <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href="#" className="link-group-item"
                                >Оплата
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                        <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                            <div className="catalog-page-link-group">
                                <h3 className="link-group-title">Компания</h3>
                                <a href="#" className="link-group-item">Сервис</a>
                                <a href="#" className="link-group-item">Доставка и оплата</a>
                                <a href="#" className="link-group-item">Гарантия</a>
                                <a href="#" className="link-group-item">Отзывы</a>
                                <a href="#" className="link-group-item">Магазины </a>
                            </div>
                            <div className="catalog-page-footer">
                                <p className="catalog-page-num">8 (351) 7000-319</p>
                                <button className="catalog-page-btn">Заказать звонок</button>
                                <div className="social-links-blk">
                                    <a href="#" className="social-links-item">
                                        <img src="/assets/img/tg.svg" alt="" />
                                    </a>
                                    <a href="#" className="social-links-item">
                                        <img src="/assets/img/wa.svg" alt="" />
                                    </a>
                                    <a href="#" className="social-links-item">
                                        <img src="/assets/img/vib.svg" alt="" />
                                    </a>
                                    <a href="#" className="social-links-item">
                                        <img src="/assets/img/vk.svg" alt="" />
                                    </a>
                                    <a href="#" className="social-links-item">
                                        <img src="/assets/img/youtube.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <HeaderSection />

                        {children}

                        <FooterSection />
                    </div>
                </div>
            </body>
        </html>
    )
}
