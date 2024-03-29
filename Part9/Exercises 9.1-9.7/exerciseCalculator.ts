/** @format */
import { argv } from "process";

const target = Number(argv[2]);
const hours = argv.slice(3).map((num) => Number(num));

interface Response {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(hours: number[], target: number): Response {
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

if (argv[2] || argv[3]) {
  const result = calculateExercises(hours, target);

  console.log(result);
}

export { calculateExercises, Response };
