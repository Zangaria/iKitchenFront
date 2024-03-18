import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const SubmitCv = () => {
	const { jobid } = useParams(); // Get the jobid from URL params

	// State for form inputs
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [cvFile, setCvFile] = useState(null);
	const [error, setError] = useState('');

	const dispatch = useDispatch();
	const ReusmeArray = useSelector((state) => state.user.userInfo.Reusme);
	const isSubmited = ReusmeArray.some((resume) => resume.jobid === jobid);
	const userInfo = useSelector((state) => state.user.userInfo);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError('');
			}, 3000);
		}
	}, [error]);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// Validate form inputs
		if (!name || !email || !phone || !cvFile) {
			setError('Please fill in all fields.');
			return;
		}

		setName('');
		setEmail('');
		setPhone('');
		setCvFile(null);
	};

	// Handle file input change
	const handleFileChange = (e) => {
		setCvFile(e.target.files[0]);
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
						type="file"
						id="cvFile"
						onChange={handleFileChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
					Submit
				</button>

				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>

			{ReusmeArray.length > 0 && (
				<div className="mt-8">
					<h2 className="text-2xl font-semibold mb-4">Uploaded CVs</h2>
					{ReusmeArray.map((cv, index) => (
						<div key={index} className="bg-gray-100 p-4 mb-4 rounded-md">
							<p>CV Name: {cv.name}</p>
							<p>Email: {cv.email}</p>
							<p>Phone: {cv.phone}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SubmitCv;
