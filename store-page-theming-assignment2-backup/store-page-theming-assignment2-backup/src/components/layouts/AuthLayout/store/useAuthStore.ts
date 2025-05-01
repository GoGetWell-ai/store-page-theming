import { StoreDataTypes } from '@/services/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Define the state and actions
type LocaleState = {
    hcfData: Partial<StoreDataTypes> // HCF data
    isLoading: boolean // Loading state
    notFound: boolean // Not found state
    setHcfData: (payload: StoreDataTypes) => void // Action to update HCF data
    setLoading: (payload: boolean) => void // Action to update loading state
    setNotFound: (payload: boolean) => void // Action to update not found state
}

// Create the store with proper typing
export const useAuthStore = create<LocaleState>()(
    devtools((set) => ({
        hcfData: {}, // Default HCF data
        isLoading: false, // Default loading state
        notFound: false, // Default not found state

        // Action to update HCF data
        setHcfData: (payload: StoreDataTypes) => {
            set(() => ({
                hcfData: payload,
            }))
        },

        // Action to update loading state
        setLoading: (payload: boolean) => {
            set(() => ({
                isLoading: payload,
            }))
        },

        // Action to update not found state
        setNotFound: (payload: boolean) => {
            set(() => ({
                notFound: payload,
            }))
        },
    })),
)
