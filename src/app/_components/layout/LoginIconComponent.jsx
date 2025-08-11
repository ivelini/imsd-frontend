'use client'

import {useStore} from "@/store/useStore";
import Link from "next/link";

export default function LoginIconComponent() {
    const {getToken} = useStore()

    return (
        <Link href="/login">
            <div className="login header-icon-and-btn" id="header-login">
                <i className="pi pi-user" style={{fontSize: '20px', color: 'black'}}/>
                <p className="header-icon-and-btn-text">
                    {getToken() ==  null ? 'Войти' : 'Выйти'}
                </p>
            </div>
        </Link>
    )
}