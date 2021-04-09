export const initialState = {
  isLoading: true,
  welcomeText: '',
  newsList: [],
  slidesList: [],
  showErrorModal: false
}

const actions = {
  SET_FETCHED_DATA: 'SET_FETCHED_DATA',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_ERROR_MODAL: 'TOGGLE_ERROR_MODAL'
}

export const getActionCreators = (dispatch) => ({
  setFetchedData: ([{ welcomeText, slidesData }, newsList]) => {
    const last4news = [...newsList].reverse().slice(0, 4)
    const payload = {
      welcomeText,
      slidesList: slidesData,
      newsList: last4news,
      isLoading: false,
      showErrorModal: false
    }
    dispatch({ type: actions.SET_FETCHED_DATA, payload })
  },
  setIsLoading: () => dispatch({ type: actions.SET_IS_LOADING }),
  setErrorModal: (payload) => dispatch({ type: actions.SET_ERROR_MODAL, payload })
})

export const homeReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case actions.SET_FETCHED_DATA: {
      return {
        ...state,
        ...action.payload
      }
    }
    case actions.SET_ERROR_MODAL: {
      return {
        ...state,
        showErrorModal: action.payload,
        isLoading: false
      }
    }
    default:
      return state
  }
}