import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNewsRequest: ['data'],
  getNewsSuccess: ['payload'],
  getNewsFailure: ['error'],
  getHeadlinesRequest: ['data'],
  getHeadlinesSuccess: ['payload'],
  getHeadlinesFailure: ['error']
})

export const NewsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  news: {
    data: null,
    fetching: null,
    payload: null,
    error: null
  },
  headlines: {
    data: null,
    fetching: null,
    payload: null,
    error: null
  }
})

/* ------------- Selectors ------------- */

export const NewsSelectors = {
  getNewsData: state => state.news.news,
  getHeadlinesData: state => state.news.headlines
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getNewsRequest = (state, {data}) =>
  state.merge({
    news: { ...state.news, fetching: true, data }
  })

// successful api lookup
export const getNewsSuccess = (state, {payload}) =>
  state.merge({
    ...state,
    news: { ...state.news, fetching: false, payload, error: null}
  })

// Something went wrong somewhere.
export const getNewsFailure = (state, {error}) =>
  state.merge({
    ...state,
    news: { ...state.news, fetching: false, data: null, error}
  })


// request the data from an api
export const getHeadlinesRequest = (state, {data}) =>
  state.merge({
    ...state,
    headlines: { ...state.headlines, fetching: true, data }
  })

// successful api lookup
export const getHeadlinesSuccess = (state, {payload}) =>
  state.merge({
    ...state,
    headlines: { ...state.headlines, fetching: false, payload, error: null}
  })

// Something went wrong somewhere.
export const getHeadlinesFailure = (state, {error}) =>
  state.merge({
    ...state,
    headlines: { ...state.headlines, fetching: false, data: null, error}
  })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NEWS_REQUEST]: getNewsRequest,
  [Types.GET_NEWS_SUCCESS]: getNewsSuccess,
  [Types.GET_NEWS_FAILURE]: getNewsFailure,

  [Types.GET_HEADLINES_REQUEST]: getHeadlinesRequest,
  [Types.GET_HEADLINES_SUCCESS]: getHeadlinesSuccess,
  [Types.GET_HEADLINES_FAILURE]: getHeadlinesFailure
})
