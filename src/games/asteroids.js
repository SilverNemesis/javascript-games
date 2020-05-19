import thrust from '../sounds/thrust.wav'
import fire from '../sounds/fire.wav'
import beat1 from '../sounds/beat1.wav'
import beat2 from '../sounds/beat2.wav'
import bangLarge from '../sounds/bangLarge.wav'
import bangMedium from '../sounds/bangMedium.wav'
import bangSmall from '../sounds/bangSmall.wav'
import { collide, boundingCircle, boundingRectangle } from '../lib/collision';

let state;

const GAME_STATE_WAITING = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_PAUSED = 2;
const GAME_STATE_GAMEOVER = 3;

let applicationState = {};

const screen = {
  width: 1440,
  height: 1080
};

const maxSpeed = 6;

const fireRate = 200;
const maxBullets = 4;

const bigAsteroid = 80;
const mediumAsteroid = 40;
const smallAsteroid = 20;

const sounds = {
  thrust: loadSound(thrust, 10),
  fire: loadSound(fire, 10),
  beat1: loadSound(beat1, 1),
  beat2: loadSound(beat2, 1),
  bangLarge: loadSound(bangLarge, 10),
  bangMedium: loadSound(bangMedium, 10),
  bangSmall: loadSound(bangSmall, 10),
};

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
  thrust: 'KeyW',
  fire: 'Space'
};

export default function initialize(props) {
  applicationState = props;
  const { width, height } = applicationState;
  state = {
    player: new Player(),
    ambientSound: new AmbientSound([sounds.beat1, sounds.beat2], 800, (count, delay) => {
      if (delay > 200) {
        return delay -= 10;
      }
      return delay;
    }),
    keyState: {}
  }
  reset();
  adjustScale(width, height);
  setTimeout(state.ambientSound.start, 100);
  return {
    name: 'asteroids',
    resize,
    update,
    render,
    handleKeyDown,
    handleKeyUp,
    handlePause,
    handleExit
  }
}

function reset() {
  state.player.reset();
  state.score = 0;
  state.bullets = [];
  state.asteroids = [];
  state.level = 0;
  state.gameState = GAME_STATE_WAITING;
  state.waitTime = 0;
  state.keyState = {};
  generateAsteroids();
  setTimeout(state.ambientSound.start, 100);
}

function handleExit() {
  state.ambientSound.stop();
}

function generateAsteroids() {
  for (let i = 0; i < 4 + state.level * 2; i++) {
    state.asteroids.push(new Asteroid(getRandomNumber(0, screen.width), getRandomNumber(0, screen.height), getRandomNumber(0, 360), bigAsteroid, getRandomNumber(1, 2)));
  }
}

function resize() {
  const { width, height } = applicationState;
  adjustScale(width, height);
}

