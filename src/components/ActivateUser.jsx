import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { activateUserAction } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ActivateUser = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userid = searchParams.get('userid');
	const navigate = useNavigate();
	const { loading, isActive, error } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(activateUserAction(userid));
		if (isActive) {
			navigate('/');
		}
	}, [dispatch, userid, isActive]);

	return (
		<div className="flex w-1/2 mx-auto mt-60">
			<div className="w-1/2 mt-8">
				{loading && (
					<>
						<ClipLoader color="black" size={80} />{' '}
						<h1 className="text-3xl">Activating Your User...</h1>
					</>
				)}
				{!loading && isActive && <p>User activated successfully!</p>}
				{!loading && !isActive && (
					<p className=" bg-red-500 rounded-md text-white px-2">
						Activation failed. Please try again later.
					</p>
				)}
			</div>
		</div>
	);
};

export default ActivateUser;
