import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactLoader from "react-loader-spinner";
import PropTypes from 'prop-types'

function Loader({ 
                  type='Oval', 
                  color='#c2579d', 
                  height = 80, 
                  width = 80, 
                  timeout=2500 
                                })  {
    return (
      <ReactLoader
        type={type}
        color={color}
        height={height}
        width={width}
        timeout={timeout} 
      />
    );
}

Loader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  timeout: PropTypes.number
}


export default Loader;