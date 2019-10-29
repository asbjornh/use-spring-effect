import React from 'react';

class Spring {
  constructor(initialPosition = 0) {
    this.callback = () => {};
    this.gravity = 100;
    this.mass = 20;
    this.position = initialPosition;
    this.velocity = 0;
    this.timeStep = 0.28;
    this.k = 2;
    this.damping = 10;
  }

  start() {
    this.draw();
  }

  onUpdate(callback) {
    this.callback = callback;
  }

  draw() {
    const { k, position, damping, velocity, mass, gravity, timeStep } = this;
    const springForce = -k * position;
    const dampingForce = damping * velocity;
    const force = springForce + mass * gravity - dampingForce;
    const acceleration = force / mass;

    const newVelocity = velocity + acceleration * timeStep;
    const newPosition = position + velocity + timeStep;

    if (Math.abs(newVelocity - this.velocity) > 0.0001) {
      requestAnimationFrame(this.draw.bind(this));
    }

    this.velocity = newVelocity;
    this.position = newPosition;
    this.callback(this.position);
  }
}

const useSpring = element => {
  const spring = React.useRef(new Spring(0));

  React.useEffect(() => {
    spring.current.onUpdate(val => {
      if (element) element.style.transform = `translateX(${val}px)`;
    });
  }, [element]);

  const start = React.useCallback(() => spring.current.start(), []);
  return [start];
};

const SpringDemo = () => {
  const [el, setEl] = React.useState();
  const [start] = useSpring(el);

  return (
    <div>
      <div ref={setEl} className="box"></div>
      <button onClick={start}>Start</button>
    </div>
  );
};

Spring.propTypes = {};

export default SpringDemo;
