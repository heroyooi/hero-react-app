import React, { useState, useCallback, useEffect } from 'react';
import produce from 'immer';

import { ComponentMapWrap } from './styles';
import { SubTitle } from '@styles/common';
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@components';

const ComponentMap = () => {
  // Checkbox
  const onChangeChk = useCallback((e) => {
    console.log(`선택한 값: ${e.target.name}, 체크 여부: ${e.target.checked}`);
  }, []);

  // Checkbox Group
  const [chkAll, setChkAll] = useState(false);
  const [chkItems, setChkItems] = useState([
    { id: 'chk-group-1', label: '체크박스 1', checked: false },
    { id: 'chk-group-2', label: '체크박스 2', checked: false },
    { id: 'chk-group-3', label: '체크박스 3', checked: false },
    { id: 'chk-group-4', label: '체크박스 4', checked: false },
  ]);
  const onChangeChkAll = useCallback((e) => {
    setChkItems(
      produce((draft) => {
        draft.map((item) => {
          item.checked = e.target.checked ? true : false;
        });
      }),
    );
  }, []);
  const onChangeChkGroup = useCallback(
    (e) => {
      const _index = chkItems.findIndex((item) => item.id === e.target.id);
      setChkItems(
        produce((draft) => {
          draft[_index].checked = !draft[_index].checked;
        }),
      );
    },
    [chkItems],
  );
  useEffect(() => {
    const filtered = chkItems.filter((item) => item.checked === true);
    setChkAll(filtered.length === chkItems.length);
  }, [chkItems]);

  // Radio
  const onChangeRadio = useCallback((e) => {
    console.log(`선택한 값: ${e.target.name}, 체크 여부: ${e.target.checked}`);
  }, []);

  // Radio Group
  const [radioItems, setRadioItems] = useState([
    { id: 'radio-group-1', label: '라디오 1', name: 'radio-group', checked: true },
    { id: 'radio-group-2', label: '라디오 2', name: 'radio-group', checked: false },
    { id: 'radio-group-3', label: '라디오 3', name: 'radio-group', checked: false },
    { id: 'radio-group-4', label: '라디오 4', name: 'radio-group', checked: false },
  ]);
  const onChangeRadioGroup = useCallback(
    (e) => {
      setRadioItems(
        produce((draft) => {
          draft.map((item) => {
            item.checked = item.id === e.target.id ? true : false;
          });
        }),
      );
    },
    [radioItems],
  );

  return (
    <ComponentMapWrap>
      <SubTitle size={18}>컴포넌트 모음</SubTitle>
      <div>
        <SubTitle size={16}>체크박스 단일 - 체크됨</SubTitle>
        <Checkbox label="체크박스" id="chk-1-checked" checked={true} onChange={onChangeChk} />

        <SubTitle size={16}>체크박스 단일 - 비활성화</SubTitle>
        <Checkbox label="체크박스" id="chk-1-disabled" disabled={true} onChange={onChangeChk} />
      </div>

      <div>
        <SubTitle size={16}>체크박스 그룹</SubTitle>
        <Checkbox label="모두 체크" id="chk-group-all" checked={chkAll} onChange={onChangeChkAll} />
        <CheckboxGroup items={chkItems} onChange={onChangeChkGroup} />
      </div>

      <div>
        <SubTitle size={16}>라디오 단일 - 체크됨</SubTitle>
        <Radio label="라디오" name="radio-1" id="radio-1-checked" checked={true} onChange={onChangeRadio} />

        <SubTitle size={16}>라디오 단일 - 비활성화</SubTitle>
        <Radio label="라디오" name="radio-1-disabled" id="radio-1-disabled" disabled={true} onChange={onChangeRadio} />
      </div>

      <div>
        <SubTitle size={16}>라디오 그룹</SubTitle>
        <RadioGroup items={radioItems} onChange={onChangeRadioGroup} />
      </div>
    </ComponentMapWrap>
  );
};

export default ComponentMap;
