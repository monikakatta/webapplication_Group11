function calculateMean(numbers) {
  if (numbers.length === 0) return 0;
  
  const sum = numbers.reduce((acc, number) => acc + number, 0);
  return sum / numbers.length;
}


function calculateMedian(numbers) {
  if (numbers.length === 0) return 0;
  
  numbers.sort((a, b) => a - b);
  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  } else {
    return numbers[middle];
  }
}


function calculateMode(numbers) {
  if (numbers.length === 0) return 0;
  
  const numberCount = {};

  // Count the occurrences of each number
  numbers.forEach((number) => {
    if (numberCount[number]) {
      numberCount[number]++;
    } else {
      numberCount[number] = 1;
    }
  });

  let mode = null;
  let maxCount = 0;

  // Find the number with the highest count
  for (const number in numberCount) {
    if (numberCount[number] > maxCount) {
      maxCount = numberCount[number];
      mode = Number(number);
    }
  }

  return mode;
}


export{calculateMode,calculateMean,calculateMedian}