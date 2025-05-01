import React from 'react'
import { BiGlobe, BiPhone, BiUser } from 'react-icons/bi'
import { BsInstagram, BsMailbox, BsTwitter } from 'react-icons/bs'
import { PiMapPinPlus } from 'react-icons/pi'

interface GetInTouchProps {
    hcfData: any
}

const GetInTouch: React.FC<GetInTouchProps> = ({ hcfData }) => {
    console.log('here is footer hcf data', hcfData)

    return (
        <div className="w-full bg-background py-16">
            <div className="max-w-[1538px] mx-auto px-6">
                <div className=" md:flex items-center gap-12 justify-between">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-300">
                                Let's get in touch!
                            </h2>
                            <p className="text-gray-600">
                                Got questions about Treatment or Travel? Our
                                team is here to help. Contact us for quick and
                                friendly support.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                                {hcfData?.name || 'N/A'}
                            </h3>

                            <div className="space-y-4">
                                <a
                                    href={`tel:${hcfData?.phone || hcfData?.phoneNumber}`}
                                    className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                                >
                                    <BiPhone className="w-5 h-5" />
                                    <span>
                                        {hcfData?.phone ||
                                            hcfData?.phoneNumber ||
                                            'N/A'}
                                    </span>
                                </a>

                                <a
                                    href={`mailto:${hcfData?.auth?.email || hcfData?.email}`}
                                    className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                                >
                                    <BsMailbox className="w-5 h-5" />
                                    <span>
                                        {hcfData?.auth?.email ||
                                            hcfData?.email ||
                                            'example@gmail.com'}
                                    </span>
                                </a>

                                <div className="flex items-center gap-3 text-gray-600">
                                    <PiMapPinPlus className="w-5 h-5" />
                                    <span>{`${hcfData?.address?.postalCode}, ${hcfData?.address?.street}, ${hcfData?.address?.city}, ${hcfData?.address?.country}`}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-300">
                                    Connect with us
                                </h4>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <BsInstagram className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <BsTwitter className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber}&text=Hi!%20Dear,%20I%20have%20a%20inquiry`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 bg-gradient-to-r from-primary-deep to-primary !text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                        >
                            <BsMailbox className="w-5 h-5" />
                            Contact{' '}
                            {hcfData?.type === 'hcf' ? 'HCF' : 'Hospital'}
                        </a>
                    </div>

                    <div className="bg-background dark:bg-black/60 rounded-2xl shadow-xl p-8 min-w-[200px] w-full max-w-[400px] mt-4 md:mt-0">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-6">
                            Bio of{' '}
                            {hcfData?.type === 'hcf' ? 'HCF' : 'Hospital'}
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-background  rounded-xl">
                                <div className="flex items-center gap-3">
                                    <PiMapPinPlus className="w-5 h-5 text-primary" />
                                    <span className="text-gray-600">
                                        Location
                                    </span>
                                </div>
                                <span className="text-gray-900 dark:text-gray-300">
                                    {hcfData?.address?.country || 'N/a'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-background  rounded-xl">
                                <div className="flex items-center gap-3">
                                    <BiGlobe className="w-5 h-5 text-primary" />
                                    <span className="text-gray-600">
                                        Language
                                    </span>
                                </div>
                                <span className="text-gray-900 dark:text-gray-300">
                                    {hcfData?.languages?.length
                                        ? hcfData?.languages.map(
                                              (data) => ` ${data},`,
                                          )
                                        : ''}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-background  rounded-xl">
                                <div className="flex items-center gap-3">
                                    <BiUser className="w-5 h-5 text-primary" />
                                    <span className="text-gray-600">
                                        Gender
                                    </span>
                                </div>
                                <span className="text-gray-900 dark:text-gray-300">
                                    {hcfData?.gender || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch
