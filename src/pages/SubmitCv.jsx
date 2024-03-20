import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addCVAction } from '../actions/jobsActions';

function SubmitCv() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [pdfBase64, setPdfBase64] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const fileInputRef = useRef(null);

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
		} catch (error) {
			console.error('Error converting file to base64:', error);
		}
	};

	const handleUploadClick = () => {
		// fileInputRef.current.click();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Validate form inputs
		if (!name || !email || !phone || !pdfBase64) {
			setError('Please fill in all fields.');
			return;
		}

		// Dispatch an action to submit the form data along with the PDF base64 string
		dispatch(addCVAction({ name, email, phone, pdfBase64 }));

		// Clear form inputs and base64 string
		setName('');
		setEmail('');
		setPhone('');
		setPdfBase64('');
		setError('');
	};

	return (
		<div className="container mx-auto mt-8">
			<h2 className="text-2xl font-semibold mb-4">Submit Your CV</h2>
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
				<div className="mb-4">
					<label htmlFor="name" className="block mb-2 font-semibold">
						Full Name
					</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="block mb-2 font-semibold">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="phone" className="block mb-2 font-semibold">
						Phone Number
					</label>
					<input
						type="tel"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="cvFile" className="block mb-2 font-semibold">
						Upload CV
					</label>
					<input
						id="fileInput"
						type="file"
						accept="application/pdf"
						style={{ display: 'none' }}
						onChange={handleFileChange}
					/>
					<button
						type="button"
						onClick={handleUploadClick}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Choose File
					</button>
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
					Submit
				</button>

				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
}

export default SubmitCv;
