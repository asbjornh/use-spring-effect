import React from 'react';

import useSingleSpringEffect from './use-single-spring-effect';

export default function useSpringEffect(
  initialValue,
  onSpringUpdate = v => {}, // eslint-disable-line no-unused-vars
  configOrDependencies,
  dependencies
) {
  const init = React.useRef(initialValue);

  if (typeof init.current === 'number') {
    return useSingleSpringEffect(
      initialValue,
      onSpringUpdate,
      configOrDependencies,
      dependencies
    );
  }

  const springs = React.useRef({});
  const values = React.useRef(initialValue || {});
  const animatedValues = React.useRef(initialValue || {});

  for (const key in values.current) {
    const callbacks = useSingleSpringEffect(
      values.current[key],
      val => {
        animatedValues.current[key] = val;
        onSpringUpdate(animatedValues.current);
      },
      configOrDependencies,
      dependencies
    );
    springs.current[key] = callbacks;
  }

  const animateTo = React.useCallback((value = {}) => {
    Object.entries(value).forEach(([key, value]) => {
      if (!springs.current[key]) return;
      const [animateTo] = springs.current[key];
      animateTo(value);
    });
  }, []);

  const animateToProxy = React.useCallback(value => {
    animateTo(typeof value === 'function' ? value(values.current) : value);
  });

  return [animateToProxy];
}
