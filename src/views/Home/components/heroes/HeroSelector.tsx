import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import DefaultHero from './DefaultHero'
import OrganTransplantHero from './OrganTransplantHero'
import CosmeticSurgeryHero from './CosmeticSurgeryHero'

/**
 * HeroSelector Component
 *
 * Dynamically displays the appropriate hero component based on the active theme specialty.
 * Uses the theme store to determine which hero to render.
 */
const HeroSelector: React.FC = () => {
    // Get the current specialty from the theme store
    const specialty = useThemeStore((state) => state.specialty)

    // Return the appropriate hero component based on specialty
    switch (specialty) {
        case 'organTransplant':
            return <OrganTransplantHero />
        case 'cosmeticSurgery':
            return <CosmeticSurgeryHero />
        case 'default':
        default:
            return <DefaultHero />
    }
}

export default HeroSelector
