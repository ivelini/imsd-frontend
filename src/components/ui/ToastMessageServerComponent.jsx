import {useEffect, useRef} from "react";
import {Toast} from "primereact/toast";

/**
 * @typedef {Object} ServerValidationError
 * @property {number} code - HTTP-код ошибки, например, 422
 * @property {string} message - Сообщение об ошибке
 * @property {Object.<string, string[]>} errors - Объект, в котором ключ — это имя поля, а значение — массив сообщений об ошибке
 *
 * Компонент для отображения ошибок валидации от сервера
 * @param {Object} props
 * @param {ServerValidationError['errors']} props.errors - Ошибки валидации от сервера
 * @param {Function} props.clearErrors - Функция для очистки ошибок
 */
export default function ToastMessageServerComponent({errors, clearErrors}) {

    const toast = useRef(null);

    useEffect(() => {
        if(errors == null) {
            return
        }

        Object.keys(errors.errors).map(key => {
            toast
                .current
                .show({
                    severity: 'error',
                    summary: key,
                    detail: errors.errors[key][0],
                    life: 3000
                })
        })

        setTimeout(() => {
            clearErrors()
        }, 3010)
    }, [errors]);

    return (
        <Toast ref={toast}/>
    )
}