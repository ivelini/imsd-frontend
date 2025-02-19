import { create } from 'zustand'
import {devtools, persist} from "zustand/middleware";
import {useCitySlice} from "@/store/useCitySlice";
import {useFilterSlice} from "@/store/useFilterSlice";


export const useStore = create(
    devtools(
        (set, get) => ({
            ...useCitySlice(set, get),
            ...useFilterSlice(set, get)
        }))
)