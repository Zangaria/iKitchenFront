import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch } from 'react-redux';
import { addCVAction } from '../actions/jobsActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function SubmitCv() {
	const { jobid } = useParams();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');
	const [pdfText, setPdfText] = useState('');
	const userInfo = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			setLastName(userInfo.lastName || '');
			setFirstName(userInfo.firstName || '');
			setEmail(userInfo.email || '');
			setPhone(userInfo.contactCelphone || '');
		}
	}, [userInfo]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			const base64String = reader.result.split(',')[1];
			getTextFromPDF(file);
		};
		reader.readAsDataURL(file);
	};

	const getTextFromPDF = async (file) => {
		const text = await extractText(file);
		setPdfText(text);
	};

	const extractText = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = async function () {
				const typedArray = new Uint8Array(this.result);
				try {
					const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
					let fullText = '';
					for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
						const page = await pdf.getPage(pageNum);
						const textContent = await page.getTextContent();
						const pageText = textContent.items.map((item) => item.str).join('\n');
						fullText += pageText + '\n';
					}
					resolve(fullText);
				} catch (error) {
					reject(error);
				}
			};
			reader.readAsArrayBuffer(file);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Validate form inputs
		if (!email || !phone || !lastName || !firstName) {
			setError('Please fill in all fields.');
			return;
		}

		// Dispatch an action to submit the form data along with the PDF base64 string
		dispatch(addCVAction({ firstName, lastName, email, phone, pdfText, jobid }));

		// Clear form inputs and base64 string
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhone('');
		setError('');
	};

	return (
		<div className="container mx-auto mt-8">
			<h2 className="text-2xl font-semibold mb-4">Submit Your CV</h2>
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
				<div className="mb-4">
					<label htmlFor="firstName" className="block mb-2 font-semibold">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="lastName" className="block mb-2 font-semibold">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
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
					<input type="file" accept="application/pdf" onChange={handleFileChange} />
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
					Submit
				</button>

				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
			{/* {pdfText && (
				<div className="mt-8">
					<pre>{pdfText}</pre>
				</div>
			)} */}
		</div>
	);
}

export default SubmitCv;
