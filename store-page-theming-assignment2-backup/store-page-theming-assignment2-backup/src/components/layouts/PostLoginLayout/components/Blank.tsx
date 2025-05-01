import { CommonProps } from '@/@types/common'
import LayoutBase from '@/components//template/LayoutBase'
import { LAYOUT_BLANK } from '@/constants/theme.constant'

const Blank = ({ children }: CommonProps) => {
    return (
        <LayoutBase
            type={LAYOUT_BLANK}
            className="app-layout-blank flex flex-auto flex-col h-[100vh] w-full"
        >
            <div className="flex min-w-0 w-full">
                {children}
            </div>
        </LayoutBase>
    )
}

export default Blank
