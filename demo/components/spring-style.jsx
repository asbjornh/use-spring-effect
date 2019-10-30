import React from 'react';

import transform from 'css-transform-string';
import { useSpringStyle } from '../../source/index';

const getStyle = val => ({
  transform: transform({ x: val })
});

const TestPage = () => {
  const [ref, transitionTo] = useSpringStyle(0, getStyle);

  const toggle = () =>
    transitionTo((value, el) => (value === 0 ? el.offsetWidth : 0));

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
