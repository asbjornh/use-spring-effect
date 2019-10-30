import * as React from 'react';

import useSingleSpringEffect, {
  SpringConfig,
  UpdateSpring
} from './use-single-spring-effect';

export default function useSpringEffect(
  initialValue: number | { [key: string]: number },
  onSpringUpdate = (value: number) => {},
  configOrDependencies: any[] | SpringConfig,
  dependencies: any[]
) {
  const init = React.useRef(initialValue);

  if (typeof init.current === 'number') {
    return useSingleSpringEffect(
      initialValue as number,
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

  const transitionTo: UpdateSpring = React.useCallback((value = {}) => {
    Object.entries(value).forEach(([key, value]) => {
      if (!springs.current[key]) return;
      const newValue =
        typeof value === 'function' ? value(values.current) : value;
      const [transitionTo] = springs.current[key];
      transitionTo(newValue);
    });
  }, []);

  const setValue: UpdateSpring = React.useCallback((value = {}) => {
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
