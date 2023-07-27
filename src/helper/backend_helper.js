import axios from "axios";

const getRecommendBlogsAsync = () => axios.get(`${process.env.REACT_APP_BLOG_URL}/wp-json/wp/v2/posts?per_page=6&page=${1}`);
const getBlogByIdAsync = (blogId) => axios.get(`${process.env.REACT_APP_BLOG_URL}/wp-json/wp/v2/posts/${blogId}`);
// export const updateUser = (user) => put(url.UPDATE_USER, user);
// export const deleteUser = (user) => del(url.DELETE_USER, { headers: { user } });

export {
  getRecommendBlogsAsync,
  getBlogByIdAsync
};
