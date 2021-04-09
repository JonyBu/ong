import { Route } from 'react-router-dom';
import { AnimatedSwitch } from '../components/AnimatedSwitch';
import Home from '../pages/Home';
import Novedades from '../pages/News';
import Activities from '../pages/Activities';
import Login from '../pages/Login';
import NewsDetails from '../pages/Details/NewsDetails';
import We from '../pages/We';
import Contact from '../pages/Contact';
import SignUpForm from '../components/Forms/SignUpForm';

import BackOfficeRoutes from './BackofficeRoutes';
import ActivityDetails from '../pages/Details/ActivityDetails';

const Routes = () => {
	return (
		<AnimatedSwitch>
			<Route exact path='/' component={Home} />
			<Route exact path='/actividades' component={Activities} />
			<Route exact path='/novedades' component={Novedades} />
			<Route exact path='/nosotros' component={We} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/contacto' component={Contact} />

			<Route exact path='/novedades/:id' component={NewsDetails} />
			<Route exact path='/actividades/:id' component={ActivityDetails} />
			<Route exact path='/registrarse' component={SignUpForm} />

			<BackOfficeRoutes />
		</AnimatedSwitch>
	);
};

export default Routes;