function update() {
  if (state.gameState === GAME_STATE_PAUSED) {
    state.gameState = GAME_STATE_PLAYING;
  }

  if (state.gameState === GAME_STATE_PLAYING) {
    state.player.update();
  } else if (state.gameState === GAME_STATE_WAITING) {
    if (state.keyState[keyMap.left] || state.keyState[keyMap.right] || state.keyState[keyMap.thrust] || state.keyState[keyMap.fire]) {
      state.gameState = GAME_STATE_PLAYING;
    }
  } else if (state.gameState === GAME_STATE_GAMEOVER) {
    state.waitTime -= applicationState.deltaTime;
    if (state.waitTime < 0) {
      reset();
    }
  }

  state.bullets = state.bullets.filter(x => x.active);

  if (state.bullets.length > maxBullets) {
    state.bullets.splice(0, state.bullets.length - maxBullets);
  }

  for (let i = 0; i < state.bullets.length; i++) {
    state.bullets[i].update();
  }

  state.asteroids = state.asteroids.filter(x => x.active);

  for (let i = 0; i < state.asteroids.length; i++) {
    state.asteroids[i].update();
  }

  const playerBounds = state.player.getCollisionBounds();

  let playerHit = false;

  for (let i = 0; i < state.asteroids.length; i++) {
    const asteroid = state.asteroids[i];
    let asteroidHit = false;
    const bounds = asteroid.getCollisionBounds();
    for (let k = 0; k < bounds.length; k++) {
      for (let j = 0; j < state.bullets.length; j++) {
        if (collide(bounds[k], state.bullets[j].getCollisionBounds())) {
          state.bullets[j].active = false;
          asteroidHit = true;
        }
      }
    }

    if (!asteroidHit && state.gameState === GAME_STATE_PLAYING) {
      for (let k = 0; k < bounds.length; k++) {
        for (let j = 0; j < playerBounds.length; j++) {
          if (collide(bounds[k], playerBounds[j])) {
            playerHit = true;
            asteroidHit = true;
          }
        }
      }
    }

    if (asteroidHit) {
      asteroid.active = false;
      if (asteroid.radius === bigAsteroid) {
        state.score += 20;
        playSound(sounds.bangLarge);
        state.asteroids.push(new Asteroid(asteroid.x - 15, asteroid.y - 15, getRandomNumber(0, 360), mediumAsteroid, getRandomNumber(1, 2)));
        state.asteroids.push(new Asteroid(asteroid.x + 15, asteroid.y + 15, getRandomNumber(0, 360), mediumAsteroid, getRandomNumber(1, 2)));
      } else if (asteroid.radius === mediumAsteroid) {
        state.score += 50;
        playSound(sounds.bangMedium);
        state.asteroids.push(new Asteroid(asteroid.x - 5, asteroid.y - 5, getRandomNumber(0, 360), smallAsteroid, getRandomNumber(1, 2)));
        state.asteroids.push(new Asteroid(asteroid.x + 5, asteroid.y + 5, getRandomNumber(0, 360), smallAsteroid, getRandomNumber(1, 2)));
      } else {
        state.score += 100;
        playSound(sounds.bangSmall);
      }
    }
  }

  if (playerHit) {
    stopSoundLoop(sounds.thrust);
    state.ambientSound.stop();
    state.gameState = GAME_STATE_GAMEOVER;
    state.waitTime = 10000;
  }

  if (state.asteroids.length === 0) {
    state.ambientSound.stop();
    state.level++;
    generateAsteroids();
    setTimeout(state.ambientSound.start, 1100);
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

  if (state.gameState === GAME_STATE_PLAYING || state.gameState === GAME_STATE_PAUSED) {
    state.player.render();
  }

  for (let i = 0; i < state.bullets.length; i++) {
    state.bullets[i].render();
  }

  for (let i = 0; i < state.asteroids.length; i++) {
    state.asteroids[i].render();
  }

  {
    ctx.font = '100 ' + (screen.scale * 42).toFixed(0) + 'px Hyperspace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'end';
    ctx.textBaseline = 'bottom';
    const x = screen.x + screen.width * screen.scale / 5;
    const y = screen.y + screen.width * screen.scale / 12;
    ctx.fillText(state.score.toFixed(0).padStart(7), x, y);
  }

  {
    ctx.font = '100 ' + (screen.scale * 24).toFixed(0) + 'px Hyperspace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    const x = screen.x + screen.width * screen.scale / 2;
    const y = screen.y + screen.width * screen.scale / 12;
    ctx.fillText(state.level.toFixed(0).padStart(2, '0'), x, y);
  }

  if (state.gameState === GAME_STATE_WAITING) {
    ctx.font = '100 ' + (screen.scale * 30).toFixed(0) + 'px Hyperspace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const x = screen.x + screen.width * screen.scale / 2;
    const y = screen.y + screen.height * screen.scale / 2;
    ctx.fillText('PRESS ANY CONTROL TO BEGIN', x, y);
  } else if (state.gameState === GAME_STATE_GAMEOVER) {
    ctx.font = '100 ' + (screen.scale * 100).toFixed(0) + 'px Hyperspace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const x = screen.x + screen.width * screen.scale / 2;
    const y = screen.y + screen.height * screen.scale / 2;
    ctx.fillText('GAME OVER', x, y);
  }

  ctx.restore();
}

function renderWrap(ctx, x, y, radius, render, props) {
  const locations = getLocations(x, y, radius);

  for (let j = 0; j < locations.y.length; j++) {
    for (let i = 0; i < locations.x.length; i++) {
      render(ctx, x + locations.x[i], y + locations.y[j], props);
    }
  }
}

function getLocations(x, y, radius) {
  const xos = [0];

  if (x < radius) {
    xos.push(screen.width);
  }

  if (x > screen.width - radius) {
    xos.push(-screen.width);
  }

  const yos = [0];

  if (y < radius) {
    yos.push(screen.height);
  }

  if (y > screen.height - radius) {
    yos.push(-screen.height);
  }

  return {
    x: xos,
    y: yos
  };
}

function handleKeyDown(event) {
  state.keyState[event.code] = true;
}

function handleKeyUp(event) {
  state.keyState[event.code] = false;
}

function handlePause(isPaused) {
  if (state.gameState === GAME_STATE_PLAYING) {
    if (isPaused) {
      state.gameState = GAME_STATE_PAUSED;
    }
  } else if (state.gameState === GAME_STATE_PAUSED) {
    if (!isPaused) {
      state.gameState = GAME_STATE_PLAYING;
    }
  }
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

function loadSound(name, count) {
  const samples = [];
  for (let i = 0; i < count; i++) {
    samples.push(new Audio(name));
  }
  return {
    index: 0,
    samples
  }
}

function playSound(sound) {
  sound.samples[sound.index].play();
  sound.index = (sound.index + 1) % sound.samples.length;
}

function startSoundLoop(sound, delay) {
  if (!sound.timeout) {
    sound.delay = delay;
    sound.continueSoundLoop = continueSoundLoop.bind(sound);
    sound.continueSoundLoop();
  }
}

function continueSoundLoop() {
  playSound(this);
  this.timeout = setTimeout(this.continueSoundLoop, this.delay);
}

function stopSoundLoop(sound) {
  if (sound.timeout) {
    clearInterval(sound.timeout);
    sound.timeout = undefined;
  }
}

class AmbientSound {
  constructor(sounds, maxDelay, updateDelay) {
    this.sounds = sounds;
    this.maxDelay = maxDelay;
    this.updateDelay = updateDelay;
    this.isPlaying = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.playNextSound = this.playNextSound.bind(this);
  }

  start() {
    this.isPlaying = true;
    this.count = 0;
    this.index = 0;
    this.delay = this.maxDelay;
    this.playNextSound();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timeout);
  }

  playNextSound() {
    if (!this.isPlaying) {
      return;
    }
    const { delay, index } = this;
    if (state.gameState === GAME_STATE_PLAYING) {
      this.count++;
      this.delay = this.updateDelay(this.count, this.delay);
      if (this.delay !== delay) {
        this.count = 0;
      }
      this.index = (this.index + 1) % this.sounds.length;
      playSound(this.sounds[index])
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.playNextSound, delay);
  }
}

class Player {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = screen.width / 2;
    this.y = screen.height / 2;
    this.dx = 0;
    this.dy = 0;
    this.rotation = 0;
    this.fireDelay = 0;
    this.thrusting = false;
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
      playSound(sounds.fire);
      state.bullets.push(new Bullet(this.x + dx * 7.0, this.y + dy * 7.0, dx * 12.0, dy * 12.0));
      this.fireDelay = fireRate;
    }

    const accelerationVector = {
      x: delta * 0.2 * dx,
      y: delta * 0.2 * dy
    }

    if (state.keyState[keyMap.thrust]) {
      this.thrusting = true;
      startSoundLoop(sounds.thrust, 275);
      this.dx += accelerationVector.x;
      this.dy += accelerationVector.y;
    } else {
      stopSoundLoop(sounds.thrust);
      this.thrusting = false;
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
    renderWrap(applicationState.ctx, this.x, this.y, 15, this._render, { rotation: this.rotation, thrusting: this.thrusting });
  }

  getCollisionBounds() {
    const x = this.x - 10;
    const y = this.y - 15;
    const locations = getLocations(this.x, this.y, this.radius);
    const bounds = [];
    for (let j = 0; j < locations.y.length; j++) {
      for (let i = 0; i < locations.x.length; i++) {
        bounds.push(boundingRectangle(x, y, x + 20, y + 30));
      }
    }
    return bounds;
  }

  _render(ctx, x, y, props) {
    const { rotation, thrusting } = props;

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
    if (thrusting) {
      ctx.moveTo(0, 17)
      ctx.lineTo(5, 20)
      ctx.lineTo(-5, 20)
      ctx.closePath()
      ctx.stroke()
    }
    ctx.restore()
  }
}

