import * as React from 'react';

import useSpringEffect from './use-spring-effect';
import { SpringConfig } from './use-spring-effect';

export default function useSpring(
  initialValue: number,
  configOrDependencies?: any[] | SpringConfig,
  dependencies?
): [number, (v: number) => void, (v: number) => void] {
  const [state, setState] = React.useState(initialValue);

  const [transitionTo, setValue] = useSpringEffect(
    initialValue,
    setState,
    configOrDependencies,
    dependencies
  );

  return [state, transitionTo, setValue];
}
