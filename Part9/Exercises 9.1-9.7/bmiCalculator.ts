/** @format */

import { argv } from "process";

const height = Number(argv[2]);
const weight = Number(argv[3]);

function calculateBmi(height: number, weight: number): string {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}
if (argv[2] || argv[3]) {
  const result = calculateBmi(height, weight);
  console.log(result);
}

export default calculateBmi;
