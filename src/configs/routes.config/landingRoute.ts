import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const landingRoute: Routes = [
  {
    key: 'landing',
    path: '/',
    component: lazy(() => import('@/views/landing/LandingPage')),
    authority: [],
  }
]

export default landingRoute