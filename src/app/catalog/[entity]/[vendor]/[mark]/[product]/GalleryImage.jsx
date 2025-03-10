"use client"

import {Galleria} from 'primereact/galleria';
import Image from "next/image";

export default function GalleryImage({images}) {

    const itemTemplate = (item) => {
        return <img src={item.url} alt={item.alt} style={{width: '100%', display: 'block'}}/>
    }

    return (<>
        {images.length > 1
            ? <Galleria
                value={images}
                numVisible={5}
                circular
                showItemNavigators
                showIndicators
                showThumbnails={false}
                item={itemTemplate}
            />
            : <Image
                src={images[0].url}
                fill
                alt="img"
                unoptimized
            />}
    </>)
}