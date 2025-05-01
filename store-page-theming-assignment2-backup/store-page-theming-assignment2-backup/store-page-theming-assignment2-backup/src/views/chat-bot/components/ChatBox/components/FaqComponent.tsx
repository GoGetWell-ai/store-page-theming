import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore';
import React, { useState } from 'react';

interface RelatedQuestionsComponentProps {
  questions: string[];
}

const RelatedQuestionsComponent: React.FC<RelatedQuestionsComponentProps> = ({ questions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setPushedMessages } = usGenerativeChatStore()

  // Parse the input strings into questions

  const filteredQuestions = questions.filter(question =>
    question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuestionClick = (question) => {
    // Show alert with the question text
    setPushedMessages(question);
  };

  return (
    <div className="bg-white text-gray-900 p-6 font-sans">
      <div className="w-full mx-auto">
        <div className="flex items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Related</h2>
        </div>

        {searchQuery.length > 0 && (
          <div className="mb-4 mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 text-gray-500"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {searchQuery && (
                <button
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery('')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3 w-[95%] mx-auto">
          {filteredQuestions.map((question, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-3 last:border-0"
            >
              <button
                className="w-full flex items-center justify-between text-left py-1 hover:text-blue-500 transition-colors duration-200"
                onClick={() => handleQuestionClick(question)}
              >
                <span className="text-base text-gray-800 hover:text-blue-600">{question}</span>
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedQuestionsComponent;