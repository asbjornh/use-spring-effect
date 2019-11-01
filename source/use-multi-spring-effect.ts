import * as React from 'react';

import useSingleSpringEffect, { SpringConfig } from './use-spring-effect';

type NumberDict = { [key: string]: number };

export default function useMultiSpringEffect(
  initialValue: NumberDict = {},
  onUpdate = (value: NumberDict) => {},
  configOrDependencies?: any[] | SpringConfig,
  dependencies?: any[]
): ((value: NumberDict) => void)[] {
  const springs: React.MutableRefObject<{
    [key: string]: ((v?: number) => void)[];
  }> = React.useRef({});
  const values: React.MutableRefObject<NumberDict> = React.useRef(initialValue);
  const animatedValues: React.MutableRefObject<NumberDict> = React.useRef(
    initialValue
  );

  for (const key in values.current) {
    const callbacks = useSingleSpringEffect(
      values.current[key],
      val => {
        animatedValues.current[key] = val;
        onUpdate(animatedValues.current);
      },
      configOrDependencies,
      dependencies
    );
    springs.current[key] = callbacks;
  }

  const transitionTo: (value: NumberDict) => void = React.useCallback(dict => {
    for (const key in dict) {
      if (!springs.current[key] || !dict[key]) return;
      const [transitionTo] = springs.current[key];
      transitionTo(dict[key]);
    }
  }, []);

  const setValue: (value: NumberDict) => void = React.useCallback(dict => {
    for (const key in dict) {
      if (!springs.current[key] || !dict[key]) return;
      const [_t, setValue] = springs.current[key];
      setValue(dict[key]);
    }
  }, []);

  return [transitionTo, setValue];
}
