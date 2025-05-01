import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from '@/components/ui';
import { BiPlusCircle, BiSearch, BiUser } from 'react-icons/bi';
import { BsHospital } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { FiFileText } from 'react-icons/fi';
import UploadMedicalReports from '@/components/shared/UploadMedicalReports';
import { treatmentTypesData } from '../data/treatmentTypesData';
import { useNavigate } from 'react-router-dom';
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';

const StartYourJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadReportPopupStatus, setUploadReportPopupStatus] = useState(false);
  const { hcfData } = useAuthStore()
  const [steps, setSteps] = useState<{ icon: JSX.Element; text: string; description: string; }[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { setPushedMessages } = usGenerativeChatStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (hcfData?.type !== 'hospital') {
      setSteps([
        { icon: <BiPlusCircle className="w-6 h-6" />, text: "Choose Treatment", description: "Browse treatment options" },
        { icon: <FiFileText className="w-6 h-6" />, text: "Get Treatment Plan", description: "Receive a personalized plan" },
        { icon: <BsHospital className="w-6 h-6" />, text: "Select Hospital", description: "Find the best hospitals" },
        { icon: <BiUser className="w-6 h-6" />, text: "Select Doctor", description: "Choose top specialists" },
        { icon: <CiSettings className="w-6 h-6" />, text: "Finalize Treatment", description: "Confirm your options" }
      ])
    } else {
      setSteps(
        [
          { icon: <BiPlusCircle className="w-6 h-6" />, text: "Choose Treatment", description: "Browse treatment options" },
          { icon: <FiFileText className="w-6 h-6" />, text: "Get Treatment Plan", description: "Receive a personalized plan" },
          { icon: <BiUser className="w-6 h-6" />, text: "Select Doctor", description: "Choose top specialists" },
          { icon: <CiSettings className="w-6 h-6" />, text: "Finalize Treatment", description: "Confirm your options" }
        ]
      )
    }
  }, [hcfData])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchTreatments(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchTreatments(searchTerm);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const searchTreatments = (term) => {
    if (!term.trim()) {
      // If search term is empty, show all treatments
      const allTreatments = treatmentTypesData.flatMap(category =>
        category.subtypes.map(subtype => ({
          subtype,
          majorTitle: category.majorTitle
        }))
      );
      setSearchResults(allTreatments);
      return;
    }

    // Filter treatments based on search term
    const filteredResults = treatmentTypesData.flatMap(category => {
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
  const handleSelectTreatment = (treatment) => {
    setSearchTerm(treatment.subtype);
    setIsInputFocused(false);
    setPushedMessages(treatment.subtype)
    navigate(`/chat-bot`)
    // You can add additional logic here, like navigating to a treatment page
  };


  return (
    <div className="py-7 sm:py-10 px-4 max-w-6xl mx-auto md:mt-20">
      <div className="flex justify-center items-center gap-x-2 sm:flex-row flex-col my-5">
        <div ref={wrapperRef} className="relative w-full md:w-96">
          <form className="relative w-full md:w-96 group" onSubmit={handleSearch}>
            <Input
              type="text"
              value={searchTerm}
              placeholder="Search Your Treatment"
              className="w-full px-6 py-3 pr-12 rounded-full border-2 border-[#c0bada] focus:outline-none 
            text-gray-700 placeholder-gray-400 transition-all duration-300
            group-hover:border-primary focus:border-primary"
              onChange={handleInputChange}
              onFocus={() => {
                setIsInputFocused(true);
                searchTreatments(searchTerm);
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#00000015]
            transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <BiSearch className="w-5 h-5" />
            </button>
          </form>

          {isInputFocused && (
            <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="py-1">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectTreatment(result)}
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {result.subtype}
                      </div>
                      <div className="text-xs text-gray-500">
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

        <p className="mx-3 sm:block hidden text-gray-500">Or</p>

        <div className="sm:mt-0 mt-3 w-full sm:w-auto">

          {
            uploadReportPopupStatus && <UploadMedicalReports setPopupStatus={setUploadReportPopupStatus} />
          }
          <Button 
          className="rounded-full block w-full md:w-auto transition-all duration-300
            hover:shadow-lg hover:scale-105 active:scale-95"
            variant="solid"
          >
            Upload Your Medical Report
          </Button>
        </div>
      </div>

      <div className="text-center mb-6 mt-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
          Start Your Journey
        </h2>
        <p className="text-sm text-gray-600 max-w-3xl mx-auto animate-slide-up">
          Upload your medical report to receive AI-powered insights on the best treatment plans.
        </p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-[calc(55%)] left-[7.5%] w-[85%] hidden md:block z-[2]">
          <div className="h-0.5 bg-gray-300 relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-in-out"
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
                    ? 'bg-primary text-white shadow-lg scale-110'
                    : 'bg-[#e5e2f1] text-primary hover:bg-primary/20'
                  }
                `}
              >
                {step.icon}
              </div>
              <p className={`text-sm text-center font-medium transition-colors duration-300
                ${index === activeStep ? 'text-primary' : 'text-gray-600'}
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


      <style jsx>{`
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
