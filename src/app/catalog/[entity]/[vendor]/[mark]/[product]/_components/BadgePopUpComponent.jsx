'use client'

import {useState} from "react";
import PopUpComponent from "@/components/ui/PopUpComponent";
import {Badge} from "primereact/badge";

export default function BadgePopUpComponent({title, value, content}) {
    const [popUpp, setPoUpp] = useState({visible: false})

    const badgeStyle = {
        borderRadius: '5px',
        padding: '0 5px',
        cursor: 'pointer',
        display: 'table-cell',
        background: '#f5f5f5',
        color: '#383838',
        textAlign: 'center',
        width: '120px',
        height: 'auto'
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
        })} style={badgeStyle}
               value={value + ' >'}
               severity="secondary">
        </Badge>
    </>)
}