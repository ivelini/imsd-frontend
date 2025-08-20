'use client'

import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";
import ToastMessageServerComponent from "@/components/ui/ToastMessageServerComponent";
import {useStore} from "@/store/useStore";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter()
    const {getToken, setToken, clearToken, useStoreIsReady} = useStore()

    const [data, setData] = useState({email: '', password: ''})
    const [isAuth, setIsAuth] = useState()
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        setIsAuth(getToken() !== null)

    }, [getToken()]);

    const handleLogin = async () => {

        if (data.email.length > 0 && data.password.length > 0) {
            let response = await BackendApi.post('/api/admin/auth/token', data)

            if (response.code === 200) {
                setToken(response.token_type + ' ' + response.access_token)
                router.back()
            } else {
                setToken(null)
                setErrors(response)
            }
        }
    }

    return (useStoreIsReady && isAuth !== undefined && <>
        <ToastMessageServerComponent errors={errors} clearErrors={() => {
            setErrors(null)
        }}/>

        {!isAuth && <div className="login order_form_in order_form_details">
                <div className="login order_form_title">Вход в приложение</div>

                <div className="login order_form_details_input">
                    <input type="text"
                           value={data.email}
                           onInput={(e) => {
                               setData({...data, email: e.target.value})
                           }} placeholder="Логин"/>
                </div>
                <div className="login order_form_details_input">
                    <input type="password"
                           value={data.password}
                           onInput={(e) => {
                               setData({...data, password: e.target.value})
                           }}
                           placeholder="Пароль"/>
                </div>

                <div className="login order_form_method_btn">
                    <a className="order_form_method_btn_submit"
                       onClick={handleLogin}
                    >Войти</a>
                </div>
            </div>}

        {isAuth && <div className="login order_form_in order_form_details">
            <div className="login order_form_title">Выход из приложения</div>

            <div className="login order_form_method_btn">
                <a className="order_form_method_btn_submit"
                   onClick={() => {
                       clearToken()
                       router.back()
                   }}
                >Выйти</a>
            </div>
        </div>}

    </>)
}