import express from "express";

import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("getPatients");
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  console.log("getPatientById");
  const id = req.params.id;
  try {
    res.send(patientService.getPatientById(id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
