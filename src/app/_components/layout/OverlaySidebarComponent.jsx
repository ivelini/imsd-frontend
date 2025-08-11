'use client'
import Link from "next/link";
import {useState} from "react";
import {Sidebar} from "primereact/sidebar";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/useStore";


export default function OverlaySidebarComponent() {
    const router = useRouter();
    const [visible, setVisible] = useState(false)
    const {getToken} = useStore()

    const handleClickLink = (route) => {
        window.location.href = route

    }

    return (<>
        <div id="hide-show-catalog" onClick={() => setVisible(true)}>
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

        <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            content={() => (
                <div className="catalog-hidden-menu catalog-page-hide catalog-page-open" id="catalog-menu">
                    <div className="catalog-page-panel">
                        <div></div>
                        <div className="catalog-page-logo">
                            <img src="/assets/img/logo.svg" style={{height: "30px"}}/>
                        </div>
                        <div className="catalog-page-close" onClick={() => setVisible(false)}>
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
                    <div className="catalog-page-link-group">
                        <br/><br/>
                        <h3 className="link-group-title">Шины</h3>
                        <a onClick={() => handleClickLink('/tires_selection?filterType=param&filterIsOpen=true')} className="link-group-item">Поиск шин по характеристикам
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <a onClick={() => handleClickLink('/tires_selection?filterType=car&filterIsOpen=true')} className="link-group-item">Поиск шин по автомобилю
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                    <div className="catalog-page-link-group">
                        <br/>
                        <h3 className="link-group-title">Диски</h3>
                        <a onClick={() => handleClickLink('/disks_selection?filterType=param&filterIsOpen=true')} className="link-group-item">Поиск дисков по характеристикам
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <a onClick={() => handleClickLink('/disks_selection?filterType=car&filterIsOpen=true')} className="link-group-item">Поиск дисков по автомобилю
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                    <div className="catalog-page-link-group">
                        <br/>
                        <h3 className="link-group-title">Компания</h3>
                        <a onClick={() => handleClickLink('/contacts')} className="link-group-item">Контакты</a>
                        <a onClick={() => handleClickLink('/delivery')} className="link-group-item">Доставка и оплата</a>
                        <a onClick={() => handleClickLink('/refound')} className="link-group-item">Возврат</a>
                        <a onClick={() => handleClickLink('/article')} className="link-group-item">Новости</a>
                    </div>
                    <div className="catalog-page-footer">
                        <p className="catalog-page-num">8 (351) 7000-319</p>
                        <button className="catalog-page-btn">Заказать звонок</button>
                    </div>
                    <div className="catalog-page-link-group">
                        <br/>
                        <h3 className="link-group-title">Личный кабинет</h3>
                        <a onClick={() => handleClickLink('/login')} className="link-group-item">{getToken() ==  null ? 'Войти' : 'Выйти'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            )}
        ></Sidebar>
    </>)
}