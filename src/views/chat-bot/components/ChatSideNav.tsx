import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ChatHistory from './ChatHistory'
import { usGenerativeChatStore } from '../store/generativeChatStore'
import useDebounce from '@/utils/hooks/useDebounce'
import classNames from '@/utils/classNames'
import { TbSearch } from 'react-icons/tb'
import type { ChangeEvent } from 'react'
import type { CardProps } from '@/components/ui/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useSessionUser } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import AppointmentPopup from '@/components/shared/AppointmentPopup'
import UploadMedicalReports from '@/components/shared/UploadMedicalReports'
import { apiGetPatientAppointment } from '@/services/AppointmentService'
import useSWR from 'swr'
import Loading from '@/components/shared/Loading'
import { Alert, Badge } from '@/components/ui'
import TextEllipse from '@/components/ui/TextEllipse'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useHcfHomeStore } from '@/views/HCFS/Home/store/hcfHomeStore'
import { useAppointmentListStore } from '@/views/Appointments/store/appointmentListStore'
import useResponsive from '@/utils/hooks/useResponsive'
import SkeletonLoader from '@/components/shared/SkeletonLoader'
import { useAuth } from '@/auth'
import { FiHelpCircle, FiUser } from 'react-icons/fi'
import AppointmentsIcon from '@/assets/svg/AppointmentsIcon'
import TreatmentPlanIcon from '@/assets/svg/TreatmentPlanIcon'
import MedicalInfoIcon from '@/assets/svg/MedicalInfoIcon'
import TravelDetailsIcon from '@/assets/svg/TravelDetailsIcon'
import OtherDetailsIcon from '@/assets/svg/OtherDetailsIcon'

type ChatSideNavProps = Pick<CardProps, 'className' | 'bodyClass'> & {
    onClick?: () => void
}

const statusColors = {
    inquiry: 'bg-gray-400',         // Neutral gray for inquiry
    planning: 'bg-blue-400',        // Blue for planning
    post_treatment: 'bg-purple-500',// Purple for post-treatment
    assessment: 'bg-yellow-400',    // Yellow for assessment
    completed: 'bg-green-500',      // Green for completed
    scheduled: 'bg-teal-500',       // Teal for scheduled
    in_treatment: 'bg-red-500',     // Red for in-treatment
};

