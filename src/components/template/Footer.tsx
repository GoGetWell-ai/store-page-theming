import Container from '@/components/shared/Container'
import classNames from '@/utils/classNames'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'

export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
    className?: string
}

const FooterContent = () => {
    return (
        <div className="flex items-center justify-between flex-auto w-full">
            <span className="dark:text-text-light">
                Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                <span className="font-semibold dark:text-text">{`${APP_NAME}`}</span> All
                rights reserved.
            </span>
            <div className="">
                <a
                    className="text-gray dark:text-text-light hover:text-primary dark:hover:text-primary-mild"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Term & Conditions
                </a>
                <span className="mx-2 text-muted dark:text-gray-500"> | </span>
                <a
                    className="text-gray dark:text-text-light hover:text-primary dark:hover:text-primary-mild"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Privacy & Policy
                </a>
            </div>
        </div>
    )
}

export default function Footer({
    pageContainerType = 'contained',
    className,
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X} bg-white dark:bg-card-bg dark:border-t dark:border-border`,
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
