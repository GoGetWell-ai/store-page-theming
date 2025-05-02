import { apiGetDoctors } from '@/services/DoctorService';
import React, { useEffect, useState } from 'react';
import { CgLock } from 'react-icons/cg';
import { LuBuilding2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

interface TopDoctorsProps {
    hcfData: {
        doctors: any
    }
}

interface Doctor {
    _id: string;
    name: string;
    designation?: string;
    experience?: {
        surgeries?: string;
    };
    hospitals?: string[];
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ hcfData }) => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        if (hcfData?.doctors?.length) {
            setDoctors(hcfData.doctors.slice(0, 3) || []);
        }
    }, [hcfData]);

    useEffect(() => {
        const callApi = async () => {
            if (doctors.length < 3) {
                const limit = 3 - doctors.length;
                try {
                    const data = await apiGetDoctors({ page: 1, limit, search: '' });
                    if (data?.data) {
                        setDoctors(prev => [...prev, ...data.data]);
                    }
                } catch (err) {
                    console.log('error', err);
                }
            }
        }

        callApi();
    }, [doctors]);

    return (
        <div className="w-full bg-gradient-to-b py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-12">
                    Top Doctors
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.slice(0, 3).map((doctor) => (
                        <div
                            key={doctor._id}
                            className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full"
                        >
                            {/* Uncomment if you want to add images back
                            <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
                                <img
                                    src={doctor.profileImage}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://doctoryouneed.org/wp-content/uploads/2020/08/dummy_gn-300x300.jpg';
                                    }}
                                />
                            </div> */}

                            <div className="p-6 flex-grow">
                                <h2 className="text-xl font-bold text-primary mb-2">{doctor.name}</h2>
                                <p className="text-sm text-gray-600 mb-4">{doctor.designation || 'Specialist'}</p>

                                <div className="space-y-3">
                                    <InfoRow
                                        icon={<CgLock className="w-4 h-4" />}
                                        label="Experience"
                                        value={doctor.experience?.surgeries || 'N/A'}
                                    />
                                    <InfoRow
                                        icon={<LuBuilding2 className="w-4 h-4" />}
                                        label="Hospital"
                                        value={doctor.hospitals?.[0] || 'N/A'}
                                        className="line-clamp-1"
                                    />
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    onClick={() => navigate(`/doctors/${doctor._id}`)}
                                    className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    More details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate('/doctors')}
                        className="bg-white hover:bg-primary/5 text-primary border border-primary/20 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, className = '' }) => (
    <div className="flex items-center text-sm">
        <div className="text-primary/60">{icon}</div>
        <span className="ml-2 text-gray-500">{label}:</span>
        <span className={`ml-2 text-gray-700 font-medium truncate ${className}`}>{value}</span>
    </div>
);

export default TopDoctors;