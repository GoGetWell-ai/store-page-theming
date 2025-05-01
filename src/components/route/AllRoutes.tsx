import AppRoute from './AppRoute'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home'))
const Theme = lazy(() => import('@/views/Theme'))

const AllRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppRoute routeKey="Home" component={Home} layout="blank" />
                }
            />

            <Route path="/themes" element={<Theme />} />
        </Routes>
    )
}

export default AllRoutes
