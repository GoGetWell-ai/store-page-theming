import PublicRoute from './PublicRoute'
import AppRoute from './AppRoute'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/auth'
import { useEffect } from 'react'
import PostLoginLayout from '@/components/layouts/PostLoginLayout/PostLoginLayout'
import { LAYOUT_CLASSIC } from '@/constants/theme.constant'

const AllRoutes = () => {
    const { authenticated } = useAuth()

    useEffect(() => {
        console.log('AllRoutes mounted, authenticated:', authenticated)
        console.log('Protected routes:', protectedRoutes)
        console.log('Public routes:', publicRoutes)
    }, [authenticated])

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => {
                    console.log('Rendering public route:', route.path)
                    return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                    )
                })}
                {protectedRoutes.map((route) => {
                    console.log('Rendering protected route:', route.path)
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                authenticated ? (
                                    <PostLoginLayout layoutType={LAYOUT_CLASSIC}>
                                        <AppRoute
                                            routeKey={route.key}
                                            component={route.component}
                                            {...route.meta}
                                        />
                                    </PostLoginLayout>
                                ) : (
                                    <Navigate to="/sign-in" replace />
                                )
                            }
                        />
                    )
                })}
            </Route>
        </Routes>
    )
}

export default AllRoutes
