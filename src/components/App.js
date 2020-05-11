import React from 'react';
import dodge from '../games/dodge';
import noise from '../games/noise';

const games = [dodge, noise];

let gameIndex = 0;

let gameState = {};

const state = {
  totalFrameTime: 0,
  frameCount: 0,
  ctx: null,
  deltaTime: 0,
  width: 0,
  height: 0
};

function App() {
  const canvasRef = React.useRef(null);
  const requestRef = React.useRef(null);
  const previousTimeRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect()
    state.ctx = canvas.getContext('2d');
    state.width = rect.width * window.devicePixelRatio;
    state.height = rect.height * window.devicePixelRatio;

    gameState = games[gameIndex](state);

    const animate = currentTime => {
      if (previousTimeRef.current !== undefined) {
        state.deltaTime = currentTime - previousTimeRef.current;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;

        if (canvas.width !== state.width || canvas.height !== state.height) {
          state.totalFrameTime = 0;
          state.frameCount = 0;
          state.width = canvas.width;
          state.height = canvas.height;

          if (gameState.resize) {
            gameState.resize();
          }
        }

        const t0 = performance.now();

        if (gameState.update) {
          gameState.update();
        }

        if (gameState.render) {
          gameState.render();
        }

        const t1 = performance.now();

        state.totalFrameTime += t1 - t0;
        state.frameCount++;

        drawFrameTime();
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
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
}

function handleClick(event) {
  if (gameState.handleClick) {
    gameState.handleClick(event);
  }
}

function handleKeyDown(event) {
  if (event.keyCode === 9) {
    event.preventDefault();
    gameIndex = (gameIndex + 1) % games.length;
    gameState = games[gameIndex](state);
    state.totalFrameTime = 0;
    state.frameCount = 0;
  }
  else {
    if (gameState.handleKeyDown) {
      gameState.handleKeyDown(event);
    }
  }
}

function handleKeyUp(event) {
  if (gameState.handleKeyUp) {
    gameState.handleKeyUp(event);
  }
}

function drawFrameTime() {
  const { ctx, width, totalFrameTime, frameCount } = state;
  const text = gameState.name + ' (' + (totalFrameTime / frameCount).toFixed(2) + ' ms)';
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
