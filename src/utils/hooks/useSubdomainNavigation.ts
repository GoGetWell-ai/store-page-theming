import { Routes } from '@/@types/routes'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import authRoute from '@/configs/routes.config/authRoute'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useSubdomainNavigation = () => {
    // Get hostname and determine if it's a subdomain
    const hostname = window.location.hostname
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const hostParts = hostname.split('.')
    const subdomain = hostname.includes('localhost')
        ? hostParts.length > 1
            ? hostParts[0]
            : ''
        : hostname.includes('gogetwell')
          ? hostParts.length > 2
              ? hostParts[0]
              : ''
          : window.location.hostname

    const isSubdomain = !hostname.includes('localhost')
        ? hostname.includes('gogetwell')
            ? hostParts.length > 2 &&
              subdomain !== 'app' &&
              subdomain !== 'dev' &&
              subdomain !== 'in'
            : true
        : hostParts.length > 1 &&
          subdomain !== 'app' &&
          subdomain !== 'dev' &&
          subdomain !== 'in'

    // Use useEffect to handle navigation after render
    useEffect(() => {
        const subdomainRoute = authRoute.find(
            (route) => route.path === pathname,
        )
        if (subdomainRoute) {
            navigate('/')
        }
    }, [pathname, navigate])

    // Initialize routes
    let newPublicRoutes: Routes = publicRoutes
    let newProtectedRoutes: Routes = protectedRoutes

    // Filter routes only if it's a subdomain
    if (isSubdomain) {
        newPublicRoutes = publicRoutes.filter(
            (route) => route.key !== 'HomeAuth',
        )

        newProtectedRoutes = protectedRoutes.filter(
            (route) => route.key !== 'HomeNoAuth',
        )
    }

    return {
        newPublicRoutes,
        newProtectedRoutes,
        isSubdomain,
        subdomain,
    }
}

export default useSubdomainNavigation
