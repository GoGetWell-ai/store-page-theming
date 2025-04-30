import authRoute from './authRoute'
import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/',
        component: lazy(() => import('@/views/Home/components/Home')),
        authority: [],
        meta: {
            pageContainerType: 'contained',
            footer: true,
        },
    },
    {
        key: 'themes',
        path: '/themes',
        component: lazy(() => import('@/views/Home/themes')),
        authority: [],
        meta: {
            pageContainerType: 'contained',
            header: {
                title: 'Theme Specialties',
                description: 'Customize the application with different medical specialty themes'
            },
            footer: true,
        },
    }
]
