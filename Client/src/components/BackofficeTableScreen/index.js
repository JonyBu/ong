import { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { initialState, getActionCreators, tableScreenReducer } from './tableScreenReducer'
import { ScreenTableComponent } from './component'
import { useHttp } from '../../hooks/useHttp'


export const TableScreen = ({
  endpoint, frontRouteName, keysToRender, fieldsNames, isEditable, itemFormRender
}) => {
  const [state, dispatch] = useReducer(tableScreenReducer, initialState)
  const {
    setItems, createItem, editItem, showErrorModal,
    showConfirmModal, showSuccessModal, hideModal, hideFormModal
  } = getActionCreators(dispatch)
  const { isFetching, httpGet, httpDelete } = useHttp(true)

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    console.log(state.showModal)
  }, [state.showModal])

  const getItems = async () => {
    try {
      const response = await httpGet(`/${endpoint}`)
      setItems(response.data[endpoint])
    } catch (error) {
      showErrorModal(error.message)
    }
  }

  const handleEdit =  (id) => {
    const selectedItem = state.itemsList.find(element => element.id === id)  
    editItem(selectedItem)
  }

  const handleDelete = (id) => {
    showConfirmModal(deleteItem(id))
  }

  const handleSubmitSuccess = (updatedItem) => {
    const updatedItemList = [...state.itemsList];
    const itemIndex = state.itemsList.findIndex(item => item.id === updatedItem.id);
    itemIndex > -1
      ? updatedItemList.splice(itemIndex, 1 , updatedItem)
      : updatedItemList.unshift(updatedItem)
    setItems(updatedItemList)
    showSuccessModal()
  }

  const deleteItem = (idToDelete) => async () => {
    try {
      await httpDelete(`/${endpoint}/${idToDelete}`)
      const deletedItemIndex = state.itemsList.findIndex(item => item.id === idToDelete)
      const updatedItemList = [...state.itemsList]
      updatedItemList.splice(deletedItemIndex, 1)
      setItems(updatedItemList)
      showSuccessModal()
    } catch (error) {
      showErrorModal(error.message)
    }
  }

  return (
    <ScreenTableComponent
      state={state}
      frontRouteName={frontRouteName}
      keysToRender={keysToRender}
      fieldsNames={fieldsNames}
      isEditable={isEditable}
      isFetching={isFetching}
      itemFormRender={itemFormRender}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitError={showErrorModal}
      onCloseModal={hideModal}
      onCloseFormModal={hideFormModal}
      onCreateItem={createItem}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

TableScreen.propTypes = {
  endpoint: PropTypes.string.isRequired,
  frontRouteName: PropTypes.string.isRequired,
  keysToRender: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  itemFormRender: PropTypes.func,
}