import React from 'react';
import { FaAccessibleIcon } from 'react-icons/fa';

// Helper function to extract file name from Google Storage URL
const extractFileName = (url) => {
  if (!url || typeof url !== 'string') return 'Unknown file';
  
  // Check if it's a Google Storage URL
  if (url.includes('storage.googleapis.com')) {
    // Extract the filename from the URL
    const urlParts = url.split('/');
    const fullFileName = urlParts[urlParts.length - 1];
    
    // Remove the timestamp prefix if present (e.g., 1745385277835-)
    const fileNameParts = fullFileName.split('-');
    if (fileNameParts.length > 1 && !isNaN(fileNameParts[0])) {
      return fileNameParts.slice(1).join('-');
    }
    return fullFileName;
  }
  
  // For non-Google Storage URLs, just return the last part
  const parts = url.split('/');
  return parts[parts.length - 1];
};

// Helper function to determine if URL should be displayed
const shouldDisplayUrl = (url) => {
  return typeof url === 'string' && url.includes('storage.googleapis.com');
};

// Helper function to check if the file is an image
const isImageFile = (fileName) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
};

const NewAttachment = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {attachments.map((attachment, index) => {
        // Handle the first format (with mediaUrl array)
        if (Array.isArray(attachment.mediaUrl)) {
          // Filter only Google Storage URLs
          const validUrls = attachment.mediaUrl.filter(shouldDisplayUrl);
          
          return validUrls.map((url, urlIndex) => {
            const fileName = extractFileName(url);
            const isImage = isImageFile(fileName);
            
            return (
              <div key={`${index}-${urlIndex}`} className="border rounded-lg p-3 flex flex-col items-center">
                {isImage ? (
                  <>
                    <img 
                      src="/api/placeholder/300/200" 
                      alt={fileName} 
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <span className="text-sm text-gray-700 mt-2 truncate w-full text-center">
                      {fileName}
                    </span>
                  </>
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <FaAccessibleIcon size={48} className="text-blue-500 mb-2" />
                    <span className="text-sm text-gray-700 truncate w-full text-center">
                      {fileName}
                    </span>
                  </div>
                )}
              </div>
            );
          });
        } 
        // Handle the second format (with single mediaUrl)
        else if (attachment.mediaUrl && shouldDisplayUrl(attachment.mediaUrl)) {
          const fileName = extractFileName(attachment.mediaUrl);
          const isImage = isImageFile(fileName);
          
          return (
            <div key={index} className="border rounded-lg p-3 flex flex-col items-center">
              {isImage ? (
                <>
                  <img 
                    src="/api/placeholder/300/200" 
                    alt={fileName} 
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <span className="text-sm text-gray-700 mt-2 truncate w-full text-center">
                    {fileName}
                  </span>
                </>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <FaAccessibleIcon size={48} className="text-blue-500 mb-2" />
                  <span className="text-sm text-gray-700 truncate w-full text-center">
                    {fileName}
                  </span>
                </div>
              )}
            </div>
          );
        }
        
        // Return null for attachments that don't meet the criteria
        return null;
      }).flat()}
    </div>
  );
};

export default NewAttachment;
