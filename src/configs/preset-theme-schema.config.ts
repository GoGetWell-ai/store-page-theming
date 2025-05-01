import baseColors from '@/views/Home/themes/base/colors'
import baseTypography from '@/views/Home/themes/base/typography'
import theme1Colors from '@/views/Home/themes/theme1/colors'
import theme1Typography from '@/views/Home/themes/theme1/typography'
import theme2Colors from '@/views/Home/themes/theme2/colors'
import theme2Typography from '@/views/Home/themes/theme2/typography'

const presetThemeSchemaConfig = {
    default: {
        light: { ...baseColors.light, ...baseTypography },
        dark: { ...baseColors.dark, ...baseTypography },
    },
    organTransplant: {
        light: { ...theme1Colors.light, ...theme1Typography },
        dark: { ...theme1Colors.dark, ...theme1Typography },
    },
    cosmeticSurgery: {
        light: { ...theme2Colors.light, ...theme2Typography },
        dark: { ...theme2Colors.dark, ...theme2Typography },
    },
}

export default presetThemeSchemaConfig
