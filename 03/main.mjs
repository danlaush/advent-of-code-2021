import { readFileLines } from "../lib/readFile.mjs";

const data = readFileLines("./input.txt");

const isZeroMoreCommon = (array) => {
  let zeros = 0;
  let ones = 0;
  array.forEach((bit) => {
    if (bit === "0") zeros++;
    if (bit === "1") ones++;
  });

  if (zeros === ones) {
    console.log("ZEROS EQUALS ONES");
    return 'equal';
  }

  return zeros > ones ? 'zeros' : 'ones';
};

const invertedData = data.reduce((accumulator, current) => {
  const currAsArray = current.split("");
  for (let index = 0; index < currAsArray.length; index++) {
    const bit = currAsArray[index];
    accumulator[index] = accumulator[index] || [];
    accumulator[index].push(bit);
  }
  return accumulator;
}, []);

//
// Part 1
//
(function () {
  console.log('PART 1')
  let gammaRate = "";
  let epsilonRate = "";

  for (let index = 0; index < invertedData.length; index++) {
    const interimBinaryArray = invertedData[index];
    const isZeroCommon = isZeroMoreCommon(interimBinaryArray);
    if (isZeroCommon === 'zeros') {
      gammaRate += "0";
      epsilonRate += "1";
    } else {
      gammaRate += "1";
      epsilonRate += "0";
    }
  }

  console.log({ gammaRate, epsilonRate });

  const powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

  console.log({ powerConsumption });
})();

//
// Part 2
//
(function () {
  console.log('PART 2')
  // console.log({invertedData})

  const bitPosition = 0;
  const firstBitCriteria = isZeroMoreCommon(invertedData[bitPosition]);
  console.log({firstBitCriteria})

  const firstSplit = data.reduce((accum, curr) => {
    if(firstBitCriteria === 'equal') {
      accum.oxyReadings.push(curr);
      accum.co2Readings.push(curr);
      return accum;
    }
    if(firstBitCriteria === 'zeroes') {
      accum.co2Readings.push(curr)
    } else {
      accum.oxyReadings.push(curr);
    }
    return accum;
  }, {oxyReadings: [], co2Readings: []})

  console.log({firstSplit})

  let oxygenGeneratorRating = "";
  let co2ScrubberRating = "";

  console.log({ oxygenGeneratorRating, co2ScrubberRating });

  const lifeSupportRating =
    parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);

  console.log({ lifeSupportRating });
})();
