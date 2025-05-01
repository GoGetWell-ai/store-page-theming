import fileSizeUnit from '@/utils/fileSizeUnit'
import { useEffect, useState } from 'react'
import { TbFile } from 'react-icons/tb'

export type AttatchmentProps = {
    attachments?: Array<{
        type?: 'image' | 'video' | 'audio' | 'misc' | 'document'
        source?: File | Record<string, any>
        mediaUrl: string | string[]
    }>
}

const Attachment = ({ attachments = [] }: AttatchmentProps) => {
    const [processedAttachments, setProcessedAttachments] = useState<any[]>([])

    useEffect(() => {
        if (!attachments.length) {
            setProcessedAttachments([])
            return
        }

        // Handle the case where mediaUrl is an array
        const processed = attachments.flatMap(attachment => {
            // Case where mediaUrl is an array
            if (Array.isArray(attachment.mediaUrl)) {
                return attachment.mediaUrl.map(url => {
                    // Extract filename from URL
                    const fullFileName = url.split('/').pop() || '';
                    const rawFileName = fullFileName.replace(/^\d+-/, '');

                    // Detect file type from URL or filename
                    const fileType = detectFileType(url, rawFileName);


                    return {
                        type: fileType,
                        mediaUrl: url, // Single URL, not in an array
                        source: {
                            ...(attachment.source || {}),
                            name: rawFileName,
                            lastModified: Date.now(),
                            lastModifiedDate: new Date().toString(),
                            size: 0,
                            type: fileType === 'document' ? 'application/pdf' : '',
                            webkitRelativePath: ""
                        }
                    };
                });
            }
            // Case where mediaUrl is already a string
            else {
                return [attachment];
            }
        });

        setProcessedAttachments(processed);
    }, [attachments]);

    // Function to detect file type based on URL or filename
    const detectFileType = (url: string, filename: string): 'image' | 'video' | 'audio' | 'document' | 'misc' => {
        const lowerUrl = url.toLowerCase();
        const lowerFilename = filename.toLowerCase();

        // Check for image extensions
        if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(lowerUrl) ||
            /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(lowerFilename)) {
            return 'image';
        }

        // Check for video extensions
        if (/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/.test(lowerUrl) ||
            /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/.test(lowerFilename)) {
            return 'video';
        }

        // Check for audio extensions
        if (/\.(mp3|wav|ogg|flac|aac)$/.test(lowerUrl) ||
            /\.(mp3|wav|ogg|flac|aac)$/.test(lowerFilename)) {
            return 'audio';
        }

        // Check for PDF
        if (/\.pdf$/.test(lowerUrl) || /\.pdf$/.test(lowerFilename) ||
            lowerUrl.includes('pdf') || lowerFilename.includes('pdf')) {
            return 'document';
        }

        // Default to misc for all other types
        return 'misc';
    };

    return (
        <div className="flex flex-col">
            {processedAttachments.map((attachment, index) => {
                const key = `${attachment.mediaUrl}-${index}`;

                if (attachment.type === 'image') {
                    return (
                        attachment.source?.name.includes('ggw') ? null : <div key={key}>
                            <img
                                className="rounded-xl my-2"
                                src={attachment.mediaUrl}
                                alt={attachment.source?.name || "Image attachment"}
                            />
                        </div>
                    );
                }

                if (attachment.type === 'video') {
                    return (
                        attachment.source?.name.includes('ggw') ? null : <div key={key}>
                            <a
                                href={attachment.mediaUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <video
                                    className="rounded-xl my-2"
                                    src={attachment.mediaUrl}
                                    controls
                                />
                            </a>
                        </div>
                    );
                }

                if (attachment.type === 'audio') {
                    return (
                        attachment.source?.name.includes('ggw') ? null : <div key={key}>
                            <audio controls>
                                <source src={attachment.mediaUrl} />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    );
                }

                // Handle document type (PDF)
                if (attachment.type === 'document') {
                    return (
                        attachment.source?.name.includes('ggw') ? null : <a
                            key={key}
                            download
                            className="flex items-center gap-2 p-2 rounded-xl border border-gray-300 dark:border-gray-600 min-w-[250px] bg-white dark:bg-gray-600 my-2 no-underline"
                            href={attachment.mediaUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TbFile className="text-3xl heading-text" />
                            <div>
                                <div className="heading-text font-bold">
                                    {attachment.source?.name || "Document"}
                                </div>
                                <div className="heading-text">
                                    {attachment.source?.size ? fileSizeUnit(attachment.source.size) : "Unknown size"}
                                </div>
                            </div>
                        </a>
                    );
                }

                // Default case for misc files
                return attachment.source?.name.includes('ggw') ? null : (
                    <a
                        key={key}
                        download
                        className="flex items-center gap-2 p-2 rounded-xl border border-gray-300 dark:border-gray-600 min-w-[250px] bg-white dark:bg-gray-600 my-2 no-underline"
                        href={attachment.mediaUrl}
                    >
                        <TbFile className="text-3xl heading-text" />
                        <div>
                            <div className="heading-text font-bold">
                                {attachment.source?.name || "File attachment"}
                            </div>
                            <div className="heading-text">
                                {attachment.source?.size ? fileSizeUnit(attachment.source?.size) : "Unknown size"}
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

export default Attachment;