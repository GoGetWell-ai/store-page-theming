import Container from '@/components/shared/Container'
import classNames from '@/utils/classNames'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import { useThemeStore } from '@/store/themeStore'

export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
    className?: string
}

const FooterContent = () => {
    const { specialty } = useThemeStore()

    // Get theme specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    footerBg: 'bg-gradient-to-r from-teal-50 to-cyan-50',
                    buttonGradient:
                        'bg-gradient-to-r from-teal-600 to-teal-400',
                    linkColor: 'text-teal-600 hover:text-teal-700',
                    borderColor: 'border-teal-100',
                }
            case 'cosmeticSurgery':
                return {
                    footerBg: 'bg-gradient-to-r from-pink-50 to-purple-50',
                    buttonGradient:
                        'bg-gradient-to-r from-pink-600 to-pink-400',
                    linkColor: 'text-pink-600 hover:text-pink-700',
                    borderColor: 'border-pink-100',
                }
            default:
                return {
                    footerBg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
                    buttonGradient:
                        'bg-gradient-to-r from-blue-600 to-blue-400',
                    linkColor: 'text-primary hover:text-primary-deep',
                    borderColor: 'border-blue-100',
                }
        }
    }

    const themeClasses = getThemeClasses()

    return (
        <div className="flex flex-col md:flex-row items-center justify-between flex-auto w-full gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <span className="font-semibold text-gray-700">{`${APP_NAME}`}</span>
                <span className="text-gray-500 text-sm">
                    Copyright &copy; {`${new Date().getFullYear()}`} All rights
                    reserved.
                </span>
            </div>
            <div className="flex items-center gap-6">
                <a
                    className={`${themeClasses.linkColor} text-sm transition-colors`}
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Terms & Conditions
                </a>
                <a
                    className={`${themeClasses.linkColor} text-sm transition-colors`}
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Privacy Policy
                </a>
                <button
                    className={`${themeClasses.buttonGradient} text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md btn-ripple text-sm font-medium`}
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    Back to Top
                </button>
            </div>
        </div>
    )
}

export default function Footer({
    pageContainerType = 'contained',
    className,
}: FooterProps) {
    const { specialty } = useThemeStore()

    // Get theme specific classes for footer background
    const getFooterBg = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'bg-gradient-to-b from-white to-teal-50/30'
            case 'cosmeticSurgery':
                return 'bg-gradient-to-b from-white to-pink-50/30'
            default:
                return 'bg-gradient-to-b from-white to-blue-50/30'
        }
    }

    const footerBg = getFooterBg()

    return (
        <footer
            className={classNames(
                `footer py-8 flex flex-auto items-center ${PAGE_CONTAINER_GUTTER_X} ${footerBg}`,
                className,
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
