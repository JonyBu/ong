import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './BackofficeSideBar.module.css';

const BackofficeSideBar = () => {
	const user = useSelector((state) => state.user);
	const sidebarRef = useRef();
	const buttonRef = useRef();	

	const handleToggle = () => {		
		const sidebar = sidebarRef.current;
		sidebar.classList.toggle(styles.closed);
		const button = buttonRef.current;
		button.classList.toggle(styles.buttonRotate);
	}	
	
	return (
		user.isAdmin && (		
		<div className={styles.wrapper} ref={ sidebarRef }>
			<aside className={styles.sideBar}>
			
				<button className={styles.toggleButton} onClick={ handleToggle } ref={ buttonRef }>
					<FontAwesomeIcon icon={ ['fas', 'arrow-alt-circle-right']} size="2x" />
				</button>	

				<nav className={styles.nav}>
					<ul className={styles.ul}>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/home'>
								Home
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/organization'>
								Organización
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/activities'>
								Actividades
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/novedades'>
								Novedades
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/categories'>
								Categorias
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/members'>
								Miembros
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/contacts'>
								Contactos
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/testimonios'>
								Testimonios
							</NavLink>
						</li>
						<li className={styles.li}>
							<NavLink activeClassName={styles.isActive} className={styles.a} to='/backoffice/usuarios'>
								Usuarios
							</NavLink>
						</li>
					</ul>
				</nav>
			</aside>
		</div>
		)
	);
};

export default BackofficeSideBar;
