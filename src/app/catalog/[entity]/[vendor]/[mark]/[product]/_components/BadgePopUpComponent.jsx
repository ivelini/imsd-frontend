'use client'

import {useState} from "react";
import PopUpComponent from "@/components/ui/PopUpComponent";
import {Badge} from "primereact/badge";

export default function BadgePopUpComponent({title, value, content, isInline = false}) {
    const [popUpp, setPoUpp] = useState({visible: false})

    const badgeStyle = {
        borderRadius: '5px',
        padding: '0 5px',
        cursor: 'pointer',
        display: 'table-cell',
        background: '#f5f5f5',
        color: '#383838',
        textAlign: 'center',
        width: window.screen.width <= 600 ? '200px' : '120px',
        height: 'auto'
    }

    const inlineStyle = {
        cursor: 'pointer',
        background: '#ffffff',
        color: '#383838',
        textAlign: 'left',
        height: 'auto',
        fontWeight: 'bold',
    }

    return (<>

        {popUpp.visible &&
            <PopUpComponent title={popUpp.title}
                            content={() => popUpp.content}
                            handleOnClose={() => setPoUpp({visible: false})}/>
        }

        <Badge onClick={() => setPoUpp({
            visible: true,
            title,
            content
        })}
               style={isInline ? inlineStyle : badgeStyle}
               value={value + (isInline ? '' : ' >')}
               severity="secondary">
        </Badge>
    </>)
}