import * as React from 'react';

import SpringEffect from './components/spring-effect';
import SpringStyle from './components/spring-style';
import MultiSpringEffect from './components/multi-spring-effect';

const Index = () => {
  const [mounted, setMounted] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') setMounted(m => !m);
    });
  }, []);
  return (
    <React.Fragment>
      {mounted && <SpringEffect />}
      <SpringStyle />
      {mounted && <MultiSpringEffect />}
    </React.Fragment>
  );
};

Index.propTypes = {};

export default Index;
