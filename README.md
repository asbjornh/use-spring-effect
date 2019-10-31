# useSpringEffect

React hooks for spring-animated side effects.

```
npm install use-spring-effect
```

Spring dynamics are a great alternative to the traditional duration/easing model of web animation. There are lots of good alternatives out there, like `react-motion`, `react-spring` or `animated`. Most of these, however, rely on React state. Running animations through state in React can sometimes come at a significant performance cost, as React attempts to evaluate a huge subtree 60 times per second.

`use-spring-effect` attempts to solve this problem by exposing a spring as a side effect rather than through state. If this makes you uncomfortable there is also a stateful `use-spring` included.

## TDLR usage

```jsx
// Animate scroll position
import useSpringEffect from 'use-spring-effect';

const Component = () => {
  const [transitionTo] = useSpringEffect(0, value => {
    document.scrollingElement.scrollTop = value;
  });

  return <button onClick={() => transitionTo(1000)}>Scroll!</button>;
};
```

```jsx
// Animate the transform property of .box
import { useSpringStyle } from 'use-spring-effect';

const Component = () => {
  const [ref, transitionTo] = useSpringStyle(0, value => ({
    transform: `translateX(${value}px)`
  }));

  return (
    <div>
      <div className="box" ref={ref} />
      <button onClick={() => transitionTo(100)}>Move!</button>
    </div>
  );
};
```

## API

### useSpringEffect

```js
import useSpringEffect from 'use-spring-effect';
const [transitionTo, setValue] = useSpringEffect();
```

```ts
function useSpringEffect(
  initialValue: number,
  onUpdate: (value: number) => void,
  configOrDependencies?: SpringConfig | any[],
  dependencies?: any[]
): ((value: number) => void)[];
```

See usage example above. The third argument can be either a dependency array or a `SpringConfig` (see below). When `transitionTo` is called with a value, the spring will start animating towards that value. `setValue` sets the value immediately, without animation.

### useSpringStyle

```js
import { useSpringStyle } from 'use-spring-effect';
const [ref, transitionTo, setValue] = useSpringStyle();
```

```ts
type UpdateSpring = (
  value: number | ((element: HTMLElement) => number)
) => void;
function useSpringStyle(
  initialValue: number,
  getStyle: (value: number) => InlineStyle,
  configOrDependencies?: SpringConfig | any[],
  dependencies = []
): [React.Dispatch<any>, UpdateSpring, UpdateSpring];
```

See usage example above. This hook returns a `ref` that needs to be connected to the element you want to apply animation to. While animating the hook will apply the inline styles to the `ref`. The second argument to `useSpringStyle` is a function that is called with the current spring value and should return an object of inline styles. `transitionTo` and `setValue` take a number or a function. In case of a function, it will be called with the animated element (example below).

```jsx
import { useSpringStyle } from 'use-spring-effect';

const Component = () => {
  const [ref, transitionTo] = useSpringStyle(0, value => ({
    transform: `translateX(${value}px)`
  }));

  return (
    <div>
      <div className="box" ref={ref} />
      <button onClick={() => transitionTo(element => element.offsetWidth)}>
        Move!
      </button>
    </div>
  );
};
```

### useMultiSpringEffect

```js
import { useMultiSpringEffect } from 'use-spring-effect';
const [transitionTo, setValue] = useMultiSpringEffect();
```

```ts
type NumberDict = { [key: string]: number };
function useMultiSpringEffect(
  initialValue: NumberDict,
  onUpdate: (value: NumberDict) => void,
  configOrDependencies?: SpringConfig | any[],
  dependencies?: any[]
): ((value: NumberDict) => void)[];
```

This hook works the same way as `useSpringEffect` except for the fact that it can animate multiple values at the same time. This is useful for stuff like tracking the mouse position or other things that depend on two or more values. Two things to note:

- `onUpdate` will be called once for every key in the provided object on each frame.
- You can't add other properties to the object other than those specified in `initialValue`.

Example (moves `.box` when the mouse is moved over the outer div):

```jsx
import { useMultiSpringEffect } from '../../source/index';

const Component = () => {
  const [el, setEl] = React.useState();
  const [transitionTo] = useMultiSpringEffect(
    { x: 0, y: 0 },
    ({ x, y }) => {
      if (el) el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [el]
  );
  const onMouseMove = e => {
    transitionTo({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div onMouseMove={onMouseMove}>
      <div className="box" ref={setEl} />
    </div>
  );
};
```

### useSpring

```js
import { useSpring } from 'use-spring-effect';
const [value, transitionTo, setValue] = useSpring();
```

```ts
function useSpring(
  initialValue: number,
  configOrDependencies?: SpringConfig | any[],
  dependencies?: any[]
): [number, (v: number) => void, (v: number) => void] {
```

This hook returns an animated `value`. Otherwise this hook works like `useSpringEffect`.

### SpringConfig

```ts
type SpringConfig = {
  stiffness?: number;
  damping?: number;
  precision?: number;
};
```

**`stiffness: number = 200`**

Stiffness controls how "fast" your animation will be. Higher values result in faster motion.

**`damping: number = 10`**

Damping controls how much friction is applied to the spring. You can think about this as how "wobbly" the resulting motion is. Lower values result in more wobbly-ness.

**`precision: number = 100`**

Used to determine when to stop animating. With a precision of `0` the spring will reach its end value immediately. With really high values it might keep animating fractions of a pixel for a long time. Tweak this value if animations end abruptly or linger for too long. When tweaking this value you'll want to make big changes in order to see an effect (like adding/removing zeros).
