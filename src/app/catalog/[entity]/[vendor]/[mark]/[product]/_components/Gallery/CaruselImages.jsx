"use client"

import {Galleria} from 'primereact/galleria';

export default function ({images}) {

    const itemTemplate = (item) => {
        return <img src={item.url} alt={item.alt} className={"product-img"} style={{display: 'block'}}/>
    }

    return (<>
        <Galleria
            value={images}
            numVisible={5}
            circular
            showItemNavigators
            showIndicators
            showThumbnails={false}
            item={itemTemplate}
        />
    </>)
}