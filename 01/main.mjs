import input from './input.mjs';


// part 1
let count = 0;

for (let index = 1; index < input.length; index++) {
  const current = input[index];
  const previous = input[index - 1];
  if(current > previous) {
    count++;
  }
}

console.log('total increases', count);

// part 2

let countSteps = 0;

for (let index = 3; index < input.length; index++) {
  const current = input[index] + input[index - 1] + input[index - 2];
  const previous = input[index - 1] + input[index - 2] + input[index - 3];
  if(current > previous) {
    countSteps++;
  }
}

console.log('total increases (aggregate)', countSteps);