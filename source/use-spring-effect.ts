import * as React from 'react';

import useSingleSpringEffect, {
  SpringConfig,
  UpdateSpring
} from './use-single-spring-effect';

type Dict = { [key: string]: number };

export default function useSpringEffect<T = number | Dict>(
  initialValue: T,
  onSpringUpdate = (value: T) => {},
  configOrDependencies?: any[] | SpringConfig,
  dependencies?: any[]
): UpdateSpring<T>[] {
  const init: { current: T } = React.useRef(initialValue);

  if (typeof init.current === 'number') {
    return useSingleSpringEffect(
      init.current,
      onSpringUpdate as any,
      configOrDependencies,
      dependencies
    ) as any;
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

  const transitionTo = React.useCallback((value = {}) => {
    Object.entries(value).forEach(([key, value]) => {
      if (!springs.current[key]) return;
      const newValue =
        typeof value === 'function' ? value(values.current) : value;
      const [transitionTo] = springs.current[key];
      transitionTo(newValue);
    });
  }, []);

  const setValue = React.useCallback((value = {}) => {
    Object.entries(value).forEach(([key, value]) => {
      if (!springs.current[key]) return;
      const newValue =
        typeof value === 'function' ? value(values.current) : value;
      const [_t, setValue] = springs.current[key];
      setValue(newValue);
    });
  }, []);

  return [transitionTo, setValue];
}
