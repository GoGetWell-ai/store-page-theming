import authRoute from '@/configs/routes.config/authRoute'
import { Routes } from '@/@types/routes'
import { publicRoutes, protectedRoutes } from '@/configs/routes.config'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useSubdomainNavigation = () => {
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

    const subdomainRoute = authRoute.find((route) => route.path === pathname)

    useEffect(() => {
        if (subdomainRoute) {
            navigate('/')
        }
    }, [subdomainRoute, navigate])

    let newPublicRoutes: Routes = publicRoutes
    let newProtectedRoutes: Routes = protectedRoutes

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
