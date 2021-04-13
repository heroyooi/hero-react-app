import utils from '@utils';

const analyzeError = (errObject) => {
  // NETWORK ERROR CASE
  // CASE.1. HTTP PROTOCOL ERROR // ex: 404 error
  if (errObject.isAxiosError && utils.isNumber(errObject.response?.status)) {
    return {
      result_code: errObject.response.status,
      result_message: '잠시후 다시 시도해주세요',
    };
  } else if (errObject.errorCode) {
    // CASE.2. ONESTORE WAS ERROR FORMAT
    /** 아래와 같은 200이 아닌 BAD REQUEST 에 대해 일반포맷으로 전달해줘야 한다. 아래 예제는 400오류
     * {
        "httpStatus" : "BAD_REQUEST",
        "errorEventId" : "1609377691847-bade3a7e-86a0-4201-a18e-e0b9579a7ba6",
        "errorCode" : "99999",
        "message" : "시스템 오류가 발생 하였습니다.",
        "redirectUrl" : null,
        "needReloadPage" : false,
        "nativeApp" : false
      }
    */
    return {
      result_code: errObject.errorCode,
      result_message: errObject.message,
    };
  } else {
    // timeout error 케이스에 대해서도 대처가 필요함.
    // 판별 불가한 오류인 경우 로그를 통해 format 확인 필요.
    utils.log('UNKNOWN ERROR ::: ', errObject);
    return {
      result_code: 'UNKNOWN_ERROR',
      result_message: '잠시후 다시 시도해주세요',
    };
  }
};

export default function createPromiseThunk(actionType, promiseCreator, reqInfo) {
  return (...params) => {
    // promiseCreator가 없는 경우 예외 처리 -> Promise 강제 등록 (응답 format 일치하기 위해)
    if (utils.isEmpty(promiseCreator)) {
      promiseCreator = (...params) =>
        new Promise((resolve, reject) => {
          if (utils.isEmpty(params)) {
            resolve({}); // 하단의 utils.isEmpty(response) 로직 방지를 위해 빈 객체 전달
          } else {
            resolve(...params);
          }
        });
    }

    return async (dispatch) => {
      // REQUEST
      dispatch({ type: `${actionType}_REQUEST`, reqInfo: reqInfo });
      try {
        const response = await promiseCreator(...params);

        if (utils.isEmpty(response)) {
          console.error(`${actionType}_ERROR => response is empty`);
          dispatch({
            type: `${actionType}_ERROR`,
            payload: null,
            reqInfo: reqInfo,
          });
          return {
            result_code: 'EMPTY_RESPONSE',
            result_message: '시스템 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
          };
        }

        let resultResponse;
        if (
          utils.hasProperty(response, 'data') &&
          utils.hasProperty(response, 'headers') &&
          utils.hasProperty(response, 'status')
        ) {
          resultResponse = response.data;
        } else {
          resultResponse = response;
        }

        // RESULT_CODE 존재시 표준 api 응답 규격으로 판단
        if (utils.hasProperty(resultResponse, 'result_code')) {
          const resultCode = resultResponse['result_code'];
          // 실패
          if (resultCode !== RESULT_SUCCESS_CODE) {
            // 성공이 아닌 경우 param 이 없고 redux store 에서 오류 발생.
            // 표준 api 응답 규격이고 ignoreCommonError 처리 대상인 경우 공통 에러 로직 처리
            if (!ignoreCommonError) {
              // TODO.
              _log(`[webLog] == logic error [${resultCode}]${resultResponse[RESULT_MESSAGE]}`);
              if (resultCode === RESULT_NO_AUTH_CODE) {
                // 권환없음 또는 미로그인
                // Error , error.code , error.message // 각페이지의 catch에서 utils.handleResponseError 로 공통 처리
                // throw new utils.CustomException(new Error('RESULT_NO_AUTH_CODE'), RESULT_NO_AUTH_CODE, '접근 권한이 없습니다.')
                // if (window) window.location.href = `${API_SERVER}/member/login`
                console.error('RESULT_NO_AUTH_CODE : 접근권한이 없습니다.');
              }
              // TODO. 논리적 에러도 ERROR 처리 할 것인가, SUCCESS 처리하고 그곳에서 코드 판단하여 처리 할 것인가?
            }
          }
        }

        dispatch({
          type: `${actionType}_SUCCESS`,
          payload: resultResponse,
          reqInfo: reqInfo,
        });

        return resultResponse;
      } catch (e) {
        // FAILURE (network 에러 포함)
        console.error(`${actionType}_FAILURE => `, e); // TODO. SSR/CSR 에러 분기하고, SSR 인 경우 log 포맷에 맞게 출력
        dispatch({
          type: `${actionType}_FAILURE`,
          payload: e,
          reqInfo: reqInfo,
        });
        return analyzeError(e);
      }
    };
  };
}
