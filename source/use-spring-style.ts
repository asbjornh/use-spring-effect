import * as React from 'react';

import useSpringEffect from './use-spring-effect';
import { SpringConfig } from './use-single-spring-effect';

const setStyle = (element, style = {}) =>
  Object.entries(style).forEach(([key, value]) => {
    element.style[key] = value;
  });

type UpdateSpring = (
  value: number | ((value: number, element: HTMLElement) => number)
) => void;

type InlineStyle = { [key: string]: string | number };

export default function useSpring(
  initialValue = 0,
  getStyle = (value: number): InlineStyle => ({}),
  configOrDependencies: any[] | SpringConfig,
  dependencies = []
): [React.Dispatch<any>, UpdateSpring, UpdateSpring] {
  const [element, setElement] = React.useState();

  const [transitionTo, setValue] = useSpringEffect(
    initialValue,
    value => {
      element && setStyle(element, getStyle(value));
    },
    configOrDependencies,
    [element, ...dependencies]
  );

  const transitionToEl: UpdateSpring = React.useCallback(
    value =>
      transitionTo(
        typeof value === 'function' ? v => value(v, element) : value
      ),
    [transitionTo, element]
  );

  const setValueEl: UpdateSpring = React.useCallback(
    value =>
      setValue(typeof value === 'function' ? v => value(v, element) : value),
    [element, setValue]
  );

  return [setElement, transitionToEl, setValueEl];
}
