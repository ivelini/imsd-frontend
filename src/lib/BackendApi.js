import {useStore} from "@/store/useStore";

/**
 * Класс взаимодействия с backend частью приложения
 */
export default class BackendApi {
    static base_url = process.env.NEXT_PUBLIC_BACKEND_URL

    static headers = {
        'Accept': 'application/json',
    }

    static getHeaders(contentType = 'application/json') {
        const token = useStore.getState().getToken()

        let header = {
            ...this.headers,
            'Content-Type': contentType,
        }

        if (token != null) {
            header.Authorization = token
        }

        return header;
    }

    /**
     *
     * @param {string} url
     * @param {null|Object} params
     * @return {Object}
     */
    static async get(url, params = null) {

        let fullUrl = new URL(this.base_url + url)

        if(params !== null) {

            for(let key in params) {
                fullUrl.searchParams.append(key, params[key])
            }
        }

        let response = await fetch(fullUrl.href, {
            headers: this.getHeaders()
        })

        return  this.prepareResponse(response)
    }

    /**
     *
     * @param {string} url
     * @param {Object|FormData} body
     */
    static async post(url, body = null) {

        let headers = this.getHeaders()
        if(!(body instanceof FormData)) {
            body = JSON.stringify(body)
            headers = this.getHeaders('application/json;charset=utf-8')
        }

        let response = await fetch(this.base_url + url, {
            method: 'POST',
            headers,
            body
        })

        return  this.prepareResponse(response)
    }

    /**
     *
     * @param url
     * @param body
     * @returns {Promise<{code: number, message: string, errors}|any>}
     */
    static async patch(url, body = null) {

        let headers = this.getHeaders()
        if(!(body instanceof FormData)) {
            body = JSON.stringify(body)
            headers = this.getHeaders('application/json;charset=utf-8')
        }

        let response = await fetch(this.base_url + url, {
            method: 'PATCH',
            headers,
            body,
        });

        return  this.prepareResponse(response)
    }

    static async delete(url) {

        let response = await fetch(this.base_url + url, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        return  this.prepareResponse(response)
    }

    static async prepareResponse(response) {
        if (response.ok) {
            return {
                code: response.status,
                ...await response.json()
            };
        } else {
            return {
                code: response.status,
                message: response.statusText,
                errors: (await response.json()).errors
            };
        }
    }
}
