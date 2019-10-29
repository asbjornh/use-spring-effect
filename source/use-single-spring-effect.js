import React from 'react';
import rebound from 'rebound';

const defaultConfig = { tension: 50, friction: 5 };

export default function useSingleSpringEffect(
  initialValue = 0,
  onSpringUpdate = v => {}, // eslint-disable-line no-unused-vars
  configOrDependencies,
  dependencies = []
) {
  const config = Array.isArray(configOrDependencies)
    ? defaultConfig
    : configOrDependencies || defaultConfig;

  const deps = Array.isArray(configOrDependencies)
    ? configOrDependencies
    : dependencies;

  const springSystem = React.useRef(new rebound.SpringSystem());
  const spring = React.useRef(
    springSystem.current.createSpring(config.tension, config.friction)
  );

  // Set initial value and cleanup on unmount
  React.useEffect(() => {
    spring.current.setCurrentValue(initialValue).setAtRest();
    return () => spring.current.destroy();
  }, []);

  // Connect `onSpringUpdate` to spring event
  React.useEffect(() => {
    spring.current.addListener({
      onSpringUpdate: spring => {
        onSpringUpdate(spring.getCurrentValue());
      }
    });

    return () => spring.current.removeAllListeners();
  }, [deps, ...dependencies]);

  // Animate value
  const valueRef = React.useRef(initialValue);
  const animateToValue = React.useCallback(value => {
    const newValue =
      typeof value === 'function' ? value(valueRef.current) : value;
    spring.current.setEndValue(newValue);
    valueRef.current = newValue;
  }, []);

  // Set value without animation
  const setValue = React.useCallback(value => {
    const newValue =
      typeof value === 'function' ? value(valueRef.current) : value;
    spring.current.setCurrentValue(newValue).setAtRest();
    valueRef.current = newValue;
  }, []);

  return [animateToValue, setValue];
}
