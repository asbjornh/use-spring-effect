import * as React from 'react';
import Spring from 'tiny-spring';

const defaultConfig = { stiffness: 200, damping: 10, precision: 100 };

export type SpringConfig = {
  stiffness?: number;
  damping?: number;
  precision?: number;
};

export default function useSpringEffect(
  initialValue: number,
  onUpdate: (value: number) => void,
  configOrDependencies: SpringConfig | any[],
  dependencies: any[] = []
) {
  const config = Array.isArray(configOrDependencies)
    ? defaultConfig
    : Object.assign({}, defaultConfig, configOrDependencies);

  const deps = Array.isArray(configOrDependencies)
    ? configOrDependencies.concat(dependencies)
    : dependencies;

  const spring = React.useMemo(() => Spring(initialValue, config), []);
  React.useEffect(() => spring.onUpdate(onUpdate), deps);
  React.useEffect(() => () => spring.destroy(), []); // Unmount

  return [spring.transitionTo, spring.transitionTo];
}
