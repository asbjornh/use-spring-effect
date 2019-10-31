import * as React from 'react';

import SpringEffect from './components/spring-effect';
import SpringStyle from './components/spring-style';
import MultiSpringEffect from './components/multi-spring-effect';

const Index = () => {
  const [mounted, setMounted] = React.useState(true);
  return (
    <React.Fragment>
      <button onClick={() => setMounted(m => !m)}>Toggle mounted</button>
      {mounted && <SpringEffect />}
      <SpringStyle />
      <MultiSpringEffect />
    </React.Fragment>
  );
};

Index.propTypes = {};

export default Index;
