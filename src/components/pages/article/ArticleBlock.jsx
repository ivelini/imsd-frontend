import Image from "next/image";
import Link from "next/link";

/**
 *
 * @param {Object} item
 * @param {string} item.title
 * @param {string} item.description
 * @param {string} item.slug
 * @param {array} item.images
 * @param {Array<{url: string}>} item.images - Массив изображений с URL.
 * @param {boolean} isRight
 */
export default function ArticleBlock({item, isRight = false}) {
    return (<>
        <div className="news" style={{'marginRight': isRight ? '100px' : '0px'}}>
            <Image className="news-image"
                   src={item.images[0].url}
                   width={370}
                   height={250}
                   alt="img"
                   unoptimized
            />

            <h3 className="news-title">{item.title}</h3>
            <h3 className="news-text">
                {item.description}
            </h3>
            <Link href={'/article/' + item.slug}
                  className="go-news-link"
            >
                Подребнее &gt;
            </Link>
        </div>
    </>)
}