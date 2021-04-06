import utils from 'utils';

export const totalCounts = async () => {
  const url = `http://localhost:82/posts`;
  return utils.axiosGet(url);
};

export const loadPost = async (id) => {
  if (utils.isEmpty(id)) {
    throw new utils.CustomException(new Error('REQ PARAM MISSING'), 'API_ERROR', 'post.loadPost');
  }
  const url = `http://localhost:82/posts/${id}`;
  return utils.axiosGet(url);
};

export const loadPosts = async (param) => {
  if (utils.isEmpty(param)) {
    throw new utils.CustomException(new Error('REQ PARAM MISSING'), 'API_ERROR', 'post.loadPosts');
  }
  const url = `http://localhost:82/posts`;
  // const url = `http://localhost:82/posts?_sort=id&_order=ASC`;
  return utils.axiosGet(url, param);
};
