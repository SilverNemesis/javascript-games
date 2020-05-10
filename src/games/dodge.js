import { collide, boundingRectangle, boundingCircle } from '../lib/collision';

let state = {}

const screen = {
  x: 320,
  y: 180
};

function adjustScale(width, height) {
  state.width = width;
  state.height = height;
  state.scale = Math.min(width / screen.x, height / screen.y);
  state.offsetX = (width - screen.x * state.scale) / 2;
  state.offsetY = (height - screen.y * state.scale) / 2;
}

export default function initialize({ width, height }) {
  state = {
    paused: false,
    frameCount: 0,
    obstacles: [],
    player: new PlayerComponent(15, 75, 15, 'red'),
    score: new TextComponent(screen.x, 0, 'white', 'Consolas', 15),
    keyState: {}
  };
  adjustScale(width, height);
  return {
    name: 'dodge',
    resize,
    update,
    render,
    handleKeyDown,
    handleKeyUp
  };
}

function resize({ width, height }) {
  adjustScale(width, height);
}

function update() {
  const { player, obstacles, score, keyState } = state;

  if (!state.paused) {
    state.frameCount++;

    if ((state.frameCount % 150) === 1) {
      const h = getRandomNumber(20, 100);
      const gap = getRandomNumber(50, 100);
      const w = Math.floor(state.width / state.scale);
      obstacles.push(new ObstacleComponent(w, 0, 10, h, 'green'));
      obstacles.push(new ObstacleComponent(w, h + gap, 10, screen.y - h - gap, 'green'));
    }

    player.update(keyState);

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].update();
    }

    state.obstacles = obstacles.filter(x => x.onScreen);

    score.text = 'SCORE: ' + state.frameCount;

    const rect = player.getCollisionBounds();

    for (let i = 0; i < obstacles.length; i += 1) {
      if (collide(rect, obstacles[i].getCollisionBounds())) {
        state.paused = true;
      }
    }
  }
}

function render({ ctx }) {
  const { width, height, player, obstacles, score } = state;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#111';
  ctx.fillRect(state.offsetX, state.offsetY, screen.x * state.scale, screen.y * state.scale);

  ctx.save();
  ctx.rect(state.offsetX, state.offsetY, screen.x * state.scale, screen.y * state.scale);
  ctx.clip();

  player.render(ctx);

  for (let i = 0; i < obstacles.length; i += 1) {
    obstacles[i].render(ctx);
  }

  score.render(ctx);

  ctx.restore();
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

class TextComponent {
  constructor(x, y, color, fontName, fontSize, text) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.fontName = fontName;
    this.fontSize = fontSize;
    this.text = text;
  }

  render(ctx) {
    ctx.font = (this.fontSize * state.scale).toFixed(0) + 'px ' + this.fontName;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    let { x, y } = this;
    x = x * state.scale + state.offsetX;
    y = y * state.scale + state.offsetY;
    ctx.fillText(this.text, x, y);
  }
}

class PlayerComponent {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
  }

  update(keyState) {
    this.speedX = 0;
    this.speedY = 0;

    if (keyState['KeyW'] || keyState['ArrowUp']) {
      this.speedY -= 1;
    }

    if (keyState['KeyS'] || keyState['ArrowDown']) {
      this.speedY += 1;
    }

    if (keyState['KeyA'] || keyState['ArrowLeft']) {
      this.speedX -= 1;
    }

    if (keyState['KeyD'] || keyState['ArrowRight']) {
      this.speedX += 1;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < this.radius) {
      this.x = this.radius;
    } else if (this.x + this.radius > screen.x) {
      this.x = screen.x - this.radius;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
    } else if (this.y + this.radius > screen.y) {
      this.y = screen.y - this.radius;
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    let { x, y, radius } = this;
    x = x * state.scale + state.offsetX;
    y = y * state.scale + state.offsetY;
    radius *= state.scale;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
  }

  getCollisionBounds() {
    return boundingCircle(this.x, this.y, this.radius);
  }
}

class ObstacleComponent {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.onScreen = true;
  }

  update() {
    this.x--;
    if (this.x + this.width <= 0) {
      this.onScreen = false;
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    let { x, y, width, height } = this;
    x = x * state.scale + state.offsetX;
    y = y * state.scale + state.offsetY;
    width *= state.scale;
    height *= state.scale;
    ctx.fillRect(x, y, width, height);
  }

  getCollisionBounds() {
    return boundingRectangle(this.x, this.y, this.x + this.width, this.y + this.height);
  }
}
