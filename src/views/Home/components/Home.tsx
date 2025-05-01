import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import MenuBar from '@/components/shared/MenuBar'

const Hero: React.FC = () => {
    const { specialty } = useThemeStore()

    // Theme-specific content
    const getThemeContent = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    title: 'Leading Organ Transplant Center',
                    subtitle:
                        'Giving the gift of life through advanced transplant procedures',
                    description:
                        'Our world-class transplant center provides comprehensive care for patients needing organ transplantation. With cutting-edge technology and a compassionate approach, we&apos;re committed to giving patients a second chance at life.',
                    features: [
                        'Comprehensive pre and post-transplant care',
                        'Living donor programs',
                        'Leading-edge transplant surgery techniques',
                        'Multidisciplinary transplant teams',
                    ],
                    ctaText: 'Schedule a Consultation',
                    imageSrc: '/img/hospitals/hospital2.jpg',
                }
            case 'cosmeticSurgery':
                return {
                    title: 'Transform Your Confidence',
                    subtitle:
                        'Premium cosmetic procedures tailored to your vision',
                    description:
                        'Our cosmetic surgery clinic offers a range of procedures designed to enhance your natural beauty and restore your confidence. Our board-certified surgeons provide personalized care with stunning, natural-looking results.',
                    features: [
                        'Facial rejuvenation procedures',
                        'Body contouring and sculpting',
                        'Non-invasive cosmetic treatments',
                        'Reconstructive surgery options',
                    ],
                    ctaText: 'Book Your Consultation',
                    imageSrc: '/img/hospitals/hospital1.jpg',
                }
            default:
                return {
                    title: 'Advanced Healthcare Solutions',
                    subtitle: 'Innovative care for better health outcomes',
                    description:
                        'Our healthcare center provides comprehensive medical services with a focus on patient-centered care. Using the latest medical technologies and evidence-based practices, we strive to deliver the best possible health outcomes.',
                    features: [
                        'Primary and specialty care',
                        'Advanced diagnostic services',
                        'Personalized treatment plans',
                        'Preventive health programs',
                    ],
                    ctaText: 'Make an Appointment',
                    imageSrc: '/img/hospitals/hospital3.jpg',
                }
        }
    }

    const content = getThemeContent()

    return (
        <div className="bg-background">
            <MenuBar />
            {/* Hero Section */}
            <div className="relative">
                <div
                    className="absolute inset-0 hero-overlay"
                    aria-hidden="true"
                ></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-24 md:py-32">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            {content.title}
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl text-white">
                            {content.subtitle}
                        </p>
                        <div className="mt-10">
                            <button className="button-gradient text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition duration-300">
                                {content.ctaText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div>
                        <h1 className="font-bold">
                            Why Choose Our{' '}
                            {specialty === 'organTransplant'
                                ? 'Transplant Center'
                                : specialty === 'cosmeticSurgery'
                                  ? 'Cosmetic Surgery Clinic'
                                  : 'Healthcare Center'}
                        </h1>
                        <p className="mt-4 text-lg text-text-light">
                            {content.description}
                        </p>
                        <div className="mt-8">
                            <ul className="space-y-4">
                                {content?.features?.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-6 w-6 text-primary"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-3 text-base text-text">
                                            {feature}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0">
                        <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
                            <img
                                className="object-cover"
                                src={content.imageSrc}
                                alt={`${specialty || 'default'} healthcare facility`}
                            />
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="mt-16" id='services'>
                    <h1 className=" font-bold mb-8">Our Services</h1>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1 */}
                        <div className="bg-card-bg border border-card-border rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="bg-primary-subtle inline-flex p-3 rounded-md mb-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold">
                                    {specialty === 'organTransplant'
                                        ? 'Heart Transplantation'
                                        : specialty === 'cosmeticSurgery'
                                          ? 'Facial Rejuvenation'
                                          : 'Cardiology Services'}
                                </h3>
                                <p className="mt-3 text-text-light">
                                    {specialty === 'organTransplant'
                                        ? 'Advanced heart transplant procedures for end-stage heart failure patients.'
                                        : specialty === 'cosmeticSurgery'
                                          ? 'Comprehensive facial procedures to restore youthful appearance and confidence.'
                                          : 'Comprehensive cardiac care including diagnostic testing and interventional procedures.'}
                                </p>
                                <a
                                    href="#"
                                    className="mt-4 inline-flex items-center text-primary hover:text-primary-deep"
                                >
                                    Learn more
                                    <svg
                                        className="ml-2 h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-card-bg border border-card-border rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="bg-primary-subtle inline-flex p-3 rounded-md mb-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-8.092.67L4 10.172a3 3 0 00.879-2.12L6.047 6.172z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-heading">
                                    {specialty === 'organTransplant'
                                        ? 'Kidney Transplantation'
                                        : specialty === 'cosmeticSurgery'
                                          ? 'Body Contouring'
                                          : 'Diagnostic Imaging'}
                                </h3>
                                <p className="mt-3 text-text-light">
                                    {specialty === 'organTransplant'
                                        ? 'Innovative kidney transplant solutions for patients with renal failure.'
                                        : specialty === 'cosmeticSurgery'
                                          ? 'Sculpt and refine your body with our advanced contouring procedures.'
                                          : 'Comprehensive imaging services using state-of-the-art technology for accurate diagnosis.'}
                                </p>
                                <a
                                    href="#"
                                    className="mt-4 inline-flex items-center text-primary hover:text-primary-deep"
                                >
                                    Learn more
                                    <svg
                                        className="ml-2 h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-card-bg border border-card-border rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="bg-primary-subtle inline-flex p-3 rounded-md mb-4">
                                    <svg
                                        className="h-6 w-6 text-primary"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-heading">
                                    {specialty === 'organTransplant'
                                        ? 'Transplant Evaluation'
                                        : specialty === 'cosmeticSurgery'
                                          ? 'Non-Surgical Treatments'
                                          : 'Preventive Medicine'}
                                </h3>
                                <p className="mt-3 text-text-light">
                                    {specialty === 'organTransplant'
                                        ? 'Comprehensive evaluation process to determine transplant candidacy and improve outcomes.'
                                        : specialty === 'cosmeticSurgery'
                                          ? 'Minimally invasive procedures for facial rejuvenation with little to no downtime.'
                                          : 'Personalized preventive care programs to maintain health and prevent disease.'}
                                </p>
                                <a
                                    href="#"
                                    className="mt-4 inline-flex items-center text-primary hover:text-primary-deep"
                                >
                                    Learn more
                                    <svg
                                        className="ml-2 h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-primary rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
                        <div className="lg:w-0 lg:flex-1">
                            <h2 className="tracking-tight text-white">
                                Ready to{' '}
                                {specialty === 'organTransplant'
                                    ? 'learn more about our transplant programs'
                                    : specialty === 'cosmeticSurgery'
                                      ? 'transform your appearance'
                                      : 'take the next step for your health'}
                                ?
                            </h2>
                            <p className="mt-4 max-w-3xl text-lg text-text text-white">
                                Our team of specialists is here to provide
                                personalized care and answer all your questions.
                            </p>
                        </div>
                        <div className="mt-8 lg:mt-0 lg:ml-8">
                            <button className="button-gradient text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition duration-300">
                                Contact Us Today
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
