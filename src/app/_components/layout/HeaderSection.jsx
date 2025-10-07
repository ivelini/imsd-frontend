import Link from "next/link";
import {ScrollPanel} from 'primereact/scrollpanel';
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
                    <OverlaySidebarComponent>
                        <div className="logo">
                            <Link href="/">
                                <img src="/assets/img/logo.svg" alt=""/>
                            </Link>
                        </div>
                    </OverlaySidebarComponent>
                </div>
                <div className="gr2">
                    <SearchInCatalogComponent/>
                    <div className="user-panel">
                        {/*<div className="status-order header-icon-and-btn" id="order-status">*/}
                        {/*    <img src="/assets/img/note.svg" alt=""/>*/}
                        {/*    <p className="header-icon-and-btn-text hide-on-mobile">Статус заказа</p>*/}
                        {/*    <p className="header-icon-and-btn-text show-on-mobile">Мой заказ</p>*/}
                        {/*</div>*/}
                        <LoginIconComponent/>
                        <CartComponent/>
                    </div>
                </div>
            </div>
            <ScrollPanel style={{width: '100%', height: '50px'}} className="h-scrollpanel">
                <div className="hsp-row">
                    <div className="hsp-item">
                        <Link href={'/tires_selection'}>Шины</Link>
                    </div>
                    <div className="hsp-item">
                        <Link href={'/disks_selection'}>Диски</Link>
                    </div>
                    <div className="hsp-item badge">
                        <Link href={'/article/sinomontaz'}>Шиномонтаж</Link>
                    </div>
                    <div className="hsp-item">
                        <Link href={'/article/datciki-davleniia-v-sine-autel'}>Датчики давления</Link>
                    </div>
                    <div className="hsp-item">
                        <Link href={'/contacts'}>Контакты</Link>
                    </div>
                </div>
            </ScrollPanel>
        </header>
    </>)
}