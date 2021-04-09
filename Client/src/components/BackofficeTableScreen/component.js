import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
import { Table } from '../Table'
import Loader from '../Loader'
import { FormModal } from '../FormModal'
import Modal from '../ModalAlert/Modal'
import styles from './styles.module.css'
import { ChildishTitle } from '../ChildishTitle';

export const ScreenTableComponent = ({
  state, frontRouteName, keysToRender, fieldsNames, isEditable, isFetching, itemFormRender,
  onSubmitSuccess, onSubmitError, onCloseModal, onCloseFormModal, onCreateItem, onEdit, onDelete
}) => {
  return (
    <section className={styles.MainWrapper}>
      <div className={styles.ScreenHeader}>
        <ChildishTitle>
          Lista de {frontRouteName}
        </ChildishTitle>
        {
          isEditable &&
            <button
              type='button'
              className={styles.CreateButton}
              onClick={onCreateItem}
            >
              <FontAwesomeIcon
                icon={['fas', 'plus']}
                fixedWidth
              />
              <span>
                Añadir
              </span>
            </button>
        }
      </div>

      {
        isEditable &&
          <FormModal 
            itemFormRender={itemFormRender} 
            isOpen={state.showFormModal} 
            itemToEdit={state.itemToEdit}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitError={onSubmitError}
            onCloseModal={onCloseFormModal} 
          />
      }

      <Table
        itemsList={state.itemsList}
        keysToRender={keysToRender}
        fieldsNames={fieldsNames}
        onEdit={onEdit}
        onDelete={onDelete}
        isEditable={isEditable}
      />
      {
        isFetching &&
          <Loader />
      }
      <Modal
        showConfirmButton
        setShow={onCloseModal}
        show={state.showModal}
        { ...state.modalProps }
      />
    </section>
  )
}

ScreenTableComponent.propTypes = {
  state: PropTypes.shape({
    itemsList: PropTypes.array,
    itemToEdit: PropTypes.object,
    showModal: PropTypes.bool,
    modalProps: PropTypes.object,
    showFormModal: PropTypes.bool
  }).isRequired,
  frontRouteName: PropTypes.string.isRequired,
  keysToRender: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
  itemFormRender: PropTypes.func,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCreateItem: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}