import input from './input.mjs'


let horizontal_position = 0;
let depth = 0;
let aim = 0;

for (const command of input) {
  const [direction, distanceString] = command.split(' ');
  const distance = Number(distanceString)
  switch (direction) {
    case 'forward':
      horizontal_position += distance;
      depth += aim * distance;
      break;
    
    case 'down':
      aim += distance
      break;

    case 'up':
      aim -= distance;
      break;
  }
}

const area = horizontal_position * depth;

console.log('area covered', area);