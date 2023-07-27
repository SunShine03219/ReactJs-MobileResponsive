import {
  SET_BLOGS,
  SET_LATEST_BLOGS,
  GET_RECOMMEND_BLOGS,
  GET_RECOMMEND_BLOGS_SUCCESS,
  GET_BLOG_BYID,
  GET_BLOG_BYID_SUCCESS,
  SET_ANOTHER_BLOGS
} from "./actionTypes";

export const setBlogs = (blogs) => {
  return {
    type: SET_BLOGS,
    payload: blogs,
  };
};

export const setLatestBlogs = (blogs) => {
  return {
    type: SET_LATEST_BLOGS,
    payload: blogs,
  };
};

export const setAnotherBlogs = (blogs) => {
  return {
    type: SET_ANOTHER_BLOGS,
    payload: blogs,
  };
};

export const getRecommendBlogs = () => {
  return {
    type: GET_RECOMMEND_BLOGS,
  };
};

export const getRecommendBlogsSuccess = (blogs) => {
  return {
    type: GET_RECOMMEND_BLOGS_SUCCESS,
    payload: blogs
  };
};

export const getBlogById = (blogId) => {
  return {
    type: GET_BLOG_BYID,
    payload: blogId
  };
};

export const getBlogByIdSuccess = (blog) => {
  return {
    type: GET_BLOG_BYID_SUCCESS,
    payload: blog
  };
};

















