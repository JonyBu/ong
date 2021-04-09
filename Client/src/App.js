import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import HomeHeader from './components/Header/HomeHeader';
import BackofficeSideBar from './components/Header/BackofficeSideBar';
import Footer from './components/Footer';

import store from './redux/store';
import GetInitialUserData from './components/GetInitialUserData';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import style from './App.module.css';
library.add(fab, fas);

function App() {
	return (
		<Router>
			<Provider store={store}>
				<GetInitialUserData />
				<HomeHeader />
				<div className={ style.mainContent}>
					<BackofficeSideBar />
					<Routes />
				</div>				
				<Footer />
			</Provider>
		</Router>
	);
}

export default App;