const ChatSideNav = ({ className, bodyClass, onClick }: ChatSideNavProps) => {
    const [queryText, setQueryText] = useState('')
    const user = useSessionUser(state => state.user);
    const [uploadReportPopupStatus, setUploadReportPopupStatus] = useState(false)
    const { userDetails } = useUserStore()
    const { hcfData } = useAuthStore()
    const { smaller } = useResponsive()

    const { setAppointmentList, appointmentList } = useAppointmentListStore()
    const [data, setData] = useState([])

    const navigate = useNavigate();
    const { authenticated } = useAuth()

    const { setSelectedConversation, setSuggestedQuestions, setConversationMessages } = usGenerativeChatStore()

    function handleDebounceFn(e: ChangeEvent<HTMLInputElement>) {
        setQueryText?.(e.target.value)
    }

    const debounceFn = useDebounce(handleDebounceFn, 500)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e)
    }

    const handleNewChat = () => {
        setSelectedConversation('')
        setSuggestedQuestions([])
        setConversationMessages([])
        navigate(`/chat-bot`)
        // onClick?.()
    }


    const { data: appointmentNewData, isLoading } = useSWR(
        [`/api/appointments/${user.authId}`],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_]) =>
            apiGetPatientAppointment({ pageIndex: 1, pageSize: 4, query: '' }),
        {
            revalidateOnFocus: false,
        },
    )

    useEffect(() => {
        if (appointmentNewData?.data?.length > appointmentList?.length) {
            setAppointmentList(appointmentNewData.data)
        }
    }, [appointmentNewData])


    useEffect(() => {
        setData(appointmentList.slice(0, 4))
    }, [appointmentList])

    const [historyVH, setHistoryVH] = useState(0)

    useEffect(() => {
        const firstCard = document.querySelector('.short-cart-menu');
        const handleVh = () => {
            if (firstCard) {
                const heightInPx = firstCard.offsetHeight;
                // Use a more stable way to calculate vh
                const vh = (heightInPx / document.documentElement.clientHeight) * 100;

                if (smaller.lg) {
                    setHistoryVH(100 - vh + 8);
                } else {
                    setHistoryVH(100 - vh);
                }
            }
        };

        const handleResize = () => {
            requestAnimationFrame(handleVh); // Avoid layout thrashing
        };

        handleVh(); // Initial call

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [data, smaller.lg]);


    return (
        <div className='flex flex-col gap-y-2 h-full mt-[1%] !sticky top-[10px]'>
            <Card bodyClass='px-3 short-cart-menu' className='rounded-[5px] xl:max-w-[320px]'>

                <div className='flex mb-[10px] items-center gap-x-[10px]'>
                    <p>Stage:</p>
                    <Badge
                        className={`${statusColors[userDetails?.stage] || 'bg-gray-300'} capitalize`} // Default gray if status is unknown
                        content={userDetails?.stage ? userDetails?.stage.replace('_', ' ') : 'inquiry'} // Replace underscores with spaces for better readability
                    />
                </div>
                {
                    (user?.role?.[0] === 'patient') && (
                        <Button className='rounded-[5px]' block onClick={() => setUploadReportPopupStatus(true)}>
                            Upload Reports
                        </Button>
                    )
                }
                {
                    isLoading ? (
                        <div className='flex flex-col gap-y-[10px]'>
                            <SkeletonLoader height={25} className='' />
                            <SkeletonLoader height={25} className='' />
                        </div>
                    ) : data?.length ? (
                        <div className='mt-3'>
                            <h6>Appointments:</h6>
                            <div className='flex flex-col gap-y-[10px] mt-1 ml-1'>
                                {
                                    data.slice(0, 1)?.map((data: any, i: number) => (
                                        <div className='flex items-center justify-between w-full' key={i}>
                                            <TextEllipse maxLength={18} text={data?.doctorName || 'N/A'} className='font-bold capitalize' />
                                            <Badge
                                                className={`${data?.status === 'pending'
                                                    ? 'bg-yellow-400'
                                                    : data?.status === 'completed'
                                                        ? 'bg-green-500'
                                                        : data?.status === 'canceled'
                                                            ? 'bg-red-500'
                                                            : data?.status === 'confirmed'
                                                                ? 'bg-blue-500'
                                                                : 'bg-gray-300'
                                                    } capitalize`}
                                                content={data?.status}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                data?.length > 1 && (
                                    <Link
                                        className='w-full rounded-[5px] mt-2 text-primary hover:underline text-center table mx-auto'
                                        to={`/patient/profile`}
                                    >
                                        Load More
                                    </Link>
                                )
                            }
                        </div>
                    ) : (
                        <div>
                            <AppointmentPopup buttonChildren={<Button
                                type="button"
                                className='w-full rounded-[5px] mt-2'
                                block
                            >
                                <span className="block md:hidden">Appointment</span>
                                <span className="hidden md:block">Book Appointment</span>
                            </Button>} />
                        </div>
                    )
                }
                <a href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber}&text=Hi!%20Dear,%20I%20have%20a%20inquiry`} target='_blank' rel='noreferrer' className='rounded-[5px] mt-2 block w-full py-3 border-[1px] text-center'>
                    Contact HCF
                </a>

                {
                    authenticated && (
                        <div className='mt-2'>
                            <div className='flex flex-col gap-y-[10px] mt-1 ml-1'>
                                <Link to={`/patient/profile`} className='flex items-center gap-x-[10px] w-full transition-all duration-300 hover:!gap-x-[15px]'>
                                    <AppointmentsIcon />
                                    <p className='!mt-0 !mb-1 text-primary font-semibold'>Appointments</p>
                                </Link>
                                <Link to={`/patient/profile?type=treatment-plan`} className='flex items-center gap-x-[10px] w-full transition-all duration-300 hover:!gap-x-[15px]'>
                                    <TreatmentPlanIcon />
                                    <p className='!mt-0 text-primary font-semibold'>Treatment Plan</p>
                                </Link>
                                <Link to={`/patient/profile?type=medical-info`} className='flex items-center gap-x-[10px] w-full transition-all duration-300 hover:!gap-x-[15px]'>
                                    <MedicalInfoIcon />
                                    <p className='!mt-0 text-primary font-semibold'>Medical Info</p>
                                </Link>
                                <Link to={`/patient/profile?type=travel-info`} className='flex items-center gap-x-[10px] w-full transition-all duration-300 hover:!gap-x-[15px]'>
                                    <TravelDetailsIcon />
                                    <p className='!mt-0 text-primary font-semibold'>Travel Info</p>
                                </Link>
                                <Link to={`/patient/profile?type=other-info`} className='flex items-center gap-x-[10px] w-full transition-all duration-300 hover:!gap-x-[15px]'>
                                    <OtherDetailsIcon />
                                    <p className='!mt-0 text-primary font-semibold'>Other Info</p>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </Card>
            <Card
                header={{
                    content: (
                        <div className="flex items-center gap-2 px-5 w-full h-[40px] md:h-[60px] xl:border-0 border-t-2">
                            <TbSearch className="text-xl" />
                            <input
                                className="flex-1 h-full placeholder:text-gray-400 placeholder:text-base bg-transparent focus:outline-none heading-text"
                                placeholder="Search chat"
                                onChange={handleInputChange}
                            />
                        </div>
                    ),
                    className: 'p-0',
                }}
                style={{ maxHeight: `${historyVH - 10}vh` }}
                className={classNames('flex-1 xl:max-w-[320px] rounded-[5px] relative overflow-hidden', className)}
                bodyClass={classNames(`${authenticated ? 'h-[calc(100%-120px)' : 'h-[80vh]'}] p-0`, bodyClass)}
            >
                <ChatHistory vh={historyVH} queryText={queryText} onClick={onClick} />
                <div className="px-2 flex flex-col gap-y-[10px] absolute bottom-1 w-full">
                    {
                        user?.role?.[0] === 'patient' && (
                            <Button className='rounded-[5px]' block variant="solid" onClick={handleNewChat}>
                                New chat
                            </Button>
                        )
                    }
                    {uploadReportPopupStatus && <UploadMedicalReports setPopupStatus={setUploadReportPopupStatus} />}
                </div>
            </Card>
        </div>
    )
}

export default ChatSideNav
