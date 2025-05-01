import { useEffect, useCallback } from 'react'
import { useRouteKeyStore } from '@/store/routeKeyStore'
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

    const { layout, setPreviousLayout, setLayout } = useThemeStore(
        (state) => state,
    )

    const layoutType = layout?.type || ''
    const previousLayout = layout?.previousType || ''

    const setCurrentRouteKey = useRouteKeyStore(
        (state) => state.setCurrentRouteKey,
    )

    const handleLayoutChange = useCallback(() => {
        setCurrentRouteKey(routeKey)

        if (props.layout && props.layout !== layoutType) {
            if (setPreviousLayout) {
                setPreviousLayout(layoutType)
            } else {
                console.error('setPreviousLayout is not defined')
            }

            if (setLayout) {
                setLayout(props.layout)
            } else {
                console.error('setLayout is not defined')
            }
        }

        if (!props.layout && previousLayout && layoutType !== previousLayout) {
            if (setLayout) {
                setLayout(previousLayout)
            } else {
                console.error('setLayout is not defined')
            }

            if (setPreviousLayout) {
                setPreviousLayout('')
            } else {
                console.error('setPreviousLayout is not defined')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.layout, routeKey, layoutType, previousLayout, setPreviousLayout, setLayout])

    useEffect(() => {
        handleLayoutChange()
    }, [location, handleLayoutChange])

    return <Component {...(props as T)} />
}

export default AppRoute
