import ChatSideNav from './components/ChatSideNav'
import ChatView from './components/ChatView'
import ChatHistoryRenameDialog from './components/ChatHistoryRenameDialog'
import useResponsive from '@/utils/hooks/useResponsive'
import ChatMobileNav from './components/ChatMobileNav'
import Treatment from './components/ChatBox/components/Treatment'

const GenerativeChat = () => {
    const { larger } = useResponsive()

    return (
        <>
            <div className={`h-[calc(100vh-60px)] w-full`}>
                <div className="flex flex-auto gap-4 h-full w-full lg:w-[95%] mx-auto overflow-hidden">
                    <div className='h-full w-full'>
                        {
                            larger.lg && <div className='w-full mt-[1%]'>
                                <Treatment />
                            </div>
                        }
                        <ChatMobileNav />
                        <ChatView />
                    </div>
                    {larger.lg && <ChatSideNav />}
                    <ChatHistoryRenameDialog />
                </div>
            </div>
        </>
    )
}

export default GenerativeChat
