import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

const CustomLoginPage = () => {
	useEffect(() => {
		signIn('discord', {
			callbackUrl: '/dashboard',
		});
	}, []);

	return null;
};

export default CustomLoginPage;
