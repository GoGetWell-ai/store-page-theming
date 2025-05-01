import { Alert, Button, Dialog, Upload } from '@/components/ui';
import { AxiosError } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';

/**
 * Props interface for the UploadMedicalReports component
 * @interface UploadMedicalReportsProps
 * @property {(status: boolean) => void} [setPopupStatus] - Optional callback to update parent component's popup status
 * @property {(status: boolean) => void} [setDeleteConfirmationOpen] - Optional callback to control delete confirmation dialog
 * @property {ReactNode} [buttonChildren] - Optional content to be rendered as the trigger button
 */
interface UploadMedicalReportsProps {
	setPopupStatus?: (status: boolean) => void;
	setDeleteConfirmationOpen?: (status: boolean) => void;
	buttonChildren?: ReactNode;
}

/**
 * UploadMedicalReports Component
 * @component
 * @description A dialog component that allows users to upload medical report files.
 * Features include:
 * - Drag and drop file upload interface
 * - File validation and error handling
 * - Integration with chat bot for file processing
 * - Automatic navigation to chat bot after successful upload
 * 
 * @param {UploadMedicalReportsProps} props - Component props
 * @param {ReactNode} props.buttonChildren - Content to be rendered as the trigger button
 * @param {(status: boolean) => void} props.setPopupStatus - Callback to update parent component's popup status
 * @param {(status: boolean) => void} props.setDeleteConfirmationOpen - Callback to control delete confirmation dialog
 * 
 * @example
 * ```tsx
 * <UploadMedicalReports 
 *   buttonChildren={<Button>Upload Reports</Button>}
 *   setPopupStatus={(status) => setIsPopupOpen(status)}
 * />
 * ```
 */
const UploadMedicalReports: React.FC<UploadMedicalReportsProps> = ({ setPopupStatus, setDeleteConfirmationOpen }) => {
	const [dialogIsOpen, setIsOpen] = useState(false);
	const [buttonLoader, setButtonLoader] = useState(false);
	const [fileUrls, setFileUrl] = useState<string[]>([]);
	const [filesUpload, setFilesUpload] = useState<File[]>([]);
	const [successMessage, setSuccessMessage] = useState('');

	/**
	 * Validates and processes files before upload
	 * @param {File[]} newFiles - Array of files to be uploaded
	 * @returns {Promise<boolean | string>} Returns true if validation passes, error message if fails
	 */
	const beforeUploadFile = async (newFiles: File[]) => {
		try {
			setFilesUpload([...filesUpload, newFiles[0]]);
			return true;
		} catch (err: AxiosError) {
			setButtonLoader(false);
			console.error('Upload error:', err?.response?.data?.message || err.message);
			return err?.response?.data?.message;
		}
	};

	/**
	 * Handles the dialog close event
	 * Updates parent component state if callback is provided
	 */
	const onDialogClose = () => {
		if (setPopupStatus) {
			setPopupStatus(false);
		}
		setIsOpen(false);
	};

	useEffect(() => {
		setIsOpen(true);
	}, []);

	useEffect(() => {
		if (dialogIsOpen) {
			const searchParams = new URLSearchParams(window.location.search);
			if (searchParams.get('status')) {
				console.log("searchParams.get('status')", searchParams.get('status'));
				searchParams.delete('status');
				const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
				window.history.replaceState(null, '', newRelativePathQuery);
			}
		}
	}, [dialogIsOpen]);

	console.log('here is the filesUpload', filesUpload);

	/**
	 * Processes medical report files and initiates chat bot integration
	 * - Validates file upload
	 * - Updates chat bot store with files
	 * - Navigates to chat bot interface
	 * @throws {AxiosError} When API request fails
	 */
	const handleMedicalReports = async () => {
		try {
			if (filesUpload.length) {
				// setButtonLoader(true)
				// const updatedData = await apiUpdateMedicalReports({
				//     id: user.userId,
				//     data: {
				//         medicalReports: [
				//             {
				//                 title: "Medical Reports",
				//                 date: new Date("08-08-2023").toISOString(),
				//                 files: fileUrls,
				//                 description: "sd"
				//             }
				//         ]
				//     }
				// })

				// if (updatedData?.data) {
				//     setUserDetails({ ...userDetails, medicalInfo: { ...userDetails?.medicalInfo, medicalReports: updatedData?.data?.reports } })
				// }
				// setButtonLoader(false)

				if (setDeleteConfirmationOpen) {
					setDeleteConfirmationOpen(false);
				}
				
				onDialogClose();
			} else {
				setSuccessMessage('Please upload at least one file');
			}
		} catch (err: AxiosError) {
			console.log('here is error', err);
			setButtonLoader(false);
			setSuccessMessage(err?.response?.data.message);
		}
	};

	useEffect(() => {
		if (successMessage) {
			const timeOut = setTimeout(() => {
				setSuccessMessage('');
			}, 3000);

			return () => clearInterval(timeOut);
		}
	}, [successMessage]);


	return (
		<div className=''>
			<Dialog
				isOpen={dialogIsOpen}
				closable={true}
				onClose={onDialogClose}
			>
				<h4 className='text-center mb-5'>Upload Medical Reports</h4>
				{
					successMessage ? <Alert showIcon type='danger' className='mb-2' customIcon={<MdError />}>
						{successMessage}
					</Alert> : <div></div>
				}
				<Upload beforeUpload={beforeUploadFile} draggable={true} className='w-full' onFileRemove={(files: File[], fileIndex: number) => {
					const list = [...fileUrls];
					list.splice(fileIndex, 1);
					setFileUrl(list);
				}} />
				<Button loading={buttonLoader} variant='solid' className='w-full !rounded-md' onClick={handleMedicalReports}>Upload</Button>
			</Dialog>
		</div>
	);
};

export default UploadMedicalReports;