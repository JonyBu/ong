export const initialState ={
  itemsList: [],
  itemToEdit: {},
  showModal: false,
  modalProps: {},
  showFormModal: false
}

const actions = {
  SET_ERROR_MODAL: 'SET_ERROR_MODAL',
  CREATE_ITEM: 'CREATE_ITEM',
  SET_CONFIRM_MODAL: 'SET_CONFIRM_MODAL',
  SET_SUCCESS_MODAL: 'SET_SUCCESS_MODAL',
  SET_ITEMS_LIST: 'SET_ITEMS_LIST',
  EDIT_ITEM: 'EDIT_ITEM',
  HIDE_MODAL: 'HIDE_MODAL',
  HIDE_FORM_MODAL: 'HIDE_FORM_MODAL'
}

export const getActionCreators = (dispatch) => ({
  setItems: (itemsList) => 
    dispatch({ type: actions.SET_ITEMS_LIST, payload: { itemsList } }),

  createItem: () =>
    dispatch({ type: actions.CREATE_ITEM }),

  editItem: (item) =>
    dispatch({ type: actions.EDIT_ITEM, payload: { item } }),
  
  showErrorModal: (errorMessage) =>
    dispatch({ type: actions.SET_ERROR_MODAL, payload: { errorMessage } }),

  showConfirmModal: (callback) =>
    dispatch({ type: actions.SET_CONFIRM_MODAL, payload: { callback }}),

  showSuccessModal: () =>
    dispatch({ type: actions.SET_SUCCESS_MODAL }),

  hideModal: () => dispatch({ type: actions.HIDE_MODAL }),

  hideFormModal: () => dispatch({ type: actions.HIDE_FORM_MODAL })
})

export const tableScreenReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ITEMS_LIST:
      return {
        ...state,
        itemsList: action.payload.itemsList
      }
    case actions.CREATE_ITEM:
      return {
        ...state,
        itemToEdit: {},
        showFormModal: true
      }
    case actions.EDIT_ITEM: 
      return {
        ...state,
        itemToEdit: action.payload.item,
        showFormModal: true
      }
    case actions.SET_ERROR_MODAL:
      return {
        ...state,
        showModal: true,
        modalProps: {
          title: 'Error',
          text: action.payload.errorMessage,
          type: 'error',
          onConfirm: () => null
        }
      }
    case actions.SET_CONFIRM_MODAL:
      return {
        ...state,
        showModal: true,
        modalProps: {
          onConfirm: action.payload.callback, 
          showCancelButton: true,
          title: '¿Estás seguro?',
          text: '¿Estás seguro que deseas eliminar este registro? Esta acción no se puede revertir.',
          type: 'warning'
        }
      }
    case actions.SET_SUCCESS_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        modalProps: {
          type: 'success',
          title: 'Los cambios se han guardado!',
          text: 'Registro actualizado.',
          showCancelButton: false,
          onConfirm: () => null
        }
      }
    case actions.HIDE_MODAL:
      return {
        ...state,
        showModal: false,
      }
    case actions.HIDE_FORM_MODAL:
      return {
        ...state,
        showFormModal: false,
        itemToEdit: {}
      }
    default:
      return state
  }
}