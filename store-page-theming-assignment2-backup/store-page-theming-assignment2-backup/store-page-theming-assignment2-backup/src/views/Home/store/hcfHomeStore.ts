import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// State and Actions
type LocaleState = {
    claimBarStatus: boolean
    setClaimBarStatus: (payload: boolean) => void
}

export const useHcfHomeStore = create<LocaleState>()(
    devtools(
        persist(
            (set) => ({
                // Initial State
                claimBarStatus: false,
                // Action to Update State
                setClaimBarStatus: (payload: boolean) => {
                    set(() => ({
                        claimBarStatus: payload, // Update entire payload
                    }))
                },
            }),
            {
                name: 'useHcfHomeStore', // Storage key for persist
            },
        ),
    ),
)
