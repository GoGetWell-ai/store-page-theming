import { Suspense, useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import type { CommonProps } from '@/@types/common'
import { useAuth } from '@/auth'
import { useThemeStore } from '@/store/themeStore'
import PreLoginLayout from './PreLoginLayout'
import useHCFApi from '@/utils/hooks/useHcfApi'
import { useParams } from 'react-router-dom'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import { useAuthStore } from './AuthLayout/store/useAuthStore'

const Layout = ({ children }: CommonProps) => {
    const { hcfData: hcfDataFromApi, loadingStatus } = useHCFApi()
    const { id } = useParams()
    const { setHcfData } = useAuthStore((state) => state)
    const { setSelectedConversation } = usGenerativeChatStore()

    const { authenticated } = useAuth()

    useEffect(() => {
        if (hcfDataFromApi?._id) {
            setHcfData(hcfDataFromApi)
        }

        if (!id) {
            setSelectedConversation('')
        }
    }, [hcfDataFromApi])

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <Loading loading={loadingStatus}>
                {authenticated ? (
                    children
                ) : (
                    <PreLoginLayout>{children}</PreLoginLayout>
                )}
            </Loading>
        </Suspense>
    )
}

export default Layout
