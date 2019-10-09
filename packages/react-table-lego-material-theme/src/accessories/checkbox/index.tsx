import React, { useCallback, useState } from 'react';

import isNil from 'lodash/isNil';

import Label from './label';
import Indicator from './indicator';
import Input from './input';

type ChangeCallback = (e: React.SyntheticEvent, checked: boolean) => void;

interface Props {
  id?: string;
  name?: string;

  value?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: ChangeCallback;

  height?: number;
}

const Checkbox: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onChange, defaultChecked = false, label, height,
    ...inputProps
  } = props;

  const [checkedState, setCheckedState] = useState<boolean>(defaultChecked);
  const isControlled = !isNil(props.checked);
  const checked = isControlled ? props.checked : checkedState;

  const handleChange = useCallback((e) => {
    if (!isControlled) {
      setCheckedState(!checked);
    }

    if (onChange) {
      onChange(e, !checked);
    }
  }, [onChange, isControlled, checked]);

  return (
    <Label>
      <Input { ...inputProps }
        checked={ checked }
        onChange={ handleChange }
      />
      <Indicator height={ height } />
      <span className='label'>{ label }</span>
    </Label>
  )
};

export default Checkbox;
