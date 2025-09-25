import Image from "next/image";
import CaruselImages from "@/components/catalog/product/Gallery/CaruselImages";


export default function GalleryImage({images}) {
    return (<>
        {images.length > 1
            ? <CaruselImages images={images}/>
            : <Image
                src={images[0].url}
                width={100}
                height={100}
                className={"product-img"}
                alt="img"
                unoptimized
            />}
    </>)
}