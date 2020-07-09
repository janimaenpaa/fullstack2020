import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.send({ weight, height, bmi: result });
  } catch (err) {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  try {
    const result = calculateExercises(Number(target), daily_exercises);
    res.send(result);
  } catch (err) {
    res.send({
      error: "parameters missing",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
