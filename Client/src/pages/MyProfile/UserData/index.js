import PropTypes from 'prop-types';

import styles from './index.module.css';

export default function MyProfile({ data }) {
  return (
    <div className={styles.containerItems}>
      { data.map(({ id, name, content }) => (
        <div className={styles.item} key={id}>
          <span className={styles.nameItem}>{ name }</span>
          <span className={styles.contentItem}>{ content }</span>
        </div>
      ))}
    </div>
  );
};

MyProfile.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  )
}
