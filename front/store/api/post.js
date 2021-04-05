import axios from 'axios';
import utils from 'utils';

export const loadPost = async (param) => {
  // if (utils.isEmpty(param)) {
  //   throw new utils.CustomException(new Error('REQ PARAM MISSING'), 'API_ERROR', 'post.loadPost');
  // }
  let res;
  if (param) {
    res = await axios.get(`http://localhost:82/posts/${param}`);
  } else {
    res = await axios.get(`http://localhost:82/posts`);
  }
  return res;
};
