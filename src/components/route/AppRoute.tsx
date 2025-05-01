// src/components/route/AppRoute.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import type { LayoutType } from '@/@types/theme'
import type { ComponentType } from 'react'

export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
}

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    const location = useLocation()
    const {
        layout,
        setLayout,
        setPreviousLayout
    } = useThemeStore()

    useEffect(() => {
        if (props.layout && props.layout !== layout.current) {
            setPreviousLayout() // Save current layout first
            setLayout(props.layout)
        } else if (!props.layout && layout.previous) {
            setLayout(layout.previous)
        }
    }, [location.pathname, props.layout])

    return <Component {...(props as T)} />
}

export default AppRoute