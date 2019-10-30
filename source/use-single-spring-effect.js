import React from 'react';
import Spring from 'tiny-spring';

const defaultConfig = { stiffness: 200, damping: 10, precision: 100 };

export default function useSingleSpringEffect(
  initialValue = 0,
  onSpringUpdate = v => {}, // eslint-disable-line no-unused-vars
  configOrDependencies,
  dependencies = []
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
  const transitionTo = React.useCallback(value => {
    const newValue =
      typeof value === 'function' ? value(valueRef.current) : value;
    spring.current.transitionTo(newValue);
    valueRef.current = newValue;
  }, []);

  // Set value without animation
  const setValue = React.useCallback(value => {
    const newValue =
      typeof value === 'function' ? value(valueRef.current) : value;
    spring.current.setValue(newValue);
    valueRef.current = newValue;
  }, []);

  return [transitionTo, setValue];
}
