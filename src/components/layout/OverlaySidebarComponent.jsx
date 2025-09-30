'use client'
import Link from "next/link";
import {useState} from "react";
import {Sidebar} from "primereact/sidebar";
import {TypeProductEnum} from "@/lib/TypeProductEnum";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/useStore";


export default function OverlaySidebarComponent({children}) {
    const router = useRouter();
    const [visible, setVisible] = useState(false)
    const {getToken, setFilterType} = useStore()

    const handleClickLink = (route, type) => {
        setFilterType(type)
        router.push(route)
        setVisible(false)
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

        {children}

        <a id="get-catalog" onClick={() => setVisible(true)}>
            <div className="catalog-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12"
                     fill="none">
                    <path
                        d="M0.5 0.666667C0.5 0.489856 0.579018 0.320286 0.71967 0.195262C0.860322 0.0702379 1.05109 0 1.25 0H14.75C14.9489 0 15.1397 0.0702379 15.2803 0.195262C15.421 0.320286 15.5 0.489856 15.5 0.666667C15.5 0.843478 15.421 1.01305 15.2803 1.13807C15.1397 1.2631 14.9489 1.33333 14.75 1.33333H1.25C1.05109 1.33333 0.860322 1.2631 0.71967 1.13807C0.579018 1.01305 0.5 0.843478 0.5 0.666667ZM1.25 6.66667H14.75C14.9489 6.66667 15.1397 6.59643 15.2803 6.4714C15.421 6.34638 15.5 6.17681 15.5 6C15.5 5.82319 15.421 5.65362 15.2803 5.5286C15.1397 5.40357 14.9489 5.33333 14.75 5.33333H1.25C1.05109 5.33333 0.860322 5.40357 0.71967 5.5286C0.579018 5.65362 0.5 5.82319 0.5 6C0.5 6.17681 0.579018 6.34638 0.71967 6.4714C0.860322 6.59643 1.05109 6.66667 1.25 6.66667ZM1.25 12H14.75C14.9489 12 15.1397 11.9298 15.2803 11.8047C15.421 11.6797 15.5 11.5101 15.5 11.3333C15.5 11.1565 15.421 10.987 15.2803 10.8619C15.1397 10.7369 14.9489 10.6667 14.75 10.6667H1.25C1.05109 10.6667 0.860322 10.7369 0.71967 10.8619C0.579018 10.987 0.5 11.1565 0.5 11.3333C0.5 11.5101 0.579018 11.6797 0.71967 11.8047C0.860322 11.9298 1.05109 12 1.25 12Z"
                        fill="#DD062A"
                    />
                </svg>
                Меню
            </div>
        </a>

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
                        <a onClick={() => handleClickLink('/catalog/tires', "PARAM")}
                           className="link-group-item">Поиск шин по характеристикам
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <a onClick={() => handleClickLink('/catalog/tires/car', "CAR")}
                           className="link-group-item">Поиск шин по автомобилю
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
                        <a onClick={() => handleClickLink('/catalog/disks', "PARAM")}
                           className="link-group-item">Поиск дисков по характеристикам
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"
                                 fill="none">
                                <path d="M1 1L5 5L1 9" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <a onClick={() => handleClickLink('/catalog/disks/car', "CAR")}
                           className="link-group-item">Поиск дисков по автомобилю
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
                        <a onClick={() => handleClickLink('/delivery')} className="link-group-item">Доставка и
                            оплата</a>
                        <a onClick={() => handleClickLink('/refound')} className="link-group-item">Возврат</a>
                        <a onClick={() => handleClickLink('/article')} className="link-group-item">Новости</a>
                    </div>
                    <div className="catalog-page-footer">
                        <a href="tel:+73517000319"
                           style={{
                               display: 'inline-block',
                               padding: '10px 50px',
                               background: '#dd062a',
                               color: '#ffffff',
                               borderRadius: '5px',
                               textDecoration: 'none',
                               fontSize: '14px'
                           }}>
                            8 (351) 7000-319
                        </a>
                    </div>
                    <div className="catalog-page-link-group">
                        <br/>
                        <h3 className="link-group-title">Личный кабинет</h3>
                        <a onClick={() => handleClickLink('/login')}
                           className="link-group-item">{getToken() == null ? 'Войти' : 'Выйти'}
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