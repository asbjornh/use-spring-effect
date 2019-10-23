import React from 'react';

import useSpringEffect from './use-spring-effect';

export default function useMultiSpringEffect(
  initialValue = {},
  onSpringUpdate = () => {},
  springConfig,
  dependencies = []
) {
  const springs = React.useRef({});
  const values = React.useRef(initialValue);
  const animatedValues = React.useRef(initialValue);

  for (const key in values.current) {
    const callbacks = useSpringEffect(
      values.current[key],
      val => {
        animatedValues.current[key] = val;
        onSpringUpdate(animatedValues.current);
      },
      springConfig,
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
