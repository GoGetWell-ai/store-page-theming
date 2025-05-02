import PublicRoute from './PublicRoute'
import AppRoute from './AppRoute'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import { Routes, Route } from 'react-router-dom'
import ThemesPage from '@/views/Home/themes'

const AllRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
            {/* <Route path="/themes" element={<ThemesPage />} /> */}
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
