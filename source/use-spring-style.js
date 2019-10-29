import React from 'react';

import useSpringEffect from './use-spring-effect';

const setStyle = (element, style = {}) =>
  Object.entries(style).forEach(([key, value]) => {
    element.style[key] = value;
  });

export default function useSpring(
  initialValue = 0,
  getStyle = () => ({}),
  configOrDependencies,
  dependencies = []
) {
  const [element, setElement] = React.useState();

  const [animateTo, setValue] = useSpringEffect(
    initialValue,
    value => {
      element && setStyle(element, getStyle(value));
    },
    configOrDependencies,
    [element, ...dependencies]
  );

  const animateToEl = React.useCallback(
    value => {
      animateTo(typeof value === 'function' ? v => value(v, element) : value);
    },
    [animateTo, element]
  );

  const setValueEl = React.useCallback(
    value => {
      setValue(typeof value === 'function' ? v => value(v, element) : value);
    },
    [element, setValue]
  );

  return [setElement, animateToEl, setValueEl];
}
