import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  likeNews: ['data'],
  likeHeadlines: ['data']
})

export const LikeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  likedNews: [],
  likedHeadlines: []
})

/* ------------- Selectors ------------- */

// export const LikeSelectors = {
//   getData: state => state.data
// }

/* ------------- Reducers ------------- */
export const likeNews = (state, {data}) => {
  const index = state.likedNews.findIndex((item) => item === data)
  let likedNews = [...state.likedNews]
  if (index >= 0) {
    likedNews.splice(index, 1)
  } else {
    likedNews.push(data)
  }

  return state.merge({
    ...state,
    likedNews
  })
}

export const likeHeadlines = (state, {data}) => {
  const index = state.likedHeadlines.findIndex((item) => item === data)
  let likedHeadlines = [...state.likedHeadlines]
  if (index >= 0) {
    likedHeadlines.splice(index, 1)
  } else {
    likedHeadlines.push(data)
  }

  return state.merge({
    ...state,
    likedHeadlines
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIKE_NEWS]: likeNews,
  [Types.LIKE_HEADLINES]: likeHeadlines
})
