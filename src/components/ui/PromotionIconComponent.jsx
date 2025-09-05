'use client'
import {useState} from "react";
import PopUpComponent from "@/components/ui/PopUpComponent";

export default function PromotionIconComponent({promotions = []}) {
    const [popUpp, setPoUpp] = useState({visible: false})

    if (promotions.length === 0) return null;

    const getContent = () => {
        return promotions.map((promotion, index) =>
            `<div class="promotion-description">${promotion.description} </br><a target="_blank" href="${promotion.link}">Подробнее</a></div>`
        ).join(' ')
    }

    return (<>
        {popUpp.visible &&
            <PopUpComponent title="Акции"
                            content={() => getContent()}
                            handleOnClose={() => setPoUpp({visible: false})}/>
        }

        <i className="promotions-icon pi pi-gift" onClick={() => setPoUpp({visible: true})}></i>
    </>)
}