"use client"

import { useRouter, useParams, useSearchParams } from "next/navigation";

/**
 * @param {Object} params 
 * @param {string} params.entity
 * @param {string} params.vendor
 */
export default function Vendor() {
    const router = useRouter() 
    const searchParams = useSearchParams();
    const params = useParams();


    console.log(params)


}