import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { UtilWrap } from './styles';

const Util = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me, shallowEqual);

  const onLogIn = useCallback(() => {
    dispatch({
      type: 'LOG_IN',
      data: '홍길동',
    });
  }, []);

  const onLogOut = useCallback(() => {
    dispatch({
      type: 'LOG_OUT',
    });
  }, []);

  return (
    <UtilWrap>
      {me !== null && (
        <li>
          <em>{me.nickname}</em>님 반갑습니다.
        </li>
      )}
      {me !== null ? (
        <>
          <li>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </li>
          <li>
            <a onClick={onLogOut}>로그아웃</a>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </li>
          <li>
            <a onClick={onLogIn}>로그인</a>
          </li>
        </>
      )}
    </UtilWrap>
  );
};

export default Util;
