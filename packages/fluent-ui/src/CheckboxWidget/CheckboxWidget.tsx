import { useCallback } from 'react';
import { Checkbox, ICheckboxProps } from '@fluentui/react';
import {
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import _pick from 'lodash/pick';

// Keys of ICheckboxProps from @fluentui/react
export const allowedProps: (keyof ICheckboxProps)[] = [
  'ariaDescribedBy',
  'ariaLabel',
  'ariaPositionInSet',
  'ariaSetSize',
  'boxSide',
  'checked',
  'checkmarkIconProps',
  'className',
  'componentRef',
  'defaultChecked',
  'defaultIndeterminate',
  'disabled',
  'indeterminate',
  'inputProps',
  'label',
  'onChange',
  'onRenderLabel',
  'styles',
  'theme',
];

export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    // required,
    disabled,
    readonly,
    label,
    hideLabel,
    schema,
    onChange,
    options,
    registry,
    uiSchema,
  } = props;
  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    options
  );

  const _onChange = useCallback(
    (_, checked?: boolean): void => {
      onChange(checked);
    },
    [onChange]
  );

  const uiProps = _pick((options.props as object) || {}, allowedProps);
  const description = options.description ?? schema.description;

  return (
    <>
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <Checkbox
        id={id}
        name={id}
        label={labelValue(label || undefined, hideLabel)}
        disabled={disabled || readonly}
        checked={typeof value === 'undefined' ? false : value}
        onChange={_onChange}
        {...uiProps}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </>
  );
}
