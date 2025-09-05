'use client'
import {useState} from "react";
import PopUpComponent from "@/components/ui/PopUpComponent";

export default function PromotionIconComponent({ promotions, size = '2.5rem' }) {
    const [popUpp, setPoUpp] = useState({visible: false})

    if (promotions.length === 0) return null;

    const getContent = () => {
        return promotions.map((promotion, index) =>
            `<div>${promotion.description} <a target="_blank" href="${promotion.link}">Подробнее</a></div>`
        ).join(' ')
    }

    return (<>
        {popUpp.visible &&
            <PopUpComponent title="Акции"
                            content={() => getContent()}
                            handleOnClose={() => setPoUpp({visible: false})}/>
        }

        <div style={{marginTop: '10px'}}>
            <i style={{ fontSize: size, color: 'red', cursor: 'pointer' }}
               className="pi pi-gift"
               onClick={() => setPoUpp({visible: true})}
            ></i>
        </div>
    </>)
}