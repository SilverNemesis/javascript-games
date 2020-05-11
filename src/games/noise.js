let state = {}

let applicationState = {};

export default function initialize(props) {
  applicationState = props;
  const { ctx, width, height } = applicationState;
  state = {
    size: 1,
    width,
    height,
    image: ctx.createImageData(width, height)
  };
  return {
    name: 'noise',
    resize,
    render,
    handleKeyDown
  };
}

function resize() {
  const { ctx, width, height } = applicationState;
  state.width = width;
  state.height = height;
  state.image = ctx.createImageData(width, height);
}

function render() {
  const { ctx } = applicationState;
  const { size, width, height } = state;
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

  ctx.putImageData(state.image, 0, 0);
}

function handleKeyDown(event) {
  if (event.code === 'ArrowDown') {
    if (state.size > 1) {
      state.size--;
    }
  } else if (event.code === 'ArrowUp') {
    if (state.size < 100) {
      state.size++;
    }
  }
}