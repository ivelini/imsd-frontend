/**
 * Преобразует массив значений строки запроса из фильтра в объект
 * @param {array} filterArray массив
 * @return {object}
 */
export default function parseFilter(filterArray) {
    const query = {}
    filterArray.map(item => {
        const [key, value] = item.split('_')
        query[key] = value
    })
    return query
}