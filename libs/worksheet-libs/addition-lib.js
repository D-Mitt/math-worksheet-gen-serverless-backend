export const generateAdditionWorksheet = (subCategory, config) => {
  switch (subCategory) {
    case "singleDigits":
      return generateSingleDigitAdditionQuestions(
        config.questionsPerWorksheet,
        config.numPerQuestion,
        config.isInline
      );
    case "doubleDigits":
      return generateDoubleDigitAdditionQuestions(
        config.questionsPerWorksheet,
        config.numPerQuestion
      );
    case "largeNumbers":
      return generateLargeNumberAdditionQuestions(
        config.questionsPerWorksheet,
        config.numPerQuestion,
        config.rangeOfDigitsPerNumber
      );
    default:
      return;
  }
};

export const randomInt = (min, max) => {
  // Max ends up exclusive, so add 1
  return min + Math.floor((max - min + 1) * Math.random());
};

export const addToTotal = (total, num) => {
  return total + num;
};

const generateSingleDigitAdditionQuestions = (
  numberOfQuestions, // number,
  numPerQuestion, //[number, number],
  isInline //boolean
) => {
  let questions = [];
  let answers = [];
  let prevNumbers = [];
  let numbers = [];
  let numbersPerQuestion = isInline ? [2, 2] : numPerQuestion;

  //number of questions
  for (var i = 0; i < numberOfQuestions; i++) {
    //reset numbers and set old numbers for comparison
    prevNumbers = [];
    numbers.forEach((num) => prevNumbers.push(num));
    numbers = [];

    // get the amount of numbers required for this question
    let numberAmount = randomInt(numPerQuestion[0], numbersPerQuestion[1]);

    // need to weed out if the previous question is identical to the last one
    let shouldContinue = false;

    while (!shouldContinue) {
      numbers = [];
      for (var j = 0; j < numberAmount; j++) {
        numbers.push(randomInt(0, 9));
      }

      if (prevNumbers.length != numbers.length) {
        shouldContinue = true;
      }

      for (var k = 0; k < prevNumbers.length; k++) {
        if (prevNumbers[k] !== numbers[k]) {
          shouldContinue = true;
        }
      }
    }

    // Add up numbers to get the answer
    const answer = `\\begin{array}{r}\\ \\quad ${numbers.reduce(
      addToTotal,
      0
    )}\\end{array}`;

    // set up math equation string

    let equation = ``;
    // Horizontal
    if (isInline) {
      equation = ``;
      numbers.forEach((number, index) => {
        if (index === numbers.length - 1) {
          equation = equation + `${number} = `;
        } else {
          equation = equation + `${number} + `;
        }
      });
    } else {
      equation = `\\begin{array}{r}`;
      numbers.forEach((number, index) => {
        if (index === numbers.length - 1) {
          equation = equation + `+\\quad `;
        } else {
          equation = equation + `\\quad `;
        }
        equation = equation + `${number}\\\\`;
      });

      equation = equation + `\\hline\\end{array}`;
    }
    // questions.push(`\\begin{array}{r}
    // ${numbers[0]}\\\\
    // +\\quad ${numbers[1]}\\\\
    // \\hline
    // \\end{array}`);
    questions.push(equation);
    answers.push(answer);
  }

  return {
    questions: questions,
    answers: answers,
  };
};

const generateDoubleDigitAdditionQuestions = (
  numberOfQuestions, // number,
  numPerQuestion // [number, number],
) => {
  let questions = [];
  let answers = [];
  let prevNumbers = [];
  let numbers = [];

  //number of questions
  for (var i = 0; i < numberOfQuestions; i++) {
    //reset numbers and set old numbers for comparison
    prevNumbers = [];
    numbers.forEach((num) => prevNumbers.push(num));
    numbers = [];
    // get the amount of numbers required for this question
    let numberAmount = randomInt(numPerQuestion[0], numPerQuestion[1]);

    // need to weed out if the previous question is identical to the last one
    let shouldContinue = false;
    while (!shouldContinue) {
      numbers = [];

      for (var j = 0; j < numberAmount; j++) {
        numbers.push(randomInt(10, 99));
      }

      if (prevNumbers.length != numbers.length) {
        shouldContinue = true;
      }

      for (var k = 0; k < prevNumbers.length; k++) {
        if (prevNumbers[k] !== numbers[k]) {
          shouldContinue = true;
        }
      }
    }

    // Add up numbers to get the answer
    const answer = `\\begin{array}{r}\\ \\quad ${numbers.reduce(
      addToTotal,
      0
    )}\\end{array}`;

    // set up math equation string
    let equation = `\\begin{array}{r}`;
    numbers.forEach((number, index) => {
      if (index === numbers.length - 1) {
        equation = equation + `+\\quad `;
      } else {
        equation = equation + `\\quad `;
      }
      equation = equation + `${number}\\\\`;
    });

    equation = equation + `\\hline\\end{array}`;

    // questions.push(`\\begin{array}{r}
    // ${numbers[0]}\\\\
    // +\\quad ${numbers[1]}\\\\
    // \\hline
    // \\end{array}`);
    questions.push(equation);
    answers.push(answer);
  }

  return {
    questions: questions,
    answers: answers,
  };
};

const generateLargeNumberAdditionQuestions = (
  numberOfQuestions, // number,
  numPerQuestion, // [number, number],
  rangeOfDigitsPerNumber // [number, number],
) => {
  let questions = [];
  let answers = [];
  let prevNumbers = [];
  let numbers = [];

  //number of questions
  for (var i = 0; i < numberOfQuestions; i++) {
    //reset numbers and set old numbers for comparison
    prevNumbers = [];
    numbers.forEach((num) => prevNumbers.push(num));
    numbers = [];
    // get the amount of numbers required for this question
    let numberAmount = randomInt(numPerQuestion[0], numPerQuestion[1]);

    //need to weed out if the previous question is identical to the last one
    let shouldContinue = false;

    while (!shouldContinue) {
      numbers = [];

      for (var j = 0; j < numberAmount; j++) {
        // a more even distribution of numbers from various digit sizes
        let digits = randomInt(
          rangeOfDigitsPerNumber[0],
          rangeOfDigitsPerNumber[1]
        );
        let lowNumberSize = Math.pow(10, digits - 1);
        let highNumberSize = Math.pow(10, digits) - 1;

        // if equals 1, then set to 0 to get 0 value too
        if (lowNumberSize === 1) {
          lowNumberSize = 0;
        }
        numbers.push(randomInt(lowNumberSize, highNumberSize));
      }

      if (prevNumbers.length != numbers.length) {
        shouldContinue = true;
      }

      for (var k = 0; k < prevNumbers.length; k++) {
        if (prevNumbers[k] !== numbers[k]) {
          shouldContinue = true;
        }
      }
    }

    // Add up numbers to get the answer
    const answer = `\\begin{array}{r}\\ \\quad ${numbers.reduce(
      addToTotal,
      0
    )}\\end{array}`;

    // set up math equation string
    let equation = `\\begin{array}{r}`;
    numbers.forEach((number, index) => {
      if (index === numbers.length - 1) {
        equation = equation + `+\\quad `;
      } else {
        equation = equation + `\\quad `;
      }
      equation = equation + `${number}\\\\`;
    });

    equation = equation + `\\hline\\end{array}`;

    // questions.push(`\\begin{array}{r}
    // ${numbers[0]}\\\\
    // +\\quad ${numbers[1]}\\\\
    // \\hline
    // \\end{array}`);
    questions.push(equation);
    answers.push(answer);
  }

  return {
    questions: questions,
    answers: answers,
  };
};
