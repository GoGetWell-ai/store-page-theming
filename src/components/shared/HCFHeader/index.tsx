import { Button } from '@/components/ui'
import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import UploadMedicalReports from '../UploadMedicalReports'

interface HCFHeaderProps {
    leftSide: ReactNode
}

const HCFHeader: React.FC<HCFHeaderProps> = ({ leftSide }) => {
    const [uploadReport, setUploadReport] = useState(false)
    const [searchParams] = useSearchParams()
    const { pathname } = useLocation()

    useEffect(() => {
        console.log("searchParams.get('status')", searchParams.get('status'))
        if (searchParams.get('status') === 'upload') {
            setUploadReport(true)
        }
    }, [pathname, searchParams.get('status')])

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900">
            <div className="px-4 p-8 md:p-16 mx-auto max-w-[1538px] w-full block sm:flex items-center justify-between">
                <div className="absolute top-0 left-0 w-full h-full bg-[#00000031]"></div>

                <div className="w-full z-[1] relative max-w-[700px] mx-auto">
                    {leftSide}
                    <div className="flex gap-4 items-center mt-4 sm:mt-8 justify-center">
                        <Button
                            type="button"
                            className="min-w-[150px] rounded-[5px] bg-primary border-0 text-white hover:text-white"
                        >
                            Upload now
                        </Button>

                        {uploadReport && (
                            <UploadMedicalReports
                                setPopupStatus={setUploadReport}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HCFHeader
