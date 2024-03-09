import React from 'react';

const Card = ({ link, imageSrc, imageAlt, imageWidth, imageHeight, content, hoverClass }) => {
	return (
		<a
			href={link}
			className={`w-full referral-box m-4 p-8 border border-teal-500 rounded-lg flex flex-col justify-center items-center transition-transform ${hoverClass}`}
		>
			<img src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />
			<div className="mt-2">{content}</div>
		</a>
	);
};

export default Card;
