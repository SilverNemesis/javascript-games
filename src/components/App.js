import React from 'react';
import Message from './Message';
import dodge from '../games/dodge';
import noise from '../games/noise';

const games = [dodge, noise];

let gameIndex = 0;

let gameState = {};

const state = {
  totalFrameTime: 0,
  frameCount: 0,
  paused: true
};

const sharedState = {
  ctx: null,
  deltaTime: 0,
  width: 0,
  height: 0
};

function App() {
  const canvasRef = React.useRef(null);
  const requestRef = React.useRef(null);
  const previousTimeRef = React.useRef(0);

  const [message, setMessage] = React.useState();

  const onClickMessage = (event) => {
    event.preventDefault();
    if (state.messageTimer) {
      cancelMessage();
    }
  };

  const showMessage = (message) => {
    setMessage(message);
    state.messageTimer = setTimeout(clearMessage, 10000);
  }

  const clearMessage = () => {
    setMessage();
    state.messageTimer = undefined;
  }

  const cancelMessage = () => {
    clearTimeout(state.messageTimer);
    clearMessage();
  }

  sharedState.showMessage = showMessage;

  const handleKeyDown = (event) => {
    if (event.code === 'PageDown') {
      event.preventDefault();
      nextScene();
    } else if (event.code === 'PageUp') {
      event.preventDefault();
      previousScene();
    } else if (event.code === 'Escape') {
      event.preventDefault();
      state.paused = !state.paused;
    }
    else {
      if (gameState.handleKeyDown) {
        gameState.handleKeyDown(event);
      }
    }
  };

  const handleKeyUp = (event) => {
    if (gameState.handleKeyUp) {
      gameState.handleKeyUp(event);
    }
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect()
    sharedState.ctx = canvas.getContext('2d');
    sharedState.width = rect.width * window.devicePixelRatio;
    sharedState.height = rect.height * window.devicePixelRatio;

    gameState = games[gameIndex](sharedState);

    const animate = currentTime => {
      if (previousTimeRef.current !== undefined) {
        sharedState.deltaTime = currentTime - previousTimeRef.current;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;

        if (canvas.width !== sharedState.width || canvas.height !== sharedState.height) {
          state.totalFrameTime = 0;
          state.frameCount = 0;
          sharedState.width = canvas.width;
          sharedState.height = canvas.height;

          if (gameState.resize) {
            gameState.resize();
          }
        }

        const t0 = performance.now();

        if (gameState.update && !state.paused) {
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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    }
  }, [canvasRef]);

  return (
    <div className="screen">
      <canvas id="canvas" ref={canvasRef}></canvas>
      <Message message={message} onClick={onClickMessage} />
    </div>
  );
}

function drawFrameTime() {
  const { totalFrameTime, frameCount } = state;
  const { ctx, width } = sharedState;
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

function previousScene() {
  gameIndex = (gameIndex + games.length - 1) % games.length;
  gameState = games[gameIndex](sharedState);
  state.totalFrameTime = 0;
  state.frameCount = 0;
}

function nextScene() {
  gameIndex = (gameIndex + 1) % games.length;
  gameState = games[gameIndex](sharedState);
  state.totalFrameTime = 0;
  state.frameCount = 0;
}

export default App;
