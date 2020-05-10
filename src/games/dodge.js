import { collideRectangles } from '../lib/collision';

let state = {}

export default function initialize({ width, height }) {
  state = {
    width,
    height,
    scaleX: Math.floor(width / 320),
    scaleY: Math.floor(height / 180),
    paused: false,
    frameCount: 0,
    obstacles: [],
    player: new PlayerComponent(10, 75, 30, 30, 'red'),
    score: new TextComponent(220, 25, 'white', 'Consolas', 15),
    keyState: {}
  };
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
  state.width = width;
  state.height = height;
  state.scaleX = Math.floor(width / 320);
  state.scaleY = Math.floor(height / 180);
}

function update() {
  const { player, obstacles, score, keyState } = state;

  if (!state.paused) {
    state.frameCount++;

    if ((state.frameCount % 150) === 1) {
      const h = getRandomNumber(20, 100);
      const gap = getRandomNumber(50, 100);
      const w = Math.floor(state.width / state.scaleX);
      obstacles.push(new ObstacleComponent(w, 0, 10, h, 'green'));
      obstacles.push(new ObstacleComponent(w, h + gap, 10, w - h - gap, 'green'));
    }

    player.update(keyState);

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].update();
    }

    score.text = 'SCORE: ' + state.frameCount;

    const rect = player.getRectangle();

    for (let i = 0; i < obstacles.length; i += 1) {
      if (collideRectangles(rect, obstacles[i].getRectangle())) {
        state.paused = true;
      }
    }
  }
}

function render({ ctx }) {
  const { width, height, player, obstacles, score } = state;

  ctx.clearRect(0, 0, width, height);

  player.render(ctx);

  for (let i = 0; i < obstacles.length; i += 1) {
    obstacles[i].render(ctx);
  }

  score.render(ctx);
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
    ctx.font = (this.fontSize * Math.min(state.scaleX, state.scaleY)).toFixed(0) + 'px ' + this.fontName;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x * state.scaleX, this.y * state.scaleY);
  }
}

class PlayerComponent {
  constructor(x, y, width, height, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
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
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * state.scaleX, this.y * state.scaleY, this.width * state.scaleX, this.height * state.scaleY);
  }

  getRectangle() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.width,
      y2: this.y + this.height
    };
  }
}

class ObstacleComponent {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  update() {
    this.x--;
    if (this.x + this.width <= 0) {
      return false;
    }
    return true;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * state.scaleX, this.y * state.scaleY, this.width * state.scaleX, this.height * state.scaleY);
  }

  getRectangle() {
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.width,
      y2: this.y + this.height
    };
  }
}
