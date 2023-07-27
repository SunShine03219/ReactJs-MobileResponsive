import { call, put, takeEvery } from "redux-saga/effects";
import { GET_RECOMMEND_BLOGS, GET_BLOG_BYID } from "./actionTypes";
import { getRecommendBlogsSuccess, getBlogByIdSuccess} from "./actions";
import { getRecommendBlogsAsync, getBlogByIdAsync} from "../../helper/backend_helper"


function* getRecommendBlogs() {
  try {
    const response = yield call(getRecommendBlogsAsync)
    if(response?.data) {
      yield put(getRecommendBlogsSuccess(response.data))
    }

  } catch (error) {
    console.log(error)
  }
}

function* getBlogById({payload: blogId}) {
  try {
    const response = yield call(getBlogByIdAsync, blogId)
    if(response?.data) {
      yield put(getBlogByIdSuccess(response.data))
    }

  } catch (error) {
    console.log(error)
  }
}



function* blogSaga() {
  yield takeEvery(GET_RECOMMEND_BLOGS, getRecommendBlogs);
  yield takeEvery(GET_BLOG_BYID, getBlogById);

  
}

export default blogSaga;
