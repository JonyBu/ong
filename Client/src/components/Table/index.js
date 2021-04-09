import PropTypes from 'prop-types'
import { TableHead } from './TableHead'
import { EmptyRow } from './EmptyRow'
import { ItemRow } from './ItemRow'
import styles from './styles.module.css'

export const Table = ({ itemsList, keysToRender, fieldsNames, isEditable, onEdit, onDelete }) => {
  const thereAreItems = itemsList.length !== 0

  return (
    <div className={styles.TableWrapper}>
      <table className={styles.Table}>
        <TableHead
          fieldsNames={fieldsNames}
          isEditable={isEditable}
        />
        <tbody>
          {
            !thereAreItems
              ? (
                <EmptyRow
                  keysToRender={keysToRender}
                  isEditable={isEditable}
                />
                )
              : itemsList.map((item) => (
                  <ItemRow
                    key={item.id || Math.random()*1000}
                    item={item}
                    keysToRender={keysToRender}
                    fieldsNames={fieldsNames}
                    isEditable={isEditable}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
          }
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  itemsList: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.any
    ])
  ).isRequired,
  keysToRender: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

Table.defaultProps = {
  isEditable: false,
  onEdit: () => null,
  onDelete: () => null
}