import PropTypes from 'prop-types'
import styles from '../styles.module.css'

export const EmptyRow = ({ keysToRender, isEditable }) => {
  return (
    <>
      <tr className={styles.TableRow}>
        {keysToRender.map((key, index) => (
          <td
            key={key + index}
            data-label={key}
            className={styles.BodyCell}
          >
            -
          </td>
        ))}
        {
          isEditable &&
          <td className={styles.BodyCell}>
            -
          </td>
        }
      </tr>
    </>
  )
}

EmptyRow.propTypes = {
  keysToRender: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool.isRequired
}