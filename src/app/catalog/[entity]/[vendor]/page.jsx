"use client"

import { useRouter, useParams, useSearchParams } from "next/navigation";
import {useStore} from "@/store/useStore";
import {useEffect, useState} from "react";
import BackendApi from "@/lib/BackendApi";
import {TypeProductEnum} from "@/lib/TypeProductEnum";


export default function Vendor() {
    const router = useRouter() 
    const searchParams = useSearchParams();

    /**
     * @type {{ entity?: string, vendor?: string }}
     */
    const params = useParams();
    const {setParamFilterTires, setParamFilterWheels, clearFilter} = useStore()

    useEffect(() => {
        clearFilter({entity: 'filterTires', param: 'params'})
        clearFilter({entity: 'filterWheels', param: 'params'})

        if(searchParams.get('vendor') !== null) {

            (async () => {
                const response = await BackendApi.get('/api/list/filter/vendor', {
                    type: params.entity,
                    slug: params.vendor
                })

                if (response.code === 200) {
                    let data = (await response).data

                    if(params.entity === TypeProductEnum.TIRES) setParamFilterTires({type:'vendor', value: data[0].id})
                    if(params.entity === TypeProductEnum.DISKS) setParamFilterWheels({type:'vendor', value: data[0].id})

                    router.push(`/${params.entity}_selection`)
                }
            })()
        } else {
            router.push(`/${params.entity}_selection`)
        }

    }, [])


}