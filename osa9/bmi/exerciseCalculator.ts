interface resultValues {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const getRatingDescription = (rating: number): string => {
  if (rating === 3) {
    return "good job!"
  } else if (rating === 2) {
    return "not too bad but could be better"
  } else {
    return "you can do much better"
  }
}

const getRating = (averageExercise: number, targetExercise: number): number => {
  if (averageExercise >= targetExercise) {
    return 3
  } else if (averageExercise >= targetExercise * 0.8) {
    return 2
  } else {
    return 1
  }
}

const calculateExercises = (
  args: Array<number>,
  target: number
): resultValues => {
  const periodLength = args.length
  const trainingDays = args.filter((day) => day !== 0).length
  const average = args.reduce((a, b) => a + b, 0) / args.length
  const rating = getRating(average, target)
  const ratingDescription = getRatingDescription(rating)

  let success = false
  if (rating === 3) {
    success = true
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

const array = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(array, 2))
