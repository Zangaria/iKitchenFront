import React, { useState } from 'react';

function UploadTest() {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [fileBase64, setFileBase64] = useState('');

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const base64Data = btoa(e.target.result);
			setFileBase64(base64Data);
		};

		reader.readAsBinaryString(file);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = {
			name: name,
			lastName: lastName,
			pdfBase64: fileBase64,
		};
		console.log(formData);
		// Send formData to your server using fetch or any other method
		fetch('YOUR_SERVER_ENDPOINT', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle response from the server if needed
				console.log(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name:</label>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div>
					<label>Last Name:</label>
					<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				</div>
				<div>
					<label>Upload PDF:</label>
					<input type="file" accept=".pdf" onChange={handleFileChange} />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default UploadTest;
