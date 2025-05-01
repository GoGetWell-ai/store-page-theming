import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserDetails = {
    stage?: string
    // Add other user detail properties as needed based on your application
}

type UserState = {
    userDetails: UserDetails
}

type UserAction = {
    setUserDetails: (payload: UserDetails) => void
    updateUserDetail: (key: keyof UserDetails, value: any) => void
}

const initialState: UserState = {
    userDetails: {
        stage: 'inquiry'
    }
}

export const useUserStore = create<UserState & UserAction>()(
    persist(
        (set) => ({
            ...initialState,
            setUserDetails: (payload) =>
                set(() => ({
                    userDetails: payload,
                })),
            updateUserDetail: (key, value) =>
                set((state) => ({
                    userDetails: {
                        ...state.userDetails,
                        [key]: value,
                    },
                })),
        }),
        { name: 'userDetails', storage: createJSONStorage(() => localStorage) },
    ),
)