import PublicRoute from './PublicRoute'
import AppRoute from './AppRoute'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import { Routes, Route } from 'react-router-dom'

const AllRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                {[...publicRoutes, ...protectedRoutes].map((route) => (
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
                ))}
            </Route>
        </Routes>
    )
}

export default AllRoutes
