import Image from "next/image";
import CaruselImages from "@/app/catalog/[entity]/[vendor]/[mark]/[product]/_components/Gallery/CaruselImages";

export default function GalleryImage({images}) {
    return (<>
        {images.length > 1
            ? <CaruselImages images={images} />
            : <Image
                src={images[0].url}
                fill
                alt="img"
                unoptimized
            />}
    </>)
}