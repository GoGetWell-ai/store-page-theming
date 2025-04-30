import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import MobileNav from '@/components/template/MobileNav'
import UserProfileDropdown from '@/components/template/UserProfileDropdown'
import ThemeSelector from '@/components/shared/ThemeSelector'
import LayoutBase from '@/components/template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_STACKED_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'

const StackedSide = ({ children }: CommonProps) => {
    const { smaller } = useResponsive()

    return (
        <LayoutBase
            type={LAYOUT_STACKED_SIDE}
            className="app-layout-stacked-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0 h-full">
                <div className="flex flex-auto min-h-screen min-w-0 relative w-full flex-col">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<>{smaller.lg && <MobileNav />}</>}
                        headerEnd={
                            <>
                                <ThemeSelector />
                                <UserProfileDropdown hoverable={false} />
                            </>
                        }
                    />
                    <div className="flex flex-auto w-full">
                        <SideNav className="stacked-side-nav pt-4" />
                        <div className="flex flex-col flex-auto h-full">
                            <div className="h-full flex flex-auto flex-col">
                                <div className="px-4 sm:px-6 lg:px-8 mx-auto flex w-full flex-1 mt-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default StackedSide
