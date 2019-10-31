import * as React from 'react';

import transform from 'css-transform-string';

import useSpringEffect from '../../source/index';

const getStyle = val =>
  transform({ x: val * 300, scale: 1 - 0.5 * val, rotate: val * 90 });

const TestPage = () => {
  const [value, setValue] = React.useState(0);
  const [el, ref] = React.useState();
  const [transitionTo] = useSpringEffect(
    0,
    value => el && (el.style.transform = getStyle(value)),
    [el]
  );

  const toggle = () =>
    setValue(v => {
      const newV = v === 0 ? 1 : 0;
      transitionTo(newV);
      return newV;
    });

  return (
    <div>
      <h2>useSpringEffect (number)</h2>
      <div className="box" ref={ref} />
      <button data-back-button type="button" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

TestPage.propTypes = {};

export default TestPage;
