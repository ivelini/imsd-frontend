import InnerWrapperComponent from "@/app/_components/page/inner-wrapper/InnerWrapperComponent";
import CaruselComponent from "@/app/_components/page/CaruselComponent";

export default function Home() {
  return (<>
    <InnerWrapperComponent />

    <section className="three-blocks container">
      <div className="block customer-reviews">
        <h3 className="block-title">Отзывы покупателей Автоальянс</h3>
        <div className="rating-block">
          <div className="rating-stars">
            <img src="/assets/img/gold-star.svg" alt="" />
            <img src="/assets/img/gold-star.svg" alt="" />
            <img src="/assets/img/gold-star.svg" alt="" />
            <img src="/assets/img/gold-star.svg" alt="" />
            <img src="/assets/img/white-star.svg" alt="" />
          </div>
          <span className="num-rating">4,3</span>
        </div>
        <button type="button" className="white-button">Читать отзывы</button>
        <img className="decoration" src="/assets/img/korona.svg" alt="" />
      </div>

      <div className="block manufacturer-warranty">
        <h3 className="block-title">Мы поддерживаем все расширенные гарантии производителя</h3>
        <button type="button" className="primary-button red-btn">Гарантия на шины</button>
        <img className="decoration" src="/assets/img/galki.svg" alt="" />
      </div>

      <div className="block help-and-selection">
        <h3 className="block-title">Нужна помощь в подборе? Узнать страну, дату выпуска шин?</h3>
        <button type="button" className="primary-button red-btn">Хочу общаться</button>
        <img className="decoration" src="/assets/img/Group 33992.svg" alt="" />
      </div>
    </section>
    <div className="wheels-section container">
      <h2>Шины выгодно</h2>
      <CaruselComponent />
    </div>
    <div className="disk-section container">
      <h2 className="pr">Диски более <span className="highlight-text">16520</span> наименований</h2>
      <CaruselComponent />
    </div>
    <section className="news-section container">
      <h2>Новости</h2>
      <div className="news-list">
        <div className="news">
          <img className="news-image" src="/assets/img/news.png" alt="" />
          <h3 className="news-title">Новость очень важная заголовок</h3>
          <h3 className="news-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure
          </h3>
          <a className="go-news-link">Подребнее </a>
        </div>
        <div className="news">
          <img className="news-image" src="/assets/img/news.png" alt="" />
          <h3 className="news-title">Новость очень важная заголовок</h3>
          <h3 className="news-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure
          </h3>
          <a className="go-news-link">Подребнее </a>
        </div>
        <div className="news">
          <img className="news-image" src="/assets/img/news.png" alt="" />
          <h3 className="news-title">Новость очень важная заголовок</h3>
          <h3 className="news-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure
          </h3>
          <a className="go-news-link">Подребнее </a>
        </div>
      </div>
    </section>
    <section className="about-company-section container">
      <h2>О Компании</h2>
      <p className="about-company-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ante
        metus dictum at tempor commodo. Neque viverra justo nec ultrices dui. Risus ultricies tristique
        nulla aliquet enim. Sit amet
        consectetur adipiscing elit ut aliquam. Interdum consectetur libero id faucibus nisl tincidunt
        eget nullam. Mattis molestie a
        iaculis at erat. Nec ultrices dui sapien eget mi proin sed. Phasellus vestibulum lorem sed risus
        ultricies tristique nulla.
        Fames ac turpis egestas maecenas. Condimentum id venenatis a condimentum. Porttitor lacus luctus
        accumsan tortor posuere ac ut
        consequat semper. Amet commodo nulla facilisi nullam. Ultricies mi eget mauris pharetra et
        ultrices neque ornare aenean. Donec
        ultrices tincidunt arcu non sodales neque. Porta non pulvinar neque laoreet suspendisse interdum.
        Ultrices mi tempus imperdiet
        nulla malesuada pellentesque elit eget gravida. Massa placerat duis ultricies lacus. Volutpat
        commodo sed egestas egestas
        fringilla phasellus faucibus. Mauris in aliquam sem fringilla ut morbi tincidunt. Et netus et
        malesuada fames. Aliquam sem et
        tortor consequat id porta nibh venenatis. Scelerisque viverra mauris in aliquam sem fringilla ut
        morbi tincidunt. Integer vitae
        justo eget magna fermentum iaculis eu non. Non arcu risus quis varius quam. Faucibus nisl
        tincidunt eget nullam non. Malesuada
        fames ac turpis egestas integer eget aliquet nibh praesent. Non enim praesent elementum facilisis
        leo vel fringilla est
        ullamcorper. Varius morbi enim nunc faucibus. Tortor pretium Sapien et ligula ullamcorper
        malesuada proin libero nunc. Dolor sit
        amet consectetur adipiscing elit pellentesque. Id diam vel quam elementum pulvinar etiam. Ulla
      </p>
    </section>
  </>)
}
