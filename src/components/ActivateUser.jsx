import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { activateUserAction } from '../actions/userActions';
import { ClipLoader } from 'react-spinners';

const ActivateUser = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userid = searchParams.get('userid');

	useEffect(() => {
		// Dispatch the action to activate the user
		dispatch(activateUserAction(userid));
		// console.log(userid);
	}, [dispatch, userid]);

	return (
		<div className=" flex w-1/2 mx-auto mt-60">
			<div className=" w-1/2 mt-8">
				<h1 className=" text-3xl">Activating Your User...</h1>
			</div>
			<div className=" w-1/2 ">
				<ClipLoader color="black" size={80} />
			</div>
		</div>
	);
};

export default ActivateUser;
