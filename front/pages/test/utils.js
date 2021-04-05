import React, { useRef, useState, useEffect } from 'react';
import { useInput, useResize } from 'hooks';
import { AppLayout } from 'components';
import { SubTitle } from 'styles/common';
import { TestSection } from 'styles/test';
import utils from 'utils';

const Utils = () => {
  const targetEl = useRef(null);
  const [result, setResult] = useState(null);

  // useInput 훅 사용 예제
  const callbackId = (val) => {
    if (val.trim() === '') {
      setIdErr(false);
    } else {
      if (!utils.isValidation(val, 'email')) {
        setIdErr(true);
      } else {
        setIdErr(false);
      }
    }
  };
  const [id, onChangeId, setId] = useInput('', callbackId);
  const [idErr, setIdErr] = useState(false);

  // useResize 훅 사용 예제
  const { isMobile, isTablet, isDesktop, windowWidth, windowHeight } = useResize();

  useEffect(() => {
    function onClickDocument(e) {
      const header = document.getElementsByClassName('header-wrap')[0];
      const liUnique = document.getElementsByClassName('li-unique')[0];
      if (utils.getExcludeArea([header, liUnique], e)) {
        setResult('해당 카드 혹은 헤더 영역을 클릭하셨습니다.');
      } else {
        setResult(null);
      }
    }
    document.addEventListener('click', onClickDocument);
    return () => {
      document.removeEventListener('click', onClickDocument);
    };
  }, []);

  return (
    <AppLayout>
      <SubTitle size={24}>테스트 유틸</SubTitle>

      <TestSection>
        <h2>SECTION 1</h2>
        <ul>
          <li>
            <dl>
              <dt>utils.scrollToTarget(ref)</dt>
              <dd>
                <button onClick={() => utils.scrollToTarget(targetEl)}>
                  유틸 scrollToTarget 테스트, 섹션2로 이동하기
                </button>
              </dd>
            </dl>
            <p className="info">* 특정 위치로 스크롤링</p>
          </li>
          <li>
            <dl>
              <dt>utils.setComma(str, separator)</dt>
              <dd>결과: {`현재 잔액은 ${utils.setComma(10240000)}원입니다.`}</dd>
            </dl>
            <p className="info">* string 문자열에 콤마(,)를 찍고, 구분자를 뒤에 붙여줌</p>
          </li>
          <li className="li-unique">
            <dl>
              <dt>utils.getExcludeArea(selectors, event)</dt>
              <dd>{!result ? <p>아무대나 클릭해보세요.</p> : <p>{result}</p>}</dd>
            </dl>
            <p className="info">
              * 클릭 이벤트 설정 시 제외 영역을 지정 (해당 카드와 헤더 영역을 제외하고 작동하도록 설정)
            </p>
          </li>
          <li>
            <dl>
              <dt>utils.isExplorer()</dt>
              <dd>나의 브라우저는 ?? {utils.isExplorer() ? '인터넷 익스플로러' : '크롬, 파이어폭스, 사파리'}</dd>
            </dl>
            <p>* 브라우저 확인 (인터넷 익스플로러 or 크롬, 파이어폭스, 사파리)</p>
          </li>
          <li>
            <dl>
              <dt>utils.getIeOldVersion()</dt>
              <dd>
                {utils.isExplorer() && (
                  <p>
                    인터넷 익스플로러 버전은 ??{' '}
                    {utils.getIeOldVersion() ? '인터넷 익스플로러 7~9' : '인터넷 익스플로러 10~11'}
                  </p>
                )}
              </dd>
            </dl>
            <p>* 익스플로러 버전 확인</p>
          </li>
        </ul>
      </TestSection>
      <TestSection ref={targetEl}>
        <h2>SECTION 2</h2>
        <ul>
          <li>
            <dl>
              <dt>utils.isValidation(val, method, state) &amp; useInput</dt>
              <dd>
                이메일: <input type="text" value={id} onChange={onChangeId} />
                {idErr && <p>이메일 형식이 맞지 않습니다. 확인 후 다시 입력해 주세요.</p>}
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>useResize</dt>
              <dd>
                <ul>
                  <li>
                    - 모바일 환경: <strong>{isMobile ? 'TRUE' : 'FALSE'}</strong>
                  </li>
                  <li>
                    - 태블릿 환경: <strong>{isTablet ? 'TRUE' : 'FALSE'}</strong>
                  </li>
                  <li>
                    - 데스크탑 환경: <strong>{isDesktop ? 'TRUE' : 'FALSE'}</strong>
                  </li>
                </ul>
                <p>
                  - 윈도우 사이즈 너비: <strong>{windowWidth}</strong>px, 높이: <strong>{windowHeight}</strong>px
                </p>
              </dd>
            </dl>
          </li>
        </ul>
      </TestSection>
      <TestSection>
        <h2>SECTION 3</h2>
      </TestSection>
    </AppLayout>
  );
};

export default Utils;
