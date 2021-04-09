import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PrivateRoute from '../../components/PrivateRoute';

import BackOfficeHome from '../../pages/Backoffice/Home'
import BackOfficeNews from '../../pages/Backoffice/News';
import Contacts from '../../pages/Backoffice/Contacts';
import ActivitiesBackoffice from '../../pages/Backoffice/Activities';
import Categories from '../../pages/Backoffice/Categories';
import Testimonials from '../../pages/Backoffice/Testimonials';
import Organization from '../../pages/Backoffice/Organization';
import BackOfficeUsers from '../../pages/Backoffice/Users';
import BackOfficeMembers from '../../pages/Backoffice/Members';
import MyProfile from '../../pages/MyProfile';

const BackOfficeRoutes = () => {
	const { isAuth } = useSelector(state => state.user);
	return (
		isAuth ?
			<>
				{/* Rutas solo admin */}
				<PrivateRoute onlyAdmin exact path='/backoffice/home' component={BackOfficeHome} />
				<PrivateRoute onlyAdmin exact path='/backoffice/novedades' component={BackOfficeNews} />
				<PrivateRoute onlyAdmin exact path='/backoffice/contacts' component={Contacts} />
				<PrivateRoute onlyAdmin exact path='/backoffice/activities' component={ActivitiesBackoffice} />
				<PrivateRoute onlyAdmin exact path='/backoffice/categories' component={Categories} />
				<PrivateRoute onlyAdmin exact path='/backoffice/testimonios' component={Testimonials} />
				<PrivateRoute onlyAdmin exact path='/backoffice/organization' component={Organization} />
				<PrivateRoute onlyAdmin exact path='/backoffice/usuarios' component={BackOfficeUsers} />
				<PrivateRoute onlyAdmin exact path='/backoffice/members' component={BackOfficeMembers} />

				{/* Rutas usuario standard */}
				<PrivateRoute exact path='/backoffice/mi-perfil' component={MyProfile} />
			</>
			:
			<Redirect />
	);
};

export default BackOfficeRoutes;
