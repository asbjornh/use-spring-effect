import * as React from 'react';

import transform from 'css-transform-string';
import useSpringEffect from '../../source/index';

const getTransform = (x, y) => transform({ x, y, rotate: y / 10 + x / 10 });

const TestPage = () => {
  const [el, ref] = React.useState();

  const [transitionTo] = useSpringEffect(
    { x: 0, y: 0 },
    ({ x, y }) => {
      if (el) el.style.transform = getTransform(x, y);
    },
    [el]
  );

  const onMouseMove = e => {
    const rect = e.target.getBoundingClientRect();
    transitionTo({
      x: e.clientX,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="demo-wrapper" onMouseMove={onMouseMove}>
      <h2>useSpringEffect (object)</h2>
      <div className="box" ref={ref} />
    </div>
  );
};

TestPage.propTypes = {};

export default TestPage;
