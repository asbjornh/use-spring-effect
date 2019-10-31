import * as React from 'react';
import Spring from 'tiny-spring';

const defaultConfig = { stiffness: 200, damping: 10, precision: 100 };

export type SpringConfig = {
  stiffness?: number;
  damping?: number;
  precision?: number;
};

export type UpdateSpring<T> = (value: ((value: T) => T) | T) => void;

export default function useSingleSpringEffect(
  initialValue = 0,
  onSpringUpdate = (value: number) => {},
  configOrDependencies: SpringConfig | any[],
  dependencies: any[] = []
) {
  const config = Array.isArray(configOrDependencies)
    ? defaultConfig
    : { ...defaultConfig, ...configOrDependencies };

  const deps = Array.isArray(configOrDependencies)
    ? configOrDependencies
    : dependencies;

  const spring = React.useRef(Spring(initialValue, config));

  // Unmount
  React.useEffect(() => () => spring.current.destroy(), []);

  React.useEffect(() => {
    spring.current.onUpdate(onSpringUpdate);
  }, deps);

  const valueRef = React.useRef(initialValue);
  const transitionTo: UpdateSpring<number> = React.useCallback(value => {
    const newValue =
      typeof value === 'function' ? value(valueRef.current) : value;
    spring.current.transitionTo(newValue);
    valueRef.current = newValue;
  }, []);

  // Set value without animation
  const setValue: UpdateSpring<number> = React.useCallback(value => {
    const newValue =
      typeof value === 'function' ? value(valueRef.current) : value;
    spring.current.setValue(newValue);
    valueRef.current = newValue;
  }, []);

  return [transitionTo, setValue];
}
