import axios from 'axios';

const utils = {};

let cancel = null;

const config = (accessToken = '', tokenflag = true) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 20000, // 20s
  };

  // 인증이 필요한 통신에 따라 분기 처리 필요.
  // EX) GET, 파일업로드는 무인증 , POST , PUT은 인증필요 등.
  if (tokenflag) {
    if (accessToken) {
      config.headers.authorization = accessToken ?? null;
    } else {
      config.headers.authorization = null; // Cookies?.get('accessToken') ?? null;
    }
  }
  return config;
};

/**
 * AXIOS multipart-upload : use FormData()
 * @param {String} url
 * @param {Object} data : FormData : files 항목
 */
utils.axiosUpFile = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * AXIOS FILE DOWNLOAD : blob
 * @param {String} url : `/api/cmm/file/download.do?fileId=${fileSaveId}`
 */
utils.axiosDown = (url) => {
  const option = config();

  return new Promise((resolve, reject) => {
    const urlOpt = {
      url: url,
      method: 'GET',
      responseType: 'blob',
    };

    axios(urlOpt, option)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * AXIOS GET PROMISE
 * @param {String}} url
 * @param {Boolean} useCancelToken
 * @param {Boolean} tokenflag
 */
utils.axiosGet = (url, params, useCancelToken = false, tokenflag = true) => {
  const option = config('', tokenflag);
  option.params = params;

  if (useCancelToken) {
    if (cancel) cancel.cancel();
    cancel = axios.CancelToken.source();
    option.cancelToken = cancel.token;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then((response) => {
        console.log('response ::: ', response);
        resolve(response);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
          //cancel(); // 선행요청과 후행요청을 같이 cancel 하고 싶은 경우에는 주석을 풀어야 한다.
        } else {
          reject(err);
        }
      });
  });
};

/**
 * AXIOS GET ASYNC AWAIT
 * @param {String} url
 * @param {Boolean} useCancelToken
 */
utils.axiosGetAsync = async (url, params, useCancelToken = false) => {
  let res;
  const option = config();

  if (useCancelToken) {
    if (cancel) cancel.cancel();
    cancel = axios.CancelToken.source();
    option.cancelToken = cancel.token;
  }

  option.params = params?.params;

  try {
    res = await axios.get(url, option);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    } else {
      return err;
    }
  }

  return res;
};

/**
 * AXIOS DELETE PROMISE
 * @param {String} url
 * @param {Object} params
 */
const deletePromise = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params, config())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
utils.axiosDelete = deletePromise;

/**
 * AXIOS POST PROMISE
 * @param {String} url
 * @param {Object} data
 * @param {Boolean} tokenflag
 * @param {String} refreshToken
 */
const postPromise = (url, data, tokenflag, refreshToken = '') => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config(refreshToken, tokenflag))
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
utils.axiosPost = postPromise;

/**
 * AXIOS POST ASYNC AWAIT
 * @param {String} url
 * @param {Object} data
 * @param {Boolean} useCancelToken
 */
const postAwait = async (url, data, useCancelToken = false) => {
  let res, cancel;

  const option = config();

  if (useCancelToken) {
    if (cancel) cancel.cancel();
    cancel = axios.CancelToken.source();
    option.cancelToken = cancel.token;
  }

  try {
    res = await axios.post(url, data, option);
  } catch (err) {
    return err;
  }

  return res;
};
utils.axiosPostAsync = postAwait;

const putPromise = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
utils.axiosPut = putPromise;

utils.axiosGetJson = (url, jsonData) => {
  const accessToken = null; // = Cookies.get('accessToken');
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 120000,
    params: jsonData,
  };

  if (accessToken) {
    option.headers.authorization = accessToken;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default utils;
