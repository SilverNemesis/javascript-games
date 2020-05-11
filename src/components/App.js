import React from 'react';
import dodge from '../games/dodge';
import noise from '../games/noise';

const games = [dodge, noise];

let gameIndex = 0;

let state = {};

const props = {
  totalFrameTime: 0,
  frameCount: 0,
  ctx: null,
  deltaTime: 0,
  width: 0,
  height: 0,
  image: null
};

function App() {
  const canvasRef = React.useRef(null);
  const requestRef = React.useRef(null);
  const previousTimeRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect()
    props.ctx = canvas.getContext('2d');
    props.width = rect.width * window.devicePixelRatio;
    props.height = rect.height * window.devicePixelRatio;

    state = games[gameIndex](props);

    const animate = currentTime => {
      if (previousTimeRef.current !== undefined) {
        props.deltaTime = currentTime - previousTimeRef.current;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;

        if (canvas.width !== props.width || canvas.height !== props.height) {
          props.totalFrameTime = 0;
          props.frameCount = 0;
          props.width = canvas.width;
          props.height = canvas.height;

          if (state.resize) {
            state.resize(props);
          }
        }

        const t0 = performance.now();

        if (state.update) {
          state.update(props);
        }

        if (state.render) {
          state.render(props);
        }

        const t1 = performance.now();
        props.totalFrameTime += t1 - t0;
        props.frameCount++;

        drawFrameTime(props);
      }

      previousTimeRef.current = currentTime;
      requestRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    }
  }, [canvasRef]);

  return (
    <div className="screen">
      <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
  );
}

function handleClick(event) {
  if (state.handleClick) {
    state.handleClick(event);
  }
}

function handleKeyDown(event) {
  if (event.keyCode === 9) {
    event.preventDefault();
    gameIndex = (gameIndex + 1) % games.length;
    state = games[gameIndex](props);
    props.totalFrameTime = 0;
    props.frameCount = 0;
  }
  else {
    if (state.handleKeyDown) {
      state.handleKeyDown(event);
    }
  }
}

function handleKeyUp(event) {
  if (state.handleKeyUp) {
    state.handleKeyUp(event);
  }
}

function drawFrameTime({ ctx, width, totalFrameTime, frameCount }) {
  const text = state.name + ' (' + (totalFrameTime / frameCount).toFixed(2) + ' ms)';
  ctx.fillStyle = 'white';
  ctx.font = '20px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowColor = 'rgba(0.2,0.2,0.2,1.0)';
  ctx.shadowBlur = 4;
  ctx.fillText(text, width / 2, 0);
}

export default App;
