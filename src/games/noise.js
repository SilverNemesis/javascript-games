let state = {}

export default function initialize({ ctx, width, height }) {
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

function resize({ ctx, width, height }) {
  state.width = width;
  state.height = height;
  state.image = ctx.createImageData(width, height);
}

function render({ ctx }) {
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
  if (event.keyCode === 40) {
    if (state.size > 1) {
      state.size--;
    }
  } else if (event.keyCode === 38) {
    if (state.size < 100) {
      state.size++;
    }
  }
}