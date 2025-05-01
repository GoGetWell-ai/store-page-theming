// src/configs/routes.config.ts
import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [
    ...authRoute,
    {
        key: 'themes',
        path: '/themes',
        component: lazy(() => import('@/views/Home/Themes')),
        authority: [],
        meta: {
            layout: 'default',
            footer: true,
            pageContainerType: 'default'
        }
    }
]

export const protectedRoutes: Routes = [] 