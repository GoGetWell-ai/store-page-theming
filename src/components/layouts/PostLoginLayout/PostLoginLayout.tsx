import { lazy, Suspense } from 'react'
import {
    LAYOUT_BLANK,
    LAYOUT_CLASSIC,
    LAYOUT_MODERN,
    LAYOUT_STACKED_SIDE,
    LAYOUT_SIMPLE,
    LAYOUT_DECKED,
} from '@/constants/theme.constant'
import Loading from '@/components/shared/Loading'
import type { CommonProps } from '@/@types/common'
import type { LazyExoticComponent } from 'react'
import type { LayoutType } from '@/@types/theme'

type Layouts = Record<
    string,
    LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>

interface PostLoginLayoutProps extends CommonProps {
    layoutType: LayoutType
}

const layouts: Layouts = {
    [LAYOUT_BLANK]: lazy(() => import('./components/Blank')),
    [LAYOUT_CLASSIC]: lazy(() => import('./components/Classic')),
    [LAYOUT_MODERN]: lazy(() => import('./components/Modern')),
    [LAYOUT_STACKED_SIDE]: lazy(() => import('./components/StackedSide')),
    [LAYOUT_SIMPLE]: lazy(() => import('./components/Simple')),
    [LAYOUT_DECKED]: lazy(() => import('./components/Decked')),
}

const PostLoginLayout = ({ layoutType, children }: PostLoginLayoutProps) => {
    console.log('PostLoginLayout rendering:', { layoutType })
    
    // Ensure we have a valid layout type
    const validLayoutType = layoutType || LAYOUT_CLASSIC
    const AppLayout = layouts[validLayoutType]
    
    console.log('Selected layout component:', validLayoutType)
    
    if (!AppLayout) {
        console.error('Invalid layout type:', layoutType)
        return null
    }
    
    return (
        <Suspense fallback={<Loading type='cover' loading={true} />}>
            <AppLayout>{children}</AppLayout>
        </Suspense>
    )
}

export default PostLoginLayout
