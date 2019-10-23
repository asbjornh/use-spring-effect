import React from 'react';

import transform from 'css-transform-string';

import useSpringEffect from 'source/use-spring-effect';

const getStyle = val =>
  transform({ x: val * 300, scale: 1 - 0.5 * val, rotate: val * 90 });

const TestPage = () => {
  const [el, ref] = React.useState();
  const [animateTo] = useSpringEffect(
    0,
    value => el && (el.style.transform = getStyle(value)),
    {},
    [el]
  );

  const toggle = () => animateTo(value => (value === 0 ? 1 : 0));

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
