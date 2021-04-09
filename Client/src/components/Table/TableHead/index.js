import PropTypes from 'prop-types'
import styles from '../styles.module.css'

export const TableHead = ({ fieldsNames, isEditable }) => {
  return (
    <thead className={styles.TableHead}>
      <tr>
        {
          fieldsNames.map((key, index) => (
            <th
              key={index + key}
              className={styles.HeadCell}  
            >
              {key}
            </th>
          ))
        }
        {
          isEditable &&
            <th className={`${styles.HeadCell} ${styles.ButtonsCell}`}>
              Acciones
            </th>
        }
      </tr>
    </thead>
  )
}

TableHead.propTypes = {
  fieldsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool.isRequired
}
