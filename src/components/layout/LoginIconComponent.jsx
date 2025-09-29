'use client'

import {useStore} from "@/store/useStore";
import Link from "next/link";
import {Avatar} from "primereact/avatar";

export default function LoginIconComponent() {
    const {useStoreIsReady, getToken} = useStore()

    return (useStoreIsReady &&
        <Link href="/login">
            <div className="login header-icon-and-btn" id="header-login">
                {getToken() == null ? (<>
                    <i className="pi pi-user" style={{fontSize: '20px', color: 'black'}}/>
                    <p className="header-icon-and-btn-text">Войти</p>
                </>) : (<>
                    <Avatar icon="pi pi-user" style={{backgroundColor: '#dd062a', color: '#ffffff', width: '20px', height: '20px', borderRadius: '3px'}}/>
                    <p className="header-icon-and-btn-text">Выйти</p>
                </>)}
            </div>
        </Link>
    )
}