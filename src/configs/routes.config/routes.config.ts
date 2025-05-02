

import { lazy } from 'react' 
import authRoute from './authRoute' 
import type { Routes } from '@/@types/routes' 


export const publicRoutes: Routes = [
  ...authRoute, // ✅ Spread any auth-related routes here

  {
    key: 'themes', // Unique key for this route (used in menus or mapping)
    path: '/themes', // URL path that opens the Theme Preview Page
    component: lazy(() => import('@/views/Home/themes')), 
    // ✅ This will load the themes component from "src/views/Home/themes.tsx" (or .tsx/.jsx)

    authority: [], // 🛑 No role-based access control — anyone can access this route

    meta: {
      layout: 'default', 
      // ✅ 'default' layout will be applied (you can also use 'blank' or custom layouts if available)
    },
  },
]


export const protectedRoutes: Routes = []

