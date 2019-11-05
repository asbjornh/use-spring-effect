import * as React from 'react';

import transform from 'css-transform-string';
import { useSpringStyle } from '../../source/index';

const getStyle = val => ({
  transform: transform({ x: val })
});

const TestPage = () => {
  const [value, setValue] = React.useState(0);
  const [ref, transitionTo] = useSpringStyle(0, getStyle, []);

  const toggle = () =>
    setValue(value => {
      const newValue = value === 0 ? 1 : 0;
      transitionTo(el => (newValue === 1 ? el.offsetWidth : 0));
      return newValue;
    });

  return (
    <div>
      <h2>useSpringStyle</h2>
      <div className="box" ref={ref} />
      <button data-back-button type="button" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

TestPage.propTypes = {};

export default TestPage;
