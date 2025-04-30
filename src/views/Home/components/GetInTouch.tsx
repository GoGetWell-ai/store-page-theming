import React from 'react';
import { Button } from '@/components/ui';
import { BiGlobe, BiPhone, BiUser } from 'react-icons/bi';
import { BsInstagram, BsMailbox, BsTwitter } from 'react-icons/bs';
import { PiMapPinPlus } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/store/themeStore';

interface GetInTouchProps {
    hcfData: any
}

const GetInTouch: React.FC<GetInTouchProps> = ({ hcfData }) => {
    const navigate = useNavigate();
    const { specialty } = useThemeStore();
    
    // Different content based on theme
    const content = {
        default: {
            title: "Let's get in touch!",
            subtitle: "Got questions about Treatment or Travel? Our team is here to help. Contact us for quick and friendly support.",
            bioTitle: `Bio of ${hcfData?.type === 'hcf' ? 'HCF' : 'Hospital'}`
        },
        organTransplant: {
            title: "Begin Your Transplant Journey",
            subtitle: "Have questions about organ transplant procedures or waiting lists? Our transplant coordinators are ready to assist you.",
            bioTitle: `${hcfData?.type === 'hcf' ? 'HCF' : 'Hospital'} Transplant Center`
        },
        cosmeticSurgery: {
            title: "Your Beauty Consultation",
            subtitle: "Questions about our cosmetic procedures or recovery process? Our beauty consultants are ready to discuss your aesthetic goals.",
            bioTitle: `${hcfData?.type === 'hcf' ? 'HCF' : 'Hospital'} Beauty Profile`
        }
    };
    
    const themeContent = content[specialty] || content.default;
    
    // Card styling based on theme
    const cardStyle = specialty === 'cosmeticSurgery' 
        ? 'bg-white rounded-2xl shadow-xl p-8 min-w-[200px] w-full max-w-[400px] mt-4 md:mt-0 border border-pink-200' 
        : specialty === 'organTransplant'
        ? 'bg-white rounded-2xl shadow-xl p-8 min-w-[200px] w-full max-w-[400px] mt-4 md:mt-0 border border-green-200'
        : 'bg-white rounded-2xl shadow-xl p-8 min-w-[200px] w-full max-w-[400px] mt-4 md:mt-0 border border-blue-200';
    
    // Button styling based on theme
    const buttonStyle = specialty === 'cosmeticSurgery'
        ? 'bg-pink-500 hover:bg-pink-600 text-white'
        : specialty === 'organTransplant'
        ? 'bg-green-600 hover:bg-green-700 text-white'
        : 'bg-blue-600 hover:bg-blue-700 text-white';
    
    // Contact info item styling
    const contactItemStyle = 'flex items-center gap-3 mb-4';
    const iconStyle = specialty === 'cosmeticSurgery'
        ? 'text-pink-500 text-xl'
        : specialty === 'organTransplant'
        ? 'text-green-600 text-xl'
        : 'text-blue-600 text-xl';

    const handleContactClick = () => {
        navigate(`/hospital/${hcfData?.id}/contact`);
    };

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">{themeContent.title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{themeContent.subtitle}</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center gap-8 items-stretch">
                    {/* Contact Information Card */}
                    <div className={cardStyle}>
                        <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                        
                        {/* Contact details */}
                        <div className="space-y-2">
                            {hcfData?.phone && (
                                <div className={contactItemStyle}>
                                    <BiPhone className={iconStyle} />
                                    <span>{hcfData.phone}</span>
                                </div>
                            )}
                            
                            {hcfData?.email && (
                                <div className={contactItemStyle}>
                                    <BsMailbox className={iconStyle} />
                                    <span>{hcfData.email}</span>
                                </div>
                            )}
                            
                            {hcfData?.website && (
                                <div className={contactItemStyle}>
                                    <BiGlobe className={iconStyle} />
                                    <a 
                                        href={hcfData.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {hcfData.website.replace(/(^\w+:|^)\/\//, '')}
                                    </a>
                                </div>
                            )}
                            
                            {hcfData?.address && (
                                <div className={contactItemStyle}>
                                    <PiMapPinPlus className={iconStyle} />
                                    <span>{hcfData.address}</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Social Media Links */}
                        {(hcfData?.twitter || hcfData?.instagram) && (
                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-3">Follow Us</h4>
                                <div className="flex gap-4">
                                    {hcfData?.twitter && (
                                        <a 
                                            href={`https://twitter.com/${hcfData.twitter}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`p-2 rounded-full ${
                                                specialty === 'cosmeticSurgery' ? 'hover:bg-pink-100' : 
                                                specialty === 'organTransplant' ? 'hover:bg-green-100' : 'hover:bg-blue-100'
                                            }`}
                                        >
                                            <BsTwitter className={iconStyle} />
                                        </a>
                                    )}
                                    
                                    {hcfData?.instagram && (
                                        <a 
                                            href={`https://instagram.com/${hcfData.instagram}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`p-2 rounded-full ${
                                                specialty === 'cosmeticSurgery' ? 'hover:bg-pink-100' : 
                                                specialty === 'organTransplant' ? 'hover:bg-green-100' : 'hover:bg-blue-100'
                                            }`}
                                        >
                                            <BsInstagram className={iconStyle} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* Contact Button */}
                        <Button 
                            className={`w-full mt-8 ${buttonStyle}`}
                            onClick={handleContactClick}
                        >
                            Contact Us
                        </Button>
                    </div>
                    
                    {/* Bio Card */}
                    <div className={cardStyle}>
                        <div className="flex items-center mb-6">
                            <BiUser className={iconStyle} />
                            <h3 className="text-xl font-semibold ml-2">{themeContent.bioTitle}</h3>
                        </div>
                        
                        <div className="prose prose-sm">
                            {hcfData?.description ? (
                                <p className="text-gray-600">{hcfData.description}</p>
                            ) : (
                                <p className="text-gray-500 italic">
                                    {hcfData?.name || 'This healthcare facility'} is a leading provider of 
                                    {specialty === 'organTransplant' 
                                        ? ' organ transplant services' 
                                        : specialty === 'cosmeticSurgery' 
                                        ? ' cosmetic procedures' 
                                        : ' healthcare services'} 
                                    with dedicated specialists committed to patient care.
                                </p>
                            )}
                            
                            {hcfData?.specializations && hcfData.specializations.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Specializations</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {hcfData.specializations.map((spec, index) => (
                                            <span 
                                                key={index} 
                                                className={`px-3 py-1 text-xs rounded-full ${
                                                    specialty === 'cosmeticSurgery' ? 'bg-pink-100 text-pink-800' : 
                                                    specialty === 'organTransplant' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {hcfData?.facilities && hcfData.facilities.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Facilities</h4>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {hcfData.facilities.slice(0, 5).map((facility, index) => (
                                            <li key={index}>{facility}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        {/* View Profile Button */}
                        <Button 
                            className={`w-full mt-6 ${buttonStyle}`}
                            onClick={() => navigate(`/hospital/${hcfData?.id}`)}
                        >
                            View Full Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;