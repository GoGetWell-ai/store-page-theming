import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from '@/components/ui';
import { BiPlusCircle, BiSearch, BiUser } from 'react-icons/bi';
import { BsHospital, BsHeartPulse, BsClipboardPulse } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { FiFileText } from 'react-icons/fi';
import UploadMedicalReports from '@/components/shared/UploadMedicalReports';
import { treatmentTypesData } from '../data/treatmentTypesData';
import { useNavigate } from 'react-router-dom';
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import { useThemeStore } from '@/store/themeStore';
// Organ transplant theme icons
import {  FaLungs, FaHeartPulse, FaUserDoctor, FaHospital, FaStethoscope } from 'react-icons/fa6';
import { GiMedicalDrip, GiMedicines, GiHeartOrgan } from 'react-icons/gi';
import { MdOutlineHealthAndSafety, MdOutlineMonitorHeart } from 'react-icons/md';
// Cosmetic surgery theme icons
import { PiScissorsFill, PiSyringeFill } from 'react-icons/pi';
import { TbFaceId, TbMassage } from 'react-icons/tb';
import { RiSurgicalMaskFill } from 'react-icons/ri';
import { IoIosBody } from 'react-icons/io';
import { GiLipstick, GiNoseSide } from 'react-icons/gi';

const StartYourJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadReportPopupStatus, setUploadReportPopupStatus] = useState(false);
  const { hcfData } = useAuthStore()
  const [steps, setSteps] = useState<{ icon: JSX.Element; text: string; description: string; }[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<TreatmentSubtype[]>([]);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { setPushedMessages } = usGenerativeChatStore();
  const { specialty } = useThemeStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Define theme-specific steps
    const getThemeSteps = () => {
      switch (specialty) {
        case 'organ-transplant':
          return hcfData?.type !== 'hospital' ? [
            { icon: <GiHeartOrgan className="w-7 h-7" />, text: "Organ Evaluation", description: "Assess your transplant needs" },
            { icon: <MdOutlineHealthAndSafety className="w-7 h-7" />, text: "Medical Assessment", description: "Complete health evaluation" },
            { icon: <FaHospital className="w-7 h-7" />, text: "Transplant Center", description: "Find specialized facilities" },
            { icon: <FaUserDoctor className="w-7 h-7" />, text: "Transplant Team", description: "Meet with specialists" },
            { icon: <MdOutlineMonitorHeart className="w-7 h-7" />, text: "Care Plan", description: "Develop your treatment plan" }
          ] : [
            { icon: <GiHeartOrgan className="w-7 h-7" />, text: "Organ Evaluation", description: "Assess your transplant needs" },
            { icon: <MdOutlineHealthAndSafety className="w-7 h-7" />, text: "Medical Assessment", description: "Complete health evaluation" },
            { icon: <FaUserDoctor className="w-7 h-7" />, text: "Transplant Team", description: "Meet with specialists" },
            { icon: <MdOutlineMonitorHeart className="w-7 h-7" />, text: "Care Plan", description: "Develop your treatment plan" }
          ];
          
        case 'cosmetic-surgery':
          return hcfData?.type !== 'hospital' ? [
            { icon: <TbFaceId className="w-7 h-7" />, text: "Consultation", description: "Discuss your aesthetic goals" },
            { icon: <PiSyringeFill className="w-7 h-7" />, text: "Treatment Options", description: "Explore procedure choices" },
            { icon: <IoIosBody className="w-7 h-7" />, text: "Visualization", description: "Preview potential results" },
            { icon: <RiSurgicalMaskFill className="w-7 h-7" />, text: "Select Surgeon", description: "Choose your specialist" },
            { icon: <TbMassage className="w-7 h-7" />, text: "Recovery Plan", description: "Plan your aftercare" }
          ] : [
            { icon: <TbFaceId className="w-7 h-7" />, text: "Consultation", description: "Discuss your aesthetic goals" },
            { icon: <PiSyringeFill className="w-7 h-7" />, text: "Treatment Options", description: "Explore procedure choices" },
            { icon: <RiSurgicalMaskFill className="w-7 h-7" />, text: "Select Surgeon", description: "Choose your specialist" },
            { icon: <TbMassage className="w-7 h-7" />, text: "Recovery Plan", description: "Plan your aftercare" }
          ];
          
        default:
          return hcfData?.type !== 'hospital' ? [
            { icon: <BiPlusCircle className="w-6 h-6" />, text: "Choose Treatment", description: "Browse treatment options" },
            { icon: <FiFileText className="w-6 h-6" />, text: "Get Treatment Plan", description: "Receive a personalized plan" },
            { icon: <BsHospital className="w-6 h-6" />, text: "Select Hospital", description: "Find the best hospitals" },
            { icon: <BiUser className="w-6 h-6" />, text: "Select Doctor", description: "Choose top specialists" },
            { icon: <CiSettings className="w-6 h-6" />, text: "Finalize Treatment", description: "Confirm your options" }
          ] : [
            { icon: <BiPlusCircle className="w-6 h-6" />, text: "Choose Treatment", description: "Browse treatment options" },
            { icon: <FiFileText className="w-6 h-6" />, text: "Get Treatment Plan", description: "Receive a personalized plan" },
            { icon: <BiUser className="w-6 h-6" />, text: "Select Doctor", description: "Choose top specialists" },
            { icon: <CiSettings className="w-6 h-6" />, text: "Finalize Treatment", description: "Confirm your options" }
          ];
      }
    };
    
    setSteps(getThemeSteps());
  }, [hcfData, specialty])

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInputChange = (e: InputChangeEvent): void => {
    const value: string = e.target.value;
    setSearchTerm(value);
    searchTreatments(value);
  };

  interface SearchEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSearch = (e: SearchEvent): void => {
    e.preventDefault();
    searchTreatments(searchTerm);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (wrapperRef.current && !(wrapperRef.current as HTMLElement).contains(event.target as Node)) {
      setIsInputFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  interface TreatmentSubtype {
    subtype: string;
    majorTitle: string;
  }

  const searchTreatments = (term: string): void => {
    if (!term.trim()) {
      // If search term is empty, show all treatments
      const allTreatments: TreatmentSubtype[] = treatmentTypesData.flatMap(category =>
        category.subtypes.map(subtype => ({
          subtype,
          majorTitle: category.majorTitle
        }))
      );
      setSearchResults(allTreatments);
      return;
    }

    // Filter treatments based on search term
    const filteredResults: TreatmentSubtype[] = treatmentTypesData.flatMap(category => {
      const matchingSubtypes = category.subtypes.filter(subtype =>
        subtype.toLowerCase().includes(term.toLowerCase())
      );

      return matchingSubtypes.map(subtype => ({
        subtype,
        majorTitle: category.majorTitle
      }));
    });

    setSearchResults(filteredResults);
  };

  // Handle selection of a treatment
  const handleSelectTreatment = (treatment: TreatmentSubtype) => {
    setSearchTerm(treatment.subtype);
    setIsInputFocused(false);
    setPushedMessages(treatment.subtype)
    navigate(`/chat-bot`)
    // You can add additional logic here, like navigating to a treatment page
  };


  // Theme-specific styling with enhanced backgrounds and decorative elements
  const getThemeStyles = () => {
    switch (specialty) {
      case 'organ-transplant':
        return {
          container: "py-7 sm:py-10 px-4 max-w-6xl mx-auto md:mt-20 bg-green-50 rounded-3xl shadow-lg border border-green-100 relative overflow-hidden",
          containerBg: (
            <>
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full opacity-20 -mr-10 -mt-10 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-green-100 rounded-full opacity-30 -ml-20 -mb-20 animate-float-circle"></div>
              <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-float-slow"></div>
              <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-green-400 rounded-full opacity-15 animate-float-delay"></div>
              <div className="absolute top-1/2 left-10 w-8 h-8 bg-green-500 rounded-full opacity-10 animate-pulse-slow"></div>
              <div className="absolute top-10 right-1/3 w-6 h-6 bg-green-600 rounded-full opacity-10 animate-float-right"></div>
              <div className="hidden md:block absolute bottom-10 right-10 text-green-800 opacity-5 animate-float">
                <FaHeartPulse className="w-20 h-20" />
              </div>
              <div className="hidden md:block absolute top-20 left-20 text-green-800 opacity-5 animate-float-delay">
                <FaLungs className="w-16 h-16" />
              </div>
              <div className="hidden md:block absolute bottom-20 left-1/2 text-green-800 opacity-5 animate-float-slow">
                <FaHeartPulse className="w-24 h-24" />
              </div>
            </>
          ),
          heading: "text-2xl sm:text-4xl font-bold text-green-800 mb-2 animate-fade-in",
          subheading: "text-sm text-green-700 max-w-3xl mx-auto animate-slide-up",
          searchBorder: "border-green-300 group-hover:border-green-600 focus:border-green-600",
          searchButton: "hover:bg-green-600 hover:text-white",
          progressLine: "bg-green-200",
          progressFill: "bg-green-600",
          stepActive: "bg-green-600 text-white shadow-xl shadow-green-200/50 scale-110",
          stepInactive: "bg-green-100 text-green-700 hover:bg-green-200 shadow-md shadow-green-100/30",
          textActive: "text-green-700 font-semibold",
          uploadButton: "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200/50",
          resultItem: "hover:bg-green-50",
          resultText: "text-green-800",
          resultSubtext: "text-green-600",
          stepContainer: "relative z-10"
        };
      case 'cosmetic-surgery':
        return {
          container: "py-7 sm:py-10 px-4 max-w-6xl mx-auto md:mt-20 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl shadow-lg border border-pink-100 relative overflow-hidden",
          containerBg: (
            <>
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 -mr-20 -mt-20 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full opacity-30 -ml-20 -mb-20 animate-float-circle"></div>
              <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float-slow"></div>
              <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-15 animate-float-delay"></div>
              <div className="absolute top-1/2 right-20 w-10 h-10 bg-pink-300 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute bottom-20 left-1/3 w-8 h-8 bg-purple-300 rounded-full opacity-15 animate-float-right"></div>
              <div className="hidden md:block absolute top-20 right-20 text-pink-500 opacity-5 animate-float">
                <GiLipstick className="w-20 h-20" />
              </div>
              <div className="hidden md:block absolute bottom-20 left-20 text-purple-500 opacity-5 animate-float-delay">
                <GiNoseSide className="w-16 h-16" />
              </div>
              <div className="hidden md:block absolute top-1/2 left-1/3 text-pink-600 opacity-5 animate-float-slow">
                <IoIosBody className="w-24 h-24" />
              </div>
            </>
          ),
          heading: "text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2 animate-fade-in",
          subheading: "text-sm text-pink-700 max-w-3xl mx-auto animate-slide-up",
          searchBorder: "border-pink-300 group-hover:border-pink-500 focus:border-pink-500",
          searchButton: "hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white",
          progressLine: "bg-pink-200",
          progressFill: "bg-gradient-to-r from-pink-500 to-purple-500",
          stepActive: "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl shadow-pink-200/50 scale-110",
          stepInactive: "bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 hover:from-pink-100 hover:to-purple-100 shadow-md shadow-pink-100/30",
          textActive: "text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-semibold",
          uploadButton: "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-200/50",
          resultItem: "hover:bg-pink-50",
          resultText: "text-pink-800",
          resultSubtext: "text-pink-600",
          stepContainer: "relative z-10"
        };
      default:
        return {
          container: "py-7 sm:py-10 px-4 max-w-6xl mx-auto md:mt-20",
          containerBg: null,
          heading: "text-2xl sm:text-4xl font-bold text-gray-900 mb-2 animate-fade-in",
          subheading: "text-sm text-gray-600 max-w-3xl mx-auto animate-slide-up",
          searchBorder: "border-[#c0bada] group-hover:border-primary focus:border-primary",
          searchButton: "hover:bg-primary hover:text-white",
          progressLine: "bg-gray-300",
          progressFill: "bg-primary",
          stepActive: "bg-primary text-white shadow-lg scale-110",
          stepInactive: "bg-[#e5e2f1] text-primary hover:bg-primary/20",
          textActive: "text-primary",
          uploadButton: "bg-primary hover:bg-primary-deep text-white",
          resultItem: "hover:bg-gray-100",
          resultText: "text-gray-800",
          resultSubtext: "text-gray-500",
          stepContainer: ""
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={styles.container}>
      {/* Theme-specific background elements */}
      {styles.containerBg}
      
      <div className="flex justify-center items-center gap-x-2 sm:flex-row flex-col my-5 relative z-10">
        <div className="relative w-full md:w-96" ref={wrapperRef}>
          <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
            <Input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => {
                setIsInputFocused(true);
                searchTreatments(searchTerm);
              }}
              placeholder="Search Your Treatment"
              className={`w-full px-6 py-3 pr-12 rounded-full border-2 ${styles.searchBorder} focus:outline-none 
              text-gray-700 placeholder-gray-400 transition-all duration-300 backdrop-blur-sm bg-white/90`}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#00000015]
              transition-all duration-300 ${styles.searchButton}`}
            >
              <BiSearch className="w-5 h-5" />
            </button>
          </form>

          {isInputFocused && (
            <div className="absolute z-20 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="py-1">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 ${styles.resultItem} cursor-pointer`}
                      onClick={() => handleSelectTreatment(result)}
                    >
                      <div className={`text-sm font-medium ${styles.resultText}`}>
                        {result.subtype}
                      </div>
                      <div className={`text-xs ${styles.resultSubtext}`}>
                        {result.majorTitle}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No treatments found
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mx-3 sm:block hidden text-gray-500 font-medium">Or</p>

        <div className="sm:mt-0 mt-3 w-full sm:w-auto">
          {
            uploadReportPopupStatus && <UploadMedicalReports setPopupStatus={setUploadReportPopupStatus} />
          }
          <Button 
            className={`rounded-full block w-full md:w-auto transition-all duration-300
              hover:shadow-lg hover:scale-105 active:scale-95 ${styles.uploadButton}`}
            variant="solid"
            onClick={() => setUploadReportPopupStatus(true)}
          >
            Upload Your Medical Report
          </Button>
        </div>
      </div>

      <div className="text-center mb-6 mt-10 relative z-10">
        <h2 className={styles.heading}>
          Start Your Journey
        </h2>
        <p className={styles.subheading}>
          {specialty === 'organ-transplant' 
            ? "Begin your transplant journey with personalized care and expert guidance every step of the way."
            : specialty === 'cosmetic-surgery'
              ? "Transform with confidence through personalized aesthetic treatments tailored to your unique beauty goals."
              : "Upload your medical report to receive AI-powered insights on the best treatment plans."
          }
        </p>
      </div>

      <div className={`relative ${styles.stepContainer}`}>
        {/* Progress Line */}
        <div className="absolute top-[calc(55%)] left-[7.5%] w-[85%] hidden md:block z-[2]">
          <div className={`h-0.5 ${styles.progressLine} relative`}>
            <div
              className={`absolute top-0 left-0 h-full ${styles.progressFill} transition-all duration-1000 ease-in-out`}
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-y-4 md:gap-0 z-[3]">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center w-full md:w-40 transition-all duration-300
                ${index === activeStep ? 'scale-110' : 'scale-100'}
              `}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 relative z-[2]
                  transition-all duration-300 transform
                  ${index === activeStep
                    ? styles.stepActive
                    : styles.stepInactive
                  }
                `}
              >
                {step.icon}
              </div>
              <p className={`text-sm text-center font-medium transition-colors duration-300
                ${index === activeStep ? styles.textActive : 'text-gray-600'}
              `}>
                {step.text}
              </p>
              <p className={`text-xs text-center transition-opacity duration-300
                ${index === activeStep ? 'opacity-100' : 'opacity-0'}
              `}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StartYourJourney;
