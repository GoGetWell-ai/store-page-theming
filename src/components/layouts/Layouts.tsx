import type { CommonProps } from '@/@types/common'
import { useAuth } from '@/auth'
import Loading from '@/components/shared/Loading'
import { useThemeStore } from '@/store/themeStore'
import useHCFApi from '@/utils/hooks/useHcfApi'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import { Suspense, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from './AuthLayout/store/useAuthStore'
import PostLoginLayout from './PostLoginLayout'
import PreLoginLayout from './PreLoginLayout'

const Layout = ({ children }: CommonProps) => {
    const layoutType = useThemeStore((state) => state.layout.type)
    const { hcfData: hcfDataFromApi, loadingStatus } = useHCFApi()
    const { id } = useParams()
    const { setHcfData } = useAuthStore((state) => state)
    const generativeChatStore = usGenerativeChatStore()

    const { authenticated } = useAuth()

    // Effect for handling HCF data
    useEffect(() => {
        if (hcfDataFromApi?._id) {
            setHcfData(hcfDataFromApi)
        }
    }, [hcfDataFromApi, setHcfData])

    // Separate effect for handling conversation selection
    // Using a ref to track if we've already set the conversation for this id value
    const hasSetConversation = useRef(false)

    useEffect(() => {
        // Only run this effect once when the component mounts
        const setConversationIfNeeded = () => {
            // Only set the conversation if id is not present and we haven't set it yet
            if (
                !id &&
                !hasSetConversation.current &&
                generativeChatStore &&
                typeof generativeChatStore.setSelectedConversation ===
                    'function'
            ) {
                try {
                    hasSetConversation.current = true
                    generativeChatStore.setSelectedConversation('')
                } catch (error) {
                    console.error('Error setting selected conversation:', error)
                }
            } else if (id) {
                // Reset the flag when id changes
                hasSetConversation.current = false
            }
        }

        setConversationIfNeeded()
        // We're intentionally not including generativeChatStore in the dependency array
        // to avoid the infinite loop, and using a ref to track state instead
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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
                    <PostLoginLayout layoutType={layoutType}>
                        {children}
                    </PostLoginLayout>
                ) : (
                    <PreLoginLayout>{children}</PreLoginLayout>
                )}
            </Loading>
        </Suspense>
    )
}

export default Layout
