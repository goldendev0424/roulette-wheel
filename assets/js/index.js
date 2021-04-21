let isRotating = false;
const rouletteWheelNumbers = [
  0,
  32,
  15,
  19,
  4,
  21,
  2,
  25,
  17,
  34,
  6,
  27,
  13,
  36,
  11,
  30,
  8,
  23,
  10,
  5,
  24,
  16,
  33,
  1,
  20,
  14,
  31,
  9,
  22,
  18,
  29,
  7,
  28,
  12,
  35,
  3,
  26
];

document.querySelector('#btn_start').addEventListener('click', () => {
  wheelStart();
})

document.querySelector('#btn_stop').addEventListener('click', () => {
  gBackAnimation.reset();
  gBallAnimation.reset();

  let index = Math.floor(Math.random() * (36 - 0 + 1) + 0);
  const resultNumber = rouletteWheelNumbers[index]
  console.log('resultNumber:', resultNumber)
  wheelStop(resultNumber);
})

// Wheel start
function wheelStart() {
  if (isRotating) {
    return;
  }

  isRotating = true;

  if(window.gBackAnimation) {
    gBackAnimation.play();
    gBallAnimation.play();
    return;
  }

  var backAnimation = anime({
    targets: ['.layer-2', '.layer-4'],
    rotate: 720,
    easing: 'linear',
    loop: true,
  });

  var ballAnimation = anime({
    targets: ['.ball-container'],
    rotate: 360,
    easing: 'linear',
    loop: true,
    direction: 'reverse',
  });

  window.gBackAnimation = backAnimation;
  window.gBallAnimation = ballAnimation;
}

/**
 * Wheel stop function
 * 
 * @param number resultNumber winning betting number
 */ 
function wheelStop(resultNumber) {
  const bezier = [0.165, 0.84, 0.44, 1.005];
  
  // wheel animation
  let i = rouletteWheelNumbers.findIndex((item) => {
    return item === resultNumber
  });

  let newRotaion = 720 - (360 / rouletteWheelNumbers.length) * i
  // newRotaion = newRotaion < 180 ? newRotaion + 360 : newRotaion;

  anime({
    targets: [".layer-2", ".layer-4"],
    rotate: newRotaion,
    duration: 4000,
    loop: 1,
    easing: `cubicBezier(${bezier.join(",")})`,
    complete: () => {
    }
  });

  // Ball animation
  let translateY = [
    { value: 0, duration: 2000 },
    { value: 0, duration: 1000 },
    { value: 0, duration: 1000 },
    { value: 50, duration: 1000 }
  ];
  
  if(window.innerWidth < 485) {
    translateY[3].value = 30;
  }
    
  anime({
    targets: '.ball-container',
    translateY,
    rotate: [{ value: 0, duration: 4000 }],
    loop: 1,
    easing: `cubicBezier(${bezier.join(",")})`,
    complete: () => {
      isRotating = false;
    }
  });
}