import { apiGetDoctors } from '@/services/DoctorService';
import React, { useEffect, useState } from 'react';
import { CgLock } from 'react-icons/cg';
import { LuBuilding2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/store/themeStore';

interface TopDoctorsProps {
    hcfData: {
        doctors: any
    }
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ hcfData }) => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<any>([]);
    const [isVisible, setIsVisible] = useState(false);
    const { specialty } = useThemeStore();
    
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Get theme specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    titleGradient: 'from-teal-600 to-cyan-500',
                    cardBg: 'bg-gradient-to-br from-teal-50 to-white',
                    cardBorder: 'border-teal-100',
                    nameColor: 'text-teal-700',
                    iconColor: 'text-teal-500',
                    buttonGradient: 'bg-gradient-to-r from-teal-600 to-teal-400',
                    loadMoreBorder: 'border-teal-300',
                    loadMoreText: 'text-teal-600',
                    loadMoreHover: 'hover:bg-teal-50',
                    sectionBg: 'bg-gradient-to-b from-white to-teal-50'
                };
            case 'cosmeticSurgery':
                return {
                    titleGradient: 'from-pink-600 to-purple-500',
                    cardBg: 'bg-gradient-to-br from-pink-50 to-white',
                    cardBorder: 'border-pink-100',
                    nameColor: 'text-pink-700',
                    iconColor: 'text-pink-500',
                    buttonGradient: 'bg-gradient-to-r from-pink-600 to-pink-400',
                    loadMoreBorder: 'border-pink-300',
                    loadMoreText: 'text-pink-600',
                    loadMoreHover: 'hover:bg-pink-50',
                    sectionBg: 'bg-gradient-to-b from-white to-pink-50'
                };
            default:
                return {
                    titleGradient: 'from-blue-600 to-indigo-500',
                    cardBg: 'bg-white',
                    cardBorder: 'border-blue-100',
                    nameColor: 'text-primary',
                    iconColor: 'text-primary/60',
                    buttonGradient: 'bg-gradient-to-r from-blue-600 to-blue-400',
                    loadMoreBorder: 'border-primary/20',
                    loadMoreText: 'text-primary',
                    loadMoreHover: 'hover:bg-primary/5',
                    sectionBg: 'bg-gradient-to-b from-white to-blue-50'
                };
        }
    };

    const themeClasses = getThemeClasses();

    useEffect(() => {
        if (hcfData?.doctors?.length) {
            setDoctors(hcfData?.doctors?.slice(0, 3) || [])
        }
    }, [hcfData])

    useEffect(() => {
        const callApi = async () => {
            if (doctors.length < 3) {
                const limit = 3 - doctors.length;
                try {
                    const data = await apiGetDoctors({ page: 1, limit, search: '' })
                    if (data?.data) {
                        setDoctors((prv) => [...prv, ...data.data])
                    }
                } catch (err) {
                    console.log('error', err);
                }
            }
        }

        callApi();
    }, [doctors])

    return (
        <div className={`w-full ${themeClasses.sectionBg} py-12 md:py-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className={`text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.titleGradient}`}>
                        Top Doctors
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Connect with our highly skilled medical professionals specialized in various fields
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
                    {doctors.slice(0, 3).map((doctor, index) => (
                        <div
                            key={doctor._id}
                            className={`${themeClasses.cardBg} rounded-xl shadow-md border ${themeClasses.cardBorder} hover-lift transition-all duration-300 overflow-hidden group`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="p-5">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4 shadow-sm">
                                        <img
                                            src={doctor.profileImage}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://doctoryouneed.org/wp-content/uploads/2020/08/dummy_gn-300x300.jpg';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h2 className={`text-xl font-bold ${themeClasses.nameColor} mb-1`}>{doctor.name}</h2>
                                        <p className="text-sm text-gray-600">{doctor.designation || 'Specialist'}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    <InfoRow
                                        icon={<CgLock className="w-4 h-4" />}
                                        label="Experience"
                                        value={doctor.experience?.surgeries || 'N/A'}
                                        iconColor={themeClasses.iconColor}
                                    />
                                    <InfoRow
                                        icon={<LuBuilding2 className="w-4 h-4" />}
                                        label="Hospital"
                                        value={doctor.hospitals?.[0] || 'N/A'}
                                        className="line-clamp-1"
                                        iconColor={themeClasses.iconColor}
                                    />
                                </div>

                                <button
                                    onClick={() => navigate(`/doctors/${doctor._id}`)}
                                    className={`mt-6 w-full ${themeClasses.buttonGradient} text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg btn-ripple`}
                                >
                                    More details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate(`/doctors`)}
                        className={`bg-white ${themeClasses.loadMoreHover} ${themeClasses.loadMoreText} border ${themeClasses.loadMoreBorder} px-8 py-3 rounded-lg font-medium transition-all duration-300 hover-scale shadow-sm`}
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value, className = '', iconColor }) => (
    <div className="flex items-center text-sm">
        <div className={`${iconColor}`}>{icon}</div>
        <span className="ml-2 text-gray-500">{label}:</span>
        <span className={`ml-2 text-gray-700 font-medium truncate ${className}`}>{value}</span>
    </div>
);

export default TopDoctors;