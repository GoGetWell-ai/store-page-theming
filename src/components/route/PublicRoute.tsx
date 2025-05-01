import { Navigate, Outlet, useLocation } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated } = useAuth()
    const location = useLocation()

    // If user is authenticated and on root path, redirect to home
    if (authenticated && location.pathname === '/') {
        return <Navigate to={authenticatedEntryPath} replace />
    }

    // If user is authenticated, allow access to protected routes
    if (authenticated) {
        return <Outlet />
    }

    // If user is not authenticated, redirect to sign-in
    return <Navigate to="/sign-in" replace />
}

export default PublicRoute
