import { useEffect, useCallback } from 'react'
import { useRouteKeyStore } from '@/store/routeKeyStore'
import { useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import PageContainer from '@/components/template/PageContainer'
import type { LayoutType } from '@/@types/theme'
import type { ComponentType } from 'react'
import { useAuth } from '@/auth'
import { LAYOUT_CLASSIC } from '@/constants/theme.constant'

export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
    pageContainerType?: 'default' | 'contained' | 'fluid'
}

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    layout,
    pageContainerType = 'contained',
}: AppRouteProps<T>) => {
    const location = useLocation()
    const { layoutType, setLayout } = useThemeStore(
        (state) => state,
    )
    const { authenticated } = useAuth()

    const setCurrentRouteKey = useRouteKeyStore(
        (state) => state.setCurrentRouteKey,
    )

    const handleLayoutChange = useCallback(() => {
        setCurrentRouteKey(routeKey)

        if (layout && layout !== layoutType) {
            setLayout(layout)
        } else if (!layoutType) {
            setLayout(LAYOUT_CLASSIC)
        }
    }, [layout, routeKey, layoutType, setLayout, setCurrentRouteKey])

    useEffect(() => {
        console.log('AppRoute mounted:', {
            location: location.pathname,
            routeKey,
            layoutType,
            layout,
            authenticated,
            pageContainerType
        })
    }, [location.pathname, routeKey, layoutType, layout, authenticated, pageContainerType])

    useEffect(() => {
        handleLayoutChange()
    }, [location, handleLayoutChange])

    return (
        <PageContainer type={pageContainerType}>
            <Component />
        </PageContainer>
    )
}

export default AppRoute
