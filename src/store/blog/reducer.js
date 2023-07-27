import {
  SET_BLOGS,
  SET_LATEST_BLOGS,
  GET_RECOMMEND_BLOGS,
  GET_RECOMMEND_BLOGS_SUCCESS,
  GET_BLOG_BYID,
  GET_BLOG_BYID_SUCCESS,
  SET_ANOTHER_BLOGS
} from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  blogs: [],
  latestBlogs: [],
  recommendBlogs: [],
  anotherBlogs: [],
  currentBlog: null
};

const blogs = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOGS:
      state = {
        ...state,
        blogs: action.payload
      };
      break;
    case SET_LATEST_BLOGS:
      state = {
        ...state,
        latestBlogs: action.payload
      };
      break;

    case SET_ANOTHER_BLOGS:
      state = {
        ...state,
        anotherBlogs: action.payload
      };
      break;

    case GET_RECOMMEND_BLOGS:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_RECOMMEND_BLOGS_SUCCESS:
      state = {
        ...state,
        loading: false,
        recommendBlogs: action.payload
      };
      break;

    case GET_BLOG_BYID:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_BLOG_BYID_SUCCESS:
      state = {
        ...state,
        loading: false,
        currentBlog: action.payload
      };
      break;


    default:
      state = { ...state };
      break;
  }
  return state;
};

export default blogs;
