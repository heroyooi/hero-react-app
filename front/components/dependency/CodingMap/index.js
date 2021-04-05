import React, { memo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { SubTitle } from 'styles/common';
import { CodingMapWrap } from './styles';

const CodingMap = ({ list }) => {
  return (
    <CodingMapWrap>
      <SubTitle size={18}>코딩맵</SubTitle>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={item.name}>
              <Link href={item.href}>{`${index + 1}) ${item.name}`}</Link>
            </li>
          );
        })}
      </ul>
    </CodingMapWrap>
  );
};

CodingMap.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

export default memo(CodingMap);
