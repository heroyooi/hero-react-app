import utils from '@utils';

const baseURL = 'http://localhost:82';

export const totalCounts = async () => {
  return utils.axiosGet(`${baseURL}/posts`);
};

export const loadPost = async (id) => {
  if (utils.isEmpty(id)) {
    throw new utils.CustomException(new Error('REQ PARAM MISSING'), 'API_ERROR', 'post.loadPost');
  }
  return utils.axiosGet(`${baseURL}/posts/${id}`);
};

export const loadPosts = async (param) => {
  if (utils.isEmpty(param)) {
    throw new utils.CustomException(new Error('REQ PARAM MISSING'), 'API_ERROR', 'post.loadPosts');
  }
  // const url = `${baseURL}/posts?_sort=id&_order=ASC`;
  return utils.axiosGet(`${baseURL}/posts`, param);
};

export const addPost = async (param) => {
  if (utils.isEmpty(param)) {
    throw new utils.CustomException(new Error('REQ PARAM MISSING'), 'API_ERROR', 'post.addPost');
  }
  return utils.axiosPost(`${baseURL}/posts`, param);
};
