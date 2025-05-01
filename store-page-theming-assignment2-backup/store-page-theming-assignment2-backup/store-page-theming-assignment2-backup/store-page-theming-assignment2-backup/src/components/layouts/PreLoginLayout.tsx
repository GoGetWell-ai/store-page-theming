import authRoute from '@/configs/routes.config/authRoute'
import { protectedRoutes } from '@/configs/routes.config/routes.config'
import { useLocation } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import type { CommonProps } from '@/@types/common'

const PreLoginLayout = ({ children }: CommonProps) => {
    const location = useLocation()

    const { pathname } = location

    const allRoutes = [...authRoute, ...protectedRoutes]

    const isAuthPath = allRoutes.some((route) => route.path === pathname)
    const path = allRoutes.find((route) => route.path === pathname)

    return (
        <div className="flex flex-auto flex-col h-[100vh]">
            {isAuthPath ? <AuthLayout path={path}>{children}</AuthLayout> : children}
        </div>
    )
}

export default PreLoginLayout
