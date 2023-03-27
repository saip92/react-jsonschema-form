import { FormEvent } from 'react';
import { Checkbox } from '@fluentui/react';
import {
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  labelValue,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import _pick from 'lodash/pick';

import FluentLabel, { styles_red } from '../FluentLabel/FluentLabel';
import { allowedProps } from '../CheckboxWidget';

export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  label,
  hideLabel,
  id,
  disabled,
  options,
  value,
  readonly,
  required,
  onChange,
  rawErrors = [],
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled } = options;
  const checkboxesValues = Array.isArray(value) ? value : [value];

  const _onChange = (index: number) => (_ev?: FormEvent<HTMLElement>, checked?: boolean) => {
    if (checked) {
      onChange(enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions));
    } else {
      onChange(enumOptionsDeselectValue<S>(index, checkboxesValues, enumOptions));
    }
  };

  const uiProps = _pick((options.props as object) || {}, allowedProps);

  return (
    <>
      {labelValue(<FluentLabel label={label || undefined} required={required} />, hideLabel)}
      {Array.isArray(enumOptions) &&
        enumOptions.map((option, index: number) => {
          const checked = enumOptionsIsSelected<S>(option.value, checkboxesValues);
          const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
          return (
            <Checkbox
              id={optionId(id, index)}
              name={id}
              checked={checked}
              label={option.label}
              disabled={disabled || itemDisabled || readonly}
              onChange={_onChange(index)}
              key={index}
              {...uiProps}
              aria-describedby={ariaDescribedByIds<T>(id)}
            />
          );
        })}
      <span style={styles_red}>{(rawErrors || []).join('\n')}</span>
    </>
  );
}
