import Image from "next/image";
import CaruselImages from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/Gallery/CaruselImages";
import EuroLabel from "@/app/(selection)/_components/page/param/EuroLabel";

export default function GalleryImage({images}) {
    return (<>
        {images.length > 1
            ? <CaruselImages images={images}/>
            : <Image
                src={images[0].url}
                width={100}
                height={100}
                style={{'width': '100%', 'height': '100%'}}
                alt="img"
                unoptimized
            />}
    </>)
}