
function progress(duration, now) {
  return now / duration;
}

function update(c, step) {
  const now = c.now + step;
  return {
    ...c,
    now,
    progress: progress(c.duration, now),
  }
}

function loop(c, lastTick) {
  if (c.progress < 1) {
    const step = Date.now() - lastTick;
    lastTick = Date.now();
    return {c:update(c, step), lastTick};
  }
}

function tic(iterator) {
  return iterator.next();
}



let clox = {
  duration: 15000,
  now: 0,
  progress: 0.0,
}
let idloop = 0;
function cancel() {
  cancelAnimationFrame(idloop)
}
let clockState = loop(clox);
function boucle() {
  const a = ({ value, done }) => {
    if (done)
      return 1;

    console.log(value);
    return 0;
  }
  if (a(tic(clockState))) {

  } else {
    idloop = requestAnimationFrame(boucle);
  }
}
requestAnimationFrame(boucle);


function* wtf() {
  console.log(yield);
}