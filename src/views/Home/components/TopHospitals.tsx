import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { defaultHospitals } from '../data/treatmentTypesData';

interface TopHospitalsProps {
    hcfData?: {
        hospitals?: any[];
    };
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-500">{label}:</span>
        <span className="font-medium">{value}</span>
    </div>
);

const TopHospitals: React.FC<TopHospitalsProps> = ({ hcfData = {} }) => {
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState<any[]>(defaultHospitals.slice(0, 3)); // Initialize with defaults

    useEffect(() => {
        const callApi = async () => {
            try {
                // Safely access hospitals array
                const apiHospitals = hcfData?.hospitals || [];
                const data = apiHospitals.slice(0, 3);

                // Fill remaining slots with default hospitals if needed
                const remainingSlots = Math.max(0, 3 - data.length);
                const fillHospitals = defaultHospitals.slice(0, remainingSlots);

                setHospitals([...data, ...fillHospitals]);
            } catch (err) {
                console.error('Error fetching hospitals:', err);
                // Fallback to default hospitals on error
                setHospitals(defaultHospitals.slice(0, 3));
            }
        };

        callApi();
    }, [hcfData]);

    return (
        <div className="w-full bg-gradient-to-b py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold text-center mb-12">
                    Top Hospitals
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hospitals.map((hospital) => (
                        <div
                            key={hospital._id || hospital.name}
                            onClick={() => hospital._id && navigate(`/hospitals-details/${hospital._id}`)}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group w-full flex flex-col justify-between h-full mx-auto"
                        >
                            <div>
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={hospital.images?.[0] || hospital.galleryImages?.[0] || 'https://media.bizj.us/view/img/10532525/hospital-generic-exterior*900x506x6100-3435-0-0.jpg'}
                                        alt={hospital.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://media.bizj.us/view/img/10532525/hospital-generic-exterior*900x506x6100-3435-0-0.jpg';
                                        }}
                                    />
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2 h-[30px]">
                                        {hospital.name || 'Hospital Name'}
                                    </h2>

                                    <div className="space-y-2 text-gray-600 text-sm">
                                        <InfoRow
                                            label="Established"
                                            value={hospital.establishedYear || 'N/A'}
                                        />
                                        <InfoRow
                                            label="Beds"
                                            value={hospital.infrastructure?.bedCount || 'N/A'}
                                        />
                                        <InfoRow
                                            label="Location"
                                            value={`${hospital.city || 'N/A'}, ${hospital.country || 'N/A'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <Button
                                    block
                                    variant='solid'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        hospital._id && navigate(`/hospitals-details/${hospital._id}`);
                                    }}
                                >
                                    More details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/hospitals')}
                        className="bg-white hover:bg-primary/5 text-primary border border-primary/20 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopHospitals;