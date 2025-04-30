import { useMemo, lazy } from 'react'
import type { CommonProps } from '@/@types/common'
import type { LazyExoticComponent } from 'react'
import { Route } from '@/@types/routes'

type LayoutType = 'simple' | 'split' | 'side' | 'blank'	

type Layouts = Record<
    LayoutType,
    LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>

const currentLayoutType: LayoutType = 'side'

const layouts: Layouts = {
    simple: lazy(() => import('./Simple')),
    split: lazy(() => import('./Split')),
    side: lazy(() => import('./Side')),
    blank: lazy(() => import('./Blank')),
}

interface AuthLayoutProps extends CommonProps {
    path?: Route
}

const AuthLayout = ({ children, path }: AuthLayoutProps) => {
    console.log('here is the path of auth', path)
    const Layout = useMemo(() => {
        return layouts[path?.meta?.layout === 'blank' ? 'blank' : currentLayoutType]
    }, [])

    return <Layout>{children}</Layout>
}

export default AuthLayout