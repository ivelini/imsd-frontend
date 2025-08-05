/**
 * Информация о доставке для основного города  с картой доставки
 */
export function deliveryMainCityIncludeMapInfo() {
    const map = "<iframe src='https://yandex.ru/map-widget/v1/?um=constructor%3A92ebb88f9f20fdc36ce793ae4d8a27367277cef6679b07d5ff54054a18f90192&amp;source=constructor' width='100%' height='600' frameborder='0'></iframe>"

    const text = '<p>Самовывоз заказа со склада г. Челябинск, Свердловский тракт 3н. Режим работы склада пн-пт: 9:00-19:00,  сб-вс: 9:00-17:00. </p>' +
        '<p>Доставка по Челябинску и области осуществляется по согласованию с заказчиком в удобное время.  ' +
        'Доставка осуществляется во временные промежутки с 09:00 до 22:00. Доставка осуществляется в пределах территориальных границ г. Челябинска по согласованию сторон. ' +
        'Стоимость доставки в отдаленные районы города от 900 рублей. Доставка по Челябинской области в соответствии с тарифами Транспортных компаний.</p>' +
        '<p>Информация на сайте не является публичной офертой.  На сайте не указываются конкретные условия стоимости продукции, сроков передачи товара, ' +
        'доставки, прочие условия. Предоставляется общее описание товара и его характеристики с призывом к клиенту прийти в розничный магазин и оформить покупку.</p>' +
        '<p>Склад-магазин Автоальянс  г. Челябинск, Свердловский тракт, 3н </p>'
    return text + map
}

/**
 * Информация о доставке для основного города
 */
export function deliveryMainCity() {
    return '<div>Доставка осуществляется, по согласованию с заказчиком, с 9:00 до 20:00.</div>' +
        '<div>Доставка осуществляется в пределах городской черты. Стоимость доставки 400р.</div>' +
        '<div>Доставка в отдаленные районы города согласно тарифам доставки в удаленные районы.</div>'
}

/**
 * Информация о точках выдачи для городов, где они есть
 * @return {string}
 */
export function deliveryPointsExists(item, isEpilog = true) {

    const epilog = item.price_stock_and_delivery.people_name_delivery_days
        + ' заказ можно получить в транспортной компании «Луч». '

    console.log(Object.keys(item.price_stock_and_delivery.delivery_points[0].work_time)
        .map((key) => ' <div>' + key + ': ' + item.price_stock_and_delivery.delivery_points[0].work_time[key] + '</div>')
    )
    return (isEpilog ? epilog : '') +
        '<div><strong>Aдрес:</strong> ' + item.price_stock_and_delivery.delivery_points[0].address + '</div>' +
        '<div><strong>Время работы:</strong>'
        + Object.keys(item.price_stock_and_delivery.delivery_points[0].work_time)
            .map((key) => ' <div>' + key + ': ' + item.price_stock_and_delivery.delivery_points[0].work_time[key] + '</div>')
            .join('') + '</div>'
}

/**
 * Информация о точках выдачи для городов, где их нет
 */
export function deliveryPointsNotExists(item) {
    return '<div style="color: red; font-size: 18px; font-weight: bold">В вашем городе нет точек самовывоза.</div>' +
        '<div><strong>' + item.price_stock_and_delivery.people_name_delivery_days + ' товар поступит на центральный склад в г. Челябинск</strong>, ' +
        'откуда его можно забрать самостоятельно, либо оформить доставку в Ваш город транспортной компанией.</div>' +
        '<div>По выбору транспортной компании и расчету стоимости, обратитесь к нашим менеджерам.</div>'
}

/**
 * Информация о доставке для города, где есть точки выдачи
 */
export function deliveryCityExistPoints() {
    return '<div>Вы можете оформить адресную доставку курьером в пределах городской черты.</div>' +
        '<div>Стоимость доставки курьером, оплачивается отдельно, согласно тарифам ТК «Луч».</div>'
}

/**
 * Информация о доставке для города, где нет точек выдачи
 */
export function deliveryCityNotExistPoints() {
    return '<div style="color: red; font-size: 18px; font-weight: bold">Курьерская доставка в ваш город не осуществляется.</div> ' +
        '<div>Доставка возможна транспортной компанией.</div> ' +
        '<div>По выбору транспортной компании и расчету стоимости, обратитесь к нашим менеджерам.</div>'
}