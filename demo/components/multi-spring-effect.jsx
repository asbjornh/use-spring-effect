import React from 'react';

import transform from 'css-transform-string';
import useSpringEffect from 'source/use-spring-effect';

const getXY = (x, y) => transform({ x, y, rotate: y / 10 + x / 10 });

const TestPage = () => {
  const [el, ref] = React.useState();

  const [animateTo] = useSpringEffect(
    { x: 0, y: 0 },
    ({ x, y }) => {
      if (el) el.style.transform = getXY(x, y);
    },
    {},
    [el]
  );

  const onMouseMove = e => {
    const rect = e.target.getBoundingClientRect();
    animateTo({
      x: e.clientX,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="demo-wrapper" onMouseMove={onMouseMove}>
      <h2>useMultiSpringEffect</h2>
      <div className="box" ref={ref} />
    </div>
  );
};

TestPage.propTypes = {};

export default TestPage;
