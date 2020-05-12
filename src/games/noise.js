let state = {}

let applicationState = {};

export default function initialize(props) {
  applicationState = props;
  const { ctx, width, height } = applicationState;
  state = {
    size: 1,
    width,
    height,
    image: ctx.createImageData(width, height),
    keyState: {}
  };
  return {
    name: 'noise',
    resize,
    update,
    render,
    handleKeyDown,
    handleKeyUp
  };
}

function resize() {
  const { ctx, width, height } = applicationState;
  state.width = width;
  state.height = height;
  state.image = ctx.createImageData(width, height);
}

function update() {
  const { size, width, height, keyState } = state;

  if (keyState['ArrowDown']) {
    if (state.size > 1) {
      state.size--;
    }
  }

  if (keyState['ArrowUp']) {
    if (state.size < 100) {
      state.size++;
    }
  }

  const buffer = state.image.data;

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      const color = Math.floor(Math.random() * 256);
      for (let dy = y; dy < Math.min(y + size, height); dy++) {
        for (let dx = x; dx < Math.min(x + size, width); dx++) {
          const pos = (dy * width + dx) * 4;
          buffer[pos] = color;
          buffer[pos + 1] = color;
          buffer[pos + 2] = color;
          buffer[pos + 3] = 255;
        }
      }
    }
  }
}

function render() {
  const { ctx } = applicationState;
  ctx.putImageData(state.image, 0, 0);
}

function handleKeyDown(event) {
  state.keyState[event.code] = true;
}

function handleKeyUp(event) {
  state.keyState[event.code] = false;
}