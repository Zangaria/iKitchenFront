import React, { useState } from 'react';

function FileUploader({ onFileChange }) {
	const [pdfBase64, setPdfBase64] = useState('');

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				// Read the file and convert it to base64
				const base64String = reader.result.split(',')[1];
				resolve(base64String);
			};

			reader.onerror = () => {
				reject(new Error('Failed to read the file.'));
			};

			reader.readAsDataURL(file);
		});
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		try {
			const base64String = await convertToBase64(file);
			setPdfBase64(base64String);
			onFileChange(base64String); // Pass the base64 string to the parent component
		} catch (error) {
			console.error('Error converting file to base64:', error);
		}
	};
}

export default FileUploader;
