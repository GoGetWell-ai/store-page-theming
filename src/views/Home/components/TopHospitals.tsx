import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { defaultHospitals } from '../data/treatmentTypesData';
import { useThemeStore } from '@/store/themeStore';
import { themes } from '@/configs/theme.config';

// Helper function to calculate contrast text color
const getContrastTextColor = (bgColor: string): string => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Define the hospital type
interface Hospital {
  _id: string;
  name: string;
  images?: string[];
  galleryImages?: string[];
  establishedYear?: string;
  infrastructure?: { bedCount?: number };
  city?: string;
  country?: string;
}

// Define the props type
interface TopHospitalsProps {
  hcfData?: {
    hospitals?: Hospital[];
  };
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

const TopHospitals: React.FC<TopHospitalsProps> = ({ hcfData }) => {
  const navigate = useNavigate();
  const { specialty, theme } = useThemeStore();
  const currentTheme = themes[specialty] || themes.default;
  const textColor = getContrastTextColor(currentTheme.colors.background);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = hcfData?.hospitals?.slice(0, 3) || [];
        const limit = 3 - data.length;

        if (limit > 0) {
          const additionalData = defaultHospitals.slice(0, limit);
          setHospitals([...data, ...additionalData]);
        } else {
          setHospitals(data);
        }
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setHospitals(defaultHospitals.slice(0, 3));
      }
    };

    fetchHospitals();
  }, [hcfData]);

  return (
    <div
      className="w-full py-8"
      style={{
        background: `linear-gradient(to bottom, ${currentTheme.colors.background}, ${currentTheme.colors.background})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1
          className="text-center mb-12"
          style={{
            fontSize: currentTheme.typography.fontSize.h1,
            fontWeight: currentTheme.typography.fontWeight.bold,
            color: textColor,
          }}
        >
          Top Hospitals
        </h1>

        {hospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.slice(0, 3).map((hospital) => (
              <div
                key={hospital._id}
                onClick={() => navigate(`/hospitals-details/${hospital._id}`)}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group w-full flex flex-col justify-between h-full mx-auto"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderRadius: currentTheme.button.borderRadius,
                }}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        hospital.images?.[0] ||
                        hospital.galleryImages?.[0] ||
                        'https://media.bizj.us/view/img/10532525/hospital-generic-exterior*900x506x6100-3435-0-0.jpg'
                      }
                      alt={hospital.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'https://media.bizj.us/view/img/10532525/hospital-generic-exterior*900x506x6100-3435-0-0.jpg';
                      }}
                    />
                  </div>

                  <div className="p-6" style={{ padding: currentTheme.button.padding }}>
                    <h2
                      className="mb-4 line-clamp-2 h-[30px]"
                      style={{
                        fontSize: currentTheme.typography.fontSize.h2,
                        fontWeight: currentTheme.typography.fontWeight.bold,
                        color: textColor,
                      }}
                    >
                      {hospital.name}
                    </h2>

                    <div className="space-y-2 text-sm">
                      <InfoRow
                        label="Established"
                        value={hospital.establishedYear || 'N/A'}
                      />
                      <InfoRow
                        label="Beds"
                        value={hospital.infrastructure?.bedCount?.toString() || 'N/A'}
                      />
                      <InfoRow
                        label="Location"
                        value={`${hospital.city || 'N/A'}, ${hospital.country || 'N/A'}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-3" style={{ padding: currentTheme.button.padding }}>
                  <Button
                    block
                    className="hover:bg-primary-deep transition-colors"
                    variant="solid"
                    style={{
                      backgroundColor: currentTheme.colors.primary,
                      color: textColor,
                      borderRadius: currentTheme.button.borderRadius,
                      padding: currentTheme.button.padding,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hospitals-details/${hospital._id}`);
                    }}
                  >
                    More details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center"
            style={{
              fontSize: currentTheme.typography.fontSize.body,
              color: textColor,
            }}
          >
            No hospitals available.
          </p>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(`/hospitals`)}
            className="font-medium transition-colors hover:bg-primary/5"
            style={{
              backgroundColor: currentTheme.colors.background,
              color: textColor,
              border: `1px solid ${currentTheme.colors.primary}/20`,
              borderRadius: currentTheme.button.borderRadius,
              padding: currentTheme.button.padding,
            }}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHospitals;