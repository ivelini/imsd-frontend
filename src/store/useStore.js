import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware";
import { useCitySlice } from "@/store/useCitySlice";
import { useFilterSlice } from "@/store/useFilterSlice";
import { useCartSlice } from "@/store/useCartSlice";


export const useStore = create(
    devtools(
        persist((set, get) => ({
            useStoreIsReady: true,
            ...useCitySlice(set, get),
            ...useFilterSlice(set, get),
            ...useCartSlice(set, get)
        }))
    )
)