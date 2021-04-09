import { Switch, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import "./styles.css";

export const AnimatedSwitch = ({ children }) => {
  const location = useLocation(); 

  return (
    <div className="switchWrapper">
      <TransitionGroup>
        <CSSTransition
          timeout={500}
          classNames="route"
          key={location.key}
        >
          <Switch location={location}>
            {children}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

AnimatedSwitch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
