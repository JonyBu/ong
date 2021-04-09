import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function PrivateRoute({
  component: Component, onlyAdmin, ...rest
}) {
  const { isAuth, isAdmin } = useSelector(state => state.user);

  const hasPermissions = onlyAdmin ? isAuth && isAdmin : isAuth;

  return (
    <Route
      {...rest}
      render={(props) => (hasPermissions ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  onlyAdmin: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  onlyAdmin: false,
};
