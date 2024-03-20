import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useDropzone } from 'react-dropzone';
import { Document, Page, Text } from '@react-pdf/renderer';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PdfViewer = ({ file }) => {
	const [pdfText, setPdfText] = useState('');

	// Function to extract text from PDF file
	const extractTextFromPdf = async (file) => {
		const reader = new FileReader();
		reader.onload = async () => {
			const typedArray = new Uint8Array(reader.result);
			const pdf = await pdfjsLib.getDocument(typedArray).promise;
			const pageCount = pdf.numPages;
			let text = '';
			for (let i = 1; i <= pageCount; i++) {
				const page = await pdf.getPage(i);
				const content = await page.getTextContent();
				text += content.items.map((item) => item.str).join(' ');
			}
			setPdfText(text);
		};
		reader.readAsArrayBuffer(file);
	};

	// Render PDF
	return (
		<div>
			<PDFViewer width={600} height={600}>
				<Document>
					<Page>
						<Text>{pdfText}</Text>
					</Page>
				</Document>
			</PDFViewer>
			<PDFDownloadLink
				document={
					<Document>
						<Page>
							<Text>{pdfText}</Text>
						</Page>
					</Document>
				}
				fileName="cv.pdf"
			>
				{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
			</PDFDownloadLink>
		</div>
	);
};

const UploadCVPage = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	// Function to handle file upload
	const onDrop = (acceptedFiles) => {
		setSelectedFile(acceptedFiles[0]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div>
			<h2>Upload Your CV</h2>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>Drag 'n' drop some files here, or click to select files</p>
				)}
			</div>
			{selectedFile && <PdfViewer file={selectedFile} />}
		</div>
	);
};

export default UploadCVPage;
