const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error(
      "Provided values were not numbers or not enough args provided"
    );
  }
  height = height / 100;
  const bmi = weight / (height * height);

  if (bmi >= 40) {
    return "Obese Class III (Very severely obese)";
  } else if (bmi >= 35) {
    return "Obese Class II (Severely obese)";
  } else if (bmi >= 30) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi >= 25) {
    return "Overweight";
  } else if (bmi >= 18.5) {
    return "Normal (healthy weight)";
  } else if (bmi >= 16) {
    return "Underweight";
  } else if (bmi >= 15) {
    return "Severely underweight";
  } else {
    return "Very severely underweight";
  }
};

if (process.argv[2]) {
  const h = Number(process.argv[2]);
  const w = Number(process.argv[3]);
  console.log(calculateBmi(h, w));
}

export { calculateBmi };