class Asteroid {
  constructor(x, y, dir, radius, speed) {
    this.x = x;
    this.y = y;
    this.dx = Math.cos((dir - 90) * (Math.PI / 180));
    this.dy = Math.sin((dir - 90) * (Math.PI / 180));
    this.radius = radius;
    this.speed = speed;
    this.points = [];
    for (let i = 0; i < 10; i++) {
      const offset = getRandomNumber(0, radius / 3) - radius / 6;
      this.points.push(angleToPoint(i * 36, radius + offset));
    }
    this.active = true;
  }

  update() {
    const delta = applicationState.deltaTime / 16;

    const { width, height } = screen;

    this.x += delta * this.speed * this.dx
    this.y += delta * this.speed * this.dy

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
    renderWrap(applicationState.ctx, this.x, this.y, this.radius, this._render, { points: this.points, radius: this.radius });
  }

  getCollisionBounds() {
    const locations = getLocations(this.x, this.y, this.radius);
    const bounds = [];
    for (let j = 0; j < locations.y.length; j++) {
      for (let i = 0; i < locations.x.length; i++) {
        bounds.push(boundingCircle(this.x + locations.x[i], this.y + locations.y[j], this.radius));
      }
    }
    return bounds;
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
    this.time = 0;
    this.active = true;
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

    this.time += applicationState.deltaTime;

    if (this.time >= 4000) {
      this.active = false;
    }
  }

  render() {
    renderWrap(applicationState.ctx, this.x, this.y, 1, this._render);
  }

  getCollisionBounds() {
    return boundingCircle(this.x, this.y, 1);
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
