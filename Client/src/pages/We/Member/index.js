import PropTypes from 'prop-types';
import noImage from '../../../assets/images/no-user-image.jpg';

import styles from './index.module.css';


export default function Member({ name, image }) {
  return (
    <div className={styles.containerMember}>
      <img className={styles.memberImage} src={image || noImage} alt='' />
      <p className={styles.memberName}>{ name }</p>
    </div>
  ); 
}

Member.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Member.defaultProps = {
  image: null,
}
