import { useLocation, Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'

const allowedForAll = ['/themes']

const PublicRoute = () => {
    const { authenticated } = useAuth()
    const location = useLocation()

    if (authenticated && !allowedForAll.includes(location.pathname)) {
        return <Navigate to={appConfig.authenticatedEntryPath} />
    }

    return <Outlet />
}

export default PublicRoute
