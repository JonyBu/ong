import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../../hooks/useHttp';

import { logout } from '../../../redux/actions';
import { navArray } from '../../../utils/navArray';

import styles from './HomeHeader.module.css';

const HomeHeader = () => {
  const user = useSelector((state) => state.user);
	const [publicData, setPublicData] = useState(null);
	const [navClassName, setNavClassName] = useState('')	
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { httpGet } = useHttp();

	useEffect(() => {
		let isMounted = true;

		const GetPublicData = async () => {
			const { data } = await httpGet('/organizations/1/public');
			setPublicData(data.organization);
			if (isMounted) setPublicData(data.organization);
		};

		GetPublicData();

		return () => {
			// cleanup
			isMounted = false;
		};
	}, []);

  useEffect(() => {
    const className = pathname === '/'
      ? `${styles.containerNav} ${styles.containerNavHome}`
      : styles.containerNav
  
    setNavClassName(className)
  }, [pathname])

  const handleToggleShowMenu = () => setShowMenu(!showMenu);
  const handleHiddenMenu = () => showMenu && setShowMenu(false);
  const styleContainerMenu = showMenu ? styles.containerMenuShow : styles.containerMenu; 
  const styleBurgerButton = showMenu ? styles.burgerButtonClose : styles.burgerButton;

  const handleLogout = () => { 
    if (showMenu) {
      setShowMenu(false);
    }

    dispatch(logout())
  };

  return (
		publicData && (
      <nav className={navClassName}>
			  <div className={styles.containerBrand}>
			  	<img src={publicData.image} width='60' height='60' alt='Imagen de la ONG' />
        </div>
        <div className={styles.containerBurgerButton}>
          <button className={styleBurgerButton} onClick={handleToggleShowMenu}>
            <span className={styles.burgerButtonBar}></span>
            <span className={styles.burgerButtonBar}></span>
            <span className={styles.burgerButtonBar}></span>
          </button>
        </div>
        <div className={styleContainerMenu}>
          <ul className={styles.menu}>
             {
               navArray.map(({ name, route }, index) => (
                 <li className={styles.menuItem} key={`${name}-${index}-${route}`}>
                   <NavLink 
                     onClick={handleHiddenMenu} 
                     className={styles.menuItemLink} 
                     to={route} 
                     activeClassName={styles.active} 
                     exact 
                   >
                     { name }
                   </NavLink>
                 </li>
               ))
             }
          </ul>

          <>
            { user.isAuth ? ( 
              <div className={styles.userInteraction}>
                <ul>
                  <li className={styles.profileData}>
                    <NavLink activeClassName={styles.active} className={styles.profileUserName} to='/backoffice/mi-perfil'>
                      {`${user.firstName} ${user.lastName}`}
                    </NavLink>
                  </li>
                  <li>
                    <img src={user.image} alt='Imagen del usuario' className={styles.profileImage} />
                    <ul>
                      <li>
                        <NavLink activeClassName={styles.active} className={styles.menuItemProfile}  to='/backoffice/mi-perfil'>
                          Mi Perfil
                        </NavLink>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={styles.menuItemLogout}
                          onClick={handleLogout}  
                        >
                          Cerrar Sesión
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
            </div>
            ) : (
              <ul className={styles.menu}>
                <li className={styles.menuItem}>
                  <Link 
                    onClick={handleHiddenMenu} 
                    className={styles.menuItemLogin} 
                    activeClassName={styles.active} 
                    to="/login"
                    exact
                    >
                    Iniciar Sesión
                  </Link>
                </li>

                <li className={styles.menuItem}>
                  <Link  
                    onClick={handleHiddenMenu} 
                    className={styles.menuItemRegister} 
                    activeClassName={styles.active} 
                    to="/registrarse"
                    exact
                    >
                    Registrate
                  </Link>
                </li>
              </ul>
            )}
          </>
        </div>
      </nav>
    )
    );
};

export default HomeHeader;
