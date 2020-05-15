let state;

let applicationState = {};

const screen = {
  width: 1440,
  height: 1080
};

const maxSpeed = 6;

const fireRate = 150;

function adjustScale(width, height) {
  state.width = width;
  state.height = height;
  screen.scale = Math.min(width / screen.width, height / screen.height);
  screen.x = (width - screen.width * screen.scale) / 2;
  screen.y = (height - screen.height * screen.scale) / 2;
}

const keyMap = {
  left: 'KeyA',
  right: 'KeyD',
  up: 'KeyW',
  down: 'KeyS',
  fire: 'Space'
};

export default function initialize(props) {
  applicationState = props;
  const { width, height } = applicationState;
  state = {
    player: new Player(),
    bullets: [],
    asteroids: [],
    keyState: {}
  }
  for (let i = 0; i < 4; i++) {
    state.asteroids.push(new Asteroid(getRandomNumber(0, screen.width), getRandomNumber(0, screen.height), getRandomNumber(0, 360), 150));
  }
  adjustScale(width, height);
  return {
    name: 'asteroids',
    resize,
    update,
    render,
    handleKeyDown,
    handleKeyUp
  }
}

function resize() {
  const { width, height } = applicationState;
  adjustScale(width, height);
}

function update() {
  state.player.update();
  state.bullets = state.bullets.filter(x => x.frameCount < 75);
  for (let i = 0; i < state.bullets.length; i++) {
    state.bullets[i].update();
  }
  for (let i = 0; i < state.asteroids.length; i++) {
    state.asteroids[i].update();
  }
}

function render() {
  const { ctx, width, height } = applicationState;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#111';
  ctx.fillRect(screen.x, screen.y, screen.width * screen.scale, screen.height * screen.scale);

  ctx.save();
  ctx.rect(screen.x, screen.y, screen.width * screen.scale, screen.height * screen.scale);
  ctx.clip();

  state.player.render();

  for (let i = 0; i < state.bullets.length; i++) {
    state.bullets[i].render();
  }

  for (let i = 0; i < state.asteroids.length; i++) {
    state.asteroids[i].render();
  }

  ctx.restore();
}

function renderWrap(ctx, x, y, size, render, props) {
  const xos = [0];
  if (x < size) {
    xos.push(screen.width);
  }
  if (x > screen.width - size) {
    xos.push(-screen.width);
  }
  const yos = [0];
  if (y < size) {
    yos.push(screen.height);
  }
  if (y > screen.height - size) {
    yos.push(-screen.height);
  }
  for (let yo = 0; yo < yos.length; yo++) {
    for (let xo = 0; xo < xos.length; xo++) {
      render(ctx, x + xos[xo], y + yos[yo], props);
    }
  }
}

function handleKeyDown(event) {
  state.keyState[event.code] = true;
}

