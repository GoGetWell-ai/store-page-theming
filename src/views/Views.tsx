import { Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import AllRoutes from '@/components/route/AllRoutes'
import type { LayoutType } from '@/@types/theme'
import MenuBar from '@/components/shared/MenuBar'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

const Views = (props: ViewsProps) => {
    return (
        <Suspense fallback={<Loading loading={true} className="w-full" />}>
            <MenuBar />
            <AllRoutes {...props} />
        </Suspense>
    )
}

export default Views
