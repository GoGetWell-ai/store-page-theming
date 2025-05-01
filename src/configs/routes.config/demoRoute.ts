import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const demoRoute: Routes = [
  {
    key: 'theme-demo',
    path: '/demo/theme',
    component: lazy(() => import('@/views/demo/ThemeDemo')),
    authority: [],
  }
]

export default demoRoute