import PropTypes from 'prop-types'
import { Pencil } from '../../../assets/icons/pencil'
import { Thrash } from '../../../assets/icons/thrash'
import styles from '../styles.module.css'

export const ItemRow = ({ item, keysToRender, fieldsNames, isEditable, onEdit, onDelete }) => {
  return (
    <tr className={styles.TableRow}>
      {
        keysToRender.map((key, index) => {
          return (
            <td
              key={index+key}
              data-label={fieldsNames[index]}
              className={styles.BodyCell}
            >
              {
                key === 'image'
                  ? (
                    <a href={item[key]} target='_blank' rel='noopener noreferrer'>
                      <img
                        src={item[key]}
                        className={styles.Image}
                        alt='ContentImage'
                      />
                    </a>
                  )
                  : item[key] || '-'
              }
            </td>
          )
        })
      }
      {
        isEditable && (
          <td className={`${styles.BodyCell} ${styles.ButtonsCell}`}>
            <div className={styles.ButtonsWrapper}>
              <button
                className={styles.ActionButton}
                onClick={() => onEdit(item.id)}
              >
                <Pencil />
              </button>
              <button
                className={styles.ActionButton}
                onClick={() => onDelete(item.id)}
              >
                <Thrash />
              </button>
            </div>
          </td>
        )
      }
    </tr>
  )
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  keysToRender: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}