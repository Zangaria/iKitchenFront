import React, { useEffect, useRef } from 'react';

const Lordicon = ({ src, trigger, style, color }) => {
	const lordiconRef = useRef(null);

	useEffect(() => {
		// Load Lordicon script dynamically
		const script = document.createElement('script');
		script.src = 'https://cdn.lordicon.com/lordicon.js';
		script.async = true;
		document.body.appendChild(script);

		// Remove script when component unmounts
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		// Set color attribute of lord-icon element
		if (lordiconRef.current) {
			lordiconRef.current.color = color;
		}
	}, [color]);

	return <lord-icon ref={lordiconRef} src={src} trigger={trigger} style={style}></lord-icon>;
};

export default Lordicon;
