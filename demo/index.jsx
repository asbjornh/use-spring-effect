import React from 'react';

import Spring from 'components/spring';
import SpringEffect from 'components/spring-effect';
import SpringStyle from 'components/spring-style';
import MultiSpringEffect from 'components/multi-spring-effect';

const Index = () => (
  <React.Fragment>
    <Spring />
    <SpringEffect />
    <SpringStyle />
    <MultiSpringEffect />
  </React.Fragment>
);

Index.propTypes = {};

export default Index;
