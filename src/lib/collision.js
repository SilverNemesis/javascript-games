const RECTANGLE = 1;
const CIRCLE = 2;

export function boundingRectangle(x1, y1, x2, y2) {
  return {
    type: RECTANGLE,
    x1,
    y1,
    x2,
    y2
  };
}

export function boundingCircle(cx, cy, radius) {
  return {
    type: CIRCLE,
    cx,
    cy,
    radius
  };
}

export function collide(pri, sec) {
  switch (pri.type) {
    case RECTANGLE:
      switch (sec.type) {
        case RECTANGLE:
          return collideRectangles(pri, sec);
        case CIRCLE:
          return collideCircleRectangle(sec, pri);
        default:
          throw new Error('cannot collide ' + pri.type + ' ' + sec.type);
      }
    case CIRCLE:
      switch (sec.type) {
        case RECTANGLE:
          return collideCircleRectangle(pri, sec);
        case CIRCLE:
          return collideCircles(pri, sec);
        default:
          throw new Error('cannot collide ' + pri.type + ' ' + sec.type);
      }
    default:
      throw new Error('cannot collide ' + pri.type + ' ' + sec.type);
  }
}

function collideRectangles(rect1, rect2) {
  if (rect1.x2 <= rect2.x1 || rect1.x1 >= rect2.x2 || rect1.y2 <= rect2.y1 || rect1.y1 >= rect2.y2) {
    return false;
  }
  return true;
}

function collideCircles(cir1, cir2) {
  const dx = cir1.cx - cir2.cx;
  const dy = cir1.cy - cir2.cy;
  const distance = dx * dx + dy * dy;
  const sr = cir1.radius + cir2.radius;
  if (distance < sr * sr) {
    return true;
  }
  return false;
}

function collideCircleRectangle(cir, rect) {
  let type = 0;
  let testX = cir.cx;
  let testY = cir.cy;
  if (cir.cx < rect.x1) {
    type |= 1;
    testX = rect.x1;
  } else if (cir.cx > rect.x2) {
    type |= 1;
    testX = rect.x2;
  }
  if (cir.cy < rect.y1) {
    type |= 2;
    testY = rect.y1;
  } else if (cir.cy > rect.y2) {
    type |= 2;
    testY = rect.y2;
  }
  const distX = cir.cx - testX;
  const distY = cir.cy - testY;
  const distance = (distX * distX) + (distY * distY);
  if (distance <= cir.radius * cir.radius) {
    return type;
  }
  return 0;
}
