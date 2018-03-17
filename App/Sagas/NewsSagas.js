/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import NewsActions from '../Redux/NewsRedux'
import { NewsSelectors } from '../Redux/NewsRedux'
import handleError from '../Lib/handleError'

// export function * getNews (api, action) {
//   const { data } = action
//   // get current data from Store
//   // const currentData = yield select(NewsSelectors.getData)
//   // make the call to the api
//   const response = yield call(api.getnews, data)

//   // success?
//   if (response.ok) {
//     // You might need to change the response here - do this with a 'transform',
//     // located in ../Transforms/. Otherwise, just pass the data back from the api.
//     yield put(NewsActions.newsSuccess(response.data))
//   } else {
//     yield put(NewsActions.newsFailure())
//   }
// }

export function * getNews (api, action) {
  const {data} = action
  const response = yield call(api.getNews, data)

  if (response.ok) {
    // used to update redux data
    // let responseData = response.data
    // if (data.page > 1) {
    //   const {payload} = yield select(NewsSelectors.getNewsData)
    //   if (payload) {

    //     let {articles} = payload
    //     let newArticles = [...articles].concat(response.data.articles)

    //     responseData = {
    //       ...responseData,
    //       articles: newArticles
    //     }
    //   }
    // }

    yield put(NewsActions.getNewsSuccess(response.data))
  } else {
    handleError(response.problem)
    yield put(NewsActions.getNewsFailure(response))
  }
}

export function * getHeadlines (api, action) {
  const {data} = action

  const response = yield call(api.getHeadlines, data)

  if (response.ok) {
    // used to update redux data
    // let responseData = response.data
    // if (data.page > 1) {
    //   const {payload} = yield select(NewsSelectors.getHeadlinesData)
    //   if (payload) {

    //     let {articles} = payload
    //     let newArticles = [...articles].concat(response.data.articles)

    //     responseData = {
    //       ...responseData,
    //       articles: newArticles
    //     }
    //   }
    // }

    yield put(NewsActions.getHeadlinesSuccess(response.data))
  } else {
    handleError(response.problem)
    yield put(NewsActions.getHeadlinesFailure(response))
  }
}
