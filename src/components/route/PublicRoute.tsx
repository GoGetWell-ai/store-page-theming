// src/components/route/PublicRoute.tsx
import { Outlet } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'

const PublicRoute = () => {
    const { layout } = useThemeStore()

    return (
        <div className={layout.current === 'dashboard' ? 'dashboard-layout' : 'default-layout'}>
            <Outlet />
        </div>
    )
}

export default PublicRoute