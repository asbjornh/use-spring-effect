import React from 'react';

import useMultiSpringEffect from './use-multi-spring-effect';
import useSingleSpringEffect from './use-single-spring-effect';

export default function useSpringEffect(initialValue, ...args) {
  const init = React.useRef(initialValue);

  if (typeof init.current === 'object' && init.current !== null) {
    return useMultiSpringEffect(initialValue, ...args);
  } else {
    return useSingleSpringEffect(initialValue, ...args);
  }
}
