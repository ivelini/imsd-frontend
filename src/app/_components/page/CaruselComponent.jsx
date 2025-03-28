"use client"

import {Carousel} from 'primereact/carousel';

export default function CaruselComponent({ items }) {

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const productTemplate = () => {
        return (<>
            <div className="section-product">
                <div className="product-photo-blk">
                    <img src="/assets/img/wheel-product.png" alt="Wheel Product Image"/>
                </div>
                <h3 className="product-title">Шина Viatti V-130 Strada Asimmetrico 185/60 R15 84H летняя</h3>
                <div className="product-details">
                    <div className="icons">
                        <img src="/assets/img/day.svg" alt=""/>
                        <img src="/assets/img/snw.svg" alt=""/>
                        <img src="/assets/img/sh.svg" alt=""/>
                    </div>
                    <div className="star-rating">
                        <img src="/assets/img/sm-star.svg" alt="Star" className="sm-star"/> <span
                        className="rating-value">4.8</span>
                    </div>
                </div>
                <div className="price-info">
                    <span className="current-price">29 999 ₽</span>
                    <span className="old-price">32 200 ₽</span>
                </div>
                <div className="buy-button-blk">
                    <button className="buy-button" tabIndex="-1">
                        Купить <span>cейчас</span>
                        <img src="/assets/img/bag.svg" alt=""/>
                    </button>
                </div>
            </div>
        </>)
    }

    return (<>
        <Carousel value={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  numVisible={5}
                  numScroll={1}
                  circular
                  responsiveOptions={responsiveOptions}
                  itemTemplate={productTemplate}
                  showIndicators={false}

        />
    </>)
}