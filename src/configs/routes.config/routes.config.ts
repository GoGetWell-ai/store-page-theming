import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { lazy } from 'react'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'root',
        path: '/',
        component: lazy(() => import('@/views/Home')),
        authority: [],
        meta: {
            layout: 'classic',
        }
    },
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
        meta: {
            layout: 'classic',
        }
    },
    {
        key: 'themes',
        path: '/themes',
        component: lazy(() => import('@/views/Themes')),
        authority: [],
        meta: {
            layout: 'classic',
        }
    }
]
