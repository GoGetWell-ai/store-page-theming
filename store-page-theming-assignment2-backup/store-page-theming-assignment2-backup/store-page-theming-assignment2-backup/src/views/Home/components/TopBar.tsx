import { useNavigate } from 'react-router-dom'
import { useState, useEffect, ReactNode } from 'react'
import { Button, Notification, toast } from '@/components/ui'
import PatientSignUpPopup from '@/views/auth/PatientSignUp/Popup'
import Logo from '@/components/template/Logo'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAuth } from '@/auth'
import ClaimPopup from '@/components/shared/ClaimPopup'
import { useUserStore } from '@/store/userStore'
import { useHcfHomeStore } from '../store/hcfHomeStore'
import UserDropdown from '@/components/template/UserProfileDropdown'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import HeaderLogo from '@/components/template/HeaderLogo'

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
    const { smaller } = useResponsive()
    const { authenticated } = useAuth()
    const { userDetails } = useUserStore()
    const { setClaimBarStatus } = useHcfHomeStore()
    const navigate = useNavigate()
    const { hcfData } = useAuthStore()

    const [claimElement, setClaimElement] = useState<ReactNode>(
        <ClaimPopup
            buttonChildren={
                <Button className="!py-1 !px-3 rounded-[5px] !h-auto bg-white hover:bg-transparent md:text-blackColor hover:text-white border-[1px] border-transparent hover:border-white font-semibold text-[10.82px] text-nowrap">
                    Claim Now
                </Button>
            }
        />,
    )

    useEffect(() => {
        if (userDetails?.medicalInfo?.medicalReports?.length > 0) {
            // && userDetails?.targetedTreatment
            setClaimElement(
                <Button
                    onClick={() => {
                        localStorage.setItem('claimed', 'yes')

                        toast.push(
                            <Notification
                                title={'Successfully added to your account'}
                                type={'success'}
                            >
                                100$ successfully added to your account
                            </Notification>,
                        )
                        setClaimBarStatus(true)
                        navigate(`/chat-bot`)
                    }}
                    className="!py-1 !px-3 !h-auto bg-white hover:bg-transparent rounded-full md:rounded-xl md:text-blackColor hover:text-white border-[1px] border-transparent hover:border-white font-semibold text-[10.82px] text-nowrap"
                >
                    Claim Now
                </Button>,
            )
        }
    }, [userDetails])

    return (
        <header className="bg-white border-gray-200">
            <div className="bg-[#63559A] w-full">
                <div className="w-[100%] md:w-[50%] lg:w-[30%] py-2 px-4 flex justify-between items-center max-w-[1538px] mx-auto">
                    <h6 className="font-semibold text-white text-[14px] sm:text-[16px] md:text-sm">
                        Get Free Estimate and $100 Credits
                    </h6>

                    {!authenticated ? (
                        <PatientSignUpPopup
                            buttonChildren={
                                <Button className="!py-1 h-auto !px-3 bg-white hover:bg-transparent rounded-full md:rounded-xl md:text-blackColor hover:text-white border-[1px] border-transparent hover:border-white font-semibold text-[10.82px] text-nowrap">
                                    Claim Now
                                </Button>
                            }
                            popupButtonStatus={true}
                            openedFrom="claim"
                        />
                    ) : (
                        claimElement
                    )}
                </div>
            </div>
            {smaller.lg && (
                <div className="w-full py-[10px] bg-white px-[5%] flex items-center justify-between">
                    <div className="max-w-[150px]">
                        <HeaderLogo />
                    </div>

                    <UserDropdown />
                </div>
            )}
        </header>
    )
}

export default TopBar
