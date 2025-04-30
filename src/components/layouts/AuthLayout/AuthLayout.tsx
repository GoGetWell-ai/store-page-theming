import type { CommonProps } from '@/@types/common'
import { Route } from '@/@types/routes'
import type { LazyExoticComponent } from 'react'
import { lazy, useMemo } from 'react'

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
        // Default to currentLayoutType if path or meta is undefined
        const layoutType =
            path?.meta?.layout === 'blank' ? 'blank' : currentLayoutType

        // Make sure we have a valid layout type
        if (!layouts[layoutType]) {
            console.error(
                `Invalid layout type: ${layoutType}, falling back to ${currentLayoutType}`,
            )
            return layouts[currentLayoutType]
        }

        return layouts[layoutType]
    }, [path?.meta?.layout])

    // Add error boundary
    try {
        return <Layout>{children}</Layout>
    } catch (error) {
        console.error('Error rendering AuthLayout:', error)
        // Fallback to a simple div if Layout fails
        return <div className="auth-layout-error">{children}</div>
    }
}

export default AuthLayout