function handleKeyUp(event) {
  state.keyState[event.code] = false;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function angleToPoint(angle, radius) {
  return {
    x: Math.cos((angle - 90) * (Math.PI / 180)) * radius,
    y: Math.sin((angle - 90) * (Math.PI / 180)) * radius
  }
}

class Player {
  constructor() {
    this.x = screen.width / 2;
    this.y = screen.height / 2;
    this.dx = 0;
    this.dy = 0;
    this.rotation = 0;
    this.fireDelay = 0;
  }

  update() {
    this.fireDelay -= applicationState.deltaTime;

    if (this.fireDelay < 0) {
      this.fireDelay = 0;
    }

    const delta = applicationState.deltaTime / 16;

    if (state.keyState[keyMap.left]) {
      this.rotation -= delta * 5;
    } else if (state.keyState[keyMap.right]) {
      this.rotation += delta * 5;
    }

    const dx = Math.cos((this.rotation - 90) * (Math.PI / 180));
    const dy = Math.sin((this.rotation - 90) * (Math.PI / 180));

    if (state.keyState[keyMap.fire] && this.fireDelay === 0) {
      state.bullets.push(new Bullet(this.x + dx * 7.0, this.y + dy * 7.0, dx * 12.0, dy * 12.0));
      this.fireDelay = fireRate;
    }

    const accelerationVector = {
      x: delta * 0.2 * dx,
      y: delta * 0.2 * dy
    }

    if (state.keyState[keyMap.up]) {
      this.dx += accelerationVector.x;
      this.dy += accelerationVector.y;
    } else if (state.keyState[keyMap.down]) {
      this.dx -= accelerationVector.x;
      this.dy -= accelerationVector.y;
    } else {
      if (this.dx <= -0.01) {
        this.dx += 0.01;
      } else if (this.dx >= 0.01) {
        this.dx -= 0.01;
      }
      if (this.dy <= -0.01) {
        this.dy += 0.01;
      } else if (this.dy >= 0.01) {
        this.dy -= 0.01;
      }
    }

    if (this.dx > maxSpeed) {
      this.dx = maxSpeed;
    } else if (this.dx < -maxSpeed) {
      this.dx = -maxSpeed;
    }

    if (this.dy > maxSpeed) {
      this.dy = maxSpeed;
    } else if (this.dy < -maxSpeed) {
      this.dy = -maxSpeed;
    }

    const { width, height } = screen;

    this.x += this.dx;
    this.y += this.dy;

    if (this.x > width) {
      this.x -= width;
    } else if (this.x < 0) {
      this.x += width;
    }

    if (this.y > height) {
      this.y -= height;
    } else if (this.y < 0) {
      this.y += height;
    }
  }

  render() {
    renderWrap(applicationState.ctx, this.x, this.y, 20, this._render, { rotation: this.rotation });
  }

  _render(ctx, x, y, props) {
    const { rotation } = props;

    ctx.save()
    ctx.translate(screen.x + x * screen.scale, screen.y + y * screen.scale)
    ctx.rotate((Math.PI / 180) * rotation)
    ctx.scale(screen.scale, screen.scale);
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, 7)
    ctx.lineTo(10, 15)
    ctx.lineTo(0, -15)
    ctx.lineTo(-10, 15)
    ctx.lineTo(0, 7)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}

class Asteroid {
  constructor(x, y, dir, size) {
    this.x = x;
    this.y = y;
    this.dx = Math.cos((dir - 90) * (Math.PI / 180));
    this.dy = Math.sin((dir - 90) * (Math.PI / 180));
    this.size = size;
    this.points = [];
    for (let i = 0; i < 10; i++) {
      const offset = getRandomNumber(0, size / 6) - size / 3;
      this.points.push(angleToPoint(i * 36, (size / 2) + offset));
    }
  }

  update() {
    const delta = applicationState.deltaTime / 16;

    const { width, height } = screen;

    this.x += delta * this.dx
    this.y += delta * this.dy

    if (this.x > width) {
      this.x -= width
    } else if (this.x < 0) {
      this.x += width
    }

    if (this.y > height) {
      this.y -= height
    } else if (this.y < 0) {
      this.y += height
    }
  }

  render() {
    renderWrap(applicationState.ctx, this.x, this.y, this.size, this._render, { points: this.points });
  }

  _render(ctx, x, y, props) {
    ctx.save()
    ctx.translate(screen.x + x * screen.scale, screen.y + y * screen.scale)
    ctx.scale(screen.scale, screen.scale);
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(props.points[0].x, props.points[0].y)
    for (let i = 1; i < props.points.length; i++) {
      ctx.lineTo(props.points[i].x, props.points[i].y)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}

class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.frameCount = 0;
  }

  update() {
    const delta = applicationState.deltaTime / 16;

    const { width, height } = screen;

    this.x += delta * this.dx
    this.y += delta * this.dy

    if (this.x > width) {
      this.x -= width
    } else if (this.x < 0) {
      this.x += width
    }

    if (this.y > height) {
      this.y -= height
    } else if (this.y < 0) {
      this.y += height
    }

    this.frameCount++;
  }

  render() {
    renderWrap(applicationState.ctx, this.x, this.y, 1, this._render);
  }

  _render(ctx, x, y) {
    ctx.save()
    ctx.translate(screen.x + x * screen.scale, screen.y + y * screen.scale)
    ctx.scale(screen.scale, screen.scale);
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore()
  }
}
