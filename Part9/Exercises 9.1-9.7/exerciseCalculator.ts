/** @format */
const hours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(hours: number[], target: number): Result {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;

  const totalHours = hours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;

  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = "target reached, well done!";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "more effort needed next week!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const result = calculateExercises(hours, target);

console.log(result);
