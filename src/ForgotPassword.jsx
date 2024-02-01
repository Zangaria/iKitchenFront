import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [timer, setTimer] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [isFirstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
        const time1 = localStorage.getItem('forgotPasswordTimer')
        if (time1 > 0){
            setIsTimerRunning(true)
            setIsFirstTime(false)
            setTimer(time1)
        }
    },[])

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleGoButtonClick = async () => {
		// Add logic to handle the "Go" button click
		try {
			// Send email using Axios to the specified endpoint
			const response = await axios.post('https://api-ikitchen.amio.co.il/forgotPassword', {
				email,
			});

			// Handle the response (you might want to check response status and handle accordingly)
			console.log('Email sent successfully:', response.data);

			// Proceed with the logic for handling the "Go" button click
			console.log('Code entered. Handle logic here.');

			// Activate the timer and set the button to disabled
			setIsFirstTime(false);
			startTimer();
		} catch (error) {
			// Handle errors (log, display an error message, etc.)
			console.error('Email sending failed:', error.message);
		}
	};

	const handleSendAgainClick = () => {
		// Add logic to handle the "Send Again" button click
		console.log('Sending code again. Handle logic here.');
		setTimer(5);
		startTimer();
	};

	const startTimer = () => {
		setIsTimerRunning(true);
		setTimer((prevTimer) => (prevTimer > 0 ? prevTimer : 5)); // Set initial timer value
	};

	useEffect(() => {
		let interval;

		if (isTimerRunning) {
			interval = setInterval(() => {
				setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isTimerRunning]);

	useEffect(() => {
		if (timer === 0) {
			setIsTimerRunning(false);
		}
		// Save timer value to local storage
		localStorage.setItem('forgotPasswordTimer', timer.toString());
	}, [timer]);

	useEffect(() => {
		// Retrieve timer value from local storage on component mount
		const savedTimer = localStorage.getItem('forgotPasswordTimer');
		if (savedTimer !== null) {
			setTimer(parseInt(savedTimer, 10));
			setIsTimerRunning(!isFirstTime);
		}
	}, [isFirstTime]);

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12">
				<form className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Enter Code
					</div>

					{/* Email input */}
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					{/* Go/Send Again button */}
					<button
						type="button"
						onClick={isTimerRunning ? handleSendAgainClick : handleGoButtonClick}
						disabled={isTimerRunning && !isFirstTime}
						className={`w-full text-white ${
							isTimerRunning && !isFirstTime ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500'
						} focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 ${
							isTimerRunning && !isFirstTime
								? 'hover:bg-gray-400'
								: 'hover:bg-teal-600 hover:ring-teal-400'
						} mb-4`}
					>
						{isTimerRunning && !isFirstTime ? 'Send Again' : 'Go'}
					</button>

					{/* Timer text */}
					{isTimerRunning && !isFirstTime && (
						<div className="flex items-center justify-center">
							<p className="text-sm mb-4">Resend code in {timer} seconds</p>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
