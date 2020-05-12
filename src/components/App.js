import React from 'react';
import Message from './Message';
import Menu from './Menu';
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

  const [, setUpdate] = React.useState(0);
  const [message, setMessage] = React.useState();
  const [title, setTitle] = React.useState();
  const [options, setOptions] = React.useState();

  function previousScene() {
    gameIndex = (gameIndex + games.length - 1) % games.length;
    gameState = games[gameIndex](sharedState);
    setTitle(gameState.name);
    setOptions(gameState.options);
    state.totalFrameTime = 0;
    state.frameCount = 0;
  }

  function nextScene() {
    gameIndex = (gameIndex + 1) % games.length;
    gameState = games[gameIndex](sharedState);
    setTitle(gameState.name);
    setOptions(gameState.options);
    state.totalFrameTime = 0;
    state.frameCount = 0;
  }

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

  const cancelMessage = React.useCallback(() => {
    clearTimeout(state.messageTimer);
    clearMessage();
  }, []);

  sharedState.showMessage = showMessage;
  sharedState.setOptions = setOptions;

  const forceUpdate = React.useCallback(() => { setUpdate(x => x + 1); }, []);

  const handleKeyDown = React.useCallback((event) => {
    if (event.code === 'PageDown') {
      event.preventDefault();
      nextScene();
    } else if (event.code === 'PageUp') {
      event.preventDefault();
      previousScene();
    } else if (event.code === 'Escape') {
      event.preventDefault();
      state.paused = !state.paused;
      cancelMessage();
      forceUpdate();
    }
    else {
      if (gameState.handleKeyDown) {
        gameState.handleKeyDown(event);
      }
    }
  }, [forceUpdate, cancelMessage]);

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
    setTitle(gameState.name);
    setOptions(gameState.options);

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
  }, [canvasRef, handleKeyDown]);

  const onChange = (option, value) => {
    if (value !== option.value) {
      gameState.setOption(option, value);
      forceUpdate();
    }
  };

  const onClickPrevious = (event) => {
    event.preventDefault();
    nextScene();
  };

  const onClickNext = (event) => {
    event.preventDefault();
    previousScene();
  };

  return (
    <div className="screen">
      <canvas id="canvas" ref={canvasRef}></canvas>
      <Message message={message} onClick={onClickMessage} />
      <Menu show={state.paused} onClickPrevious={onClickPrevious} onClickNext={onClickNext} onChange={onChange} title={title} options={options} />
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

export default App;
