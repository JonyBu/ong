import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/useHttp';
import { startCheckingUser } from '../../redux/reducers/user';

const GetInitialUserData = () => {
	const dispatch = useDispatch();
	const { httpGet } = useHttp();

	useEffect(() => {
		dispatch(startCheckingUser({ httpGet }));
	}, []);

	return null;
};

export default GetInitialUserData;
