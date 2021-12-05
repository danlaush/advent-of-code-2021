import input from './input.mjs'


let horizontal_position = 0;
let depth = 0;

for (const command of input) {
  const [direction, distanceString] = command.split(' ');
  const distance = Number(distanceString)
  switch (direction) {
    case 'forward':
      horizontal_position += distance;
      break;
    
    case 'down':
      depth += distance
      break;

    case 'up':
      depth -= distance;
      break;
  }
}

const area = horizontal_position * depth;

console.log('area covered', area);