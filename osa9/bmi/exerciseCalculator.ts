interface resultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRatingDescription = (rating: number): string => {
  if (rating === 3) {
    return "good job!";
  } else if (rating === 2) {
    return "not too bad but could be better";
  } else {
    return "you can do much better";
  }
};

const getRating = (averageExercise: number, targetExercise: number): number => {
  if (averageExercise >= targetExercise) {
    return 3;
  } else if (averageExercise >= targetExercise * 0.8) {
    return 2;
  } else {
    return 1;
  }
};

const calculateExercises = (
  target: number,
  args: Array<number>
): resultValues => {
  if (args.length === 0) throw new Error("No values provided");
  if (args.includes(NaN) || isNaN(target))
    throw new Error("Provided values were not numbers!");

  const periodLength = args.length;
  const trainingDays = args.filter((day) => day !== 0).length;
  const average = args.reduce((a, b) => a + b, 0) / args.length;
  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  let success = false;
  if (rating === 3) {
    success = true;
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
};

if (process.argv[2]) {
  const target = Number(process.argv[2]);
  const array = process.argv.slice(3).map((i) => Number(i));
  console.log(calculateExercises(target, array));
}

export { calculateExercises };
