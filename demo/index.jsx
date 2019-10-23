import React from 'react';

import SpringEffect from 'components/spring-effect';
import SpringStyle from 'components/spring-style';
import MultiSpringEffect from 'components/multi-spring-effect';

const Index = () => (
  <React.Fragment>
    <SpringEffect />
    <SpringStyle />
    <MultiSpringEffect />
  </React.Fragment>
);

Index.propTypes = {};

export default Index;
