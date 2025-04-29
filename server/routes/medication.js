import dotenv from 'dotenv';
import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

dotenv.config({path: '../.env'});

const router = express.Router();

// List of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("medications");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("medications");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      medicationName: req.body.medicationName,
      dosage: req.body.dosage,
      timeOfDay: req.body.timeOfDay,
      pharmacy: req.body.pharmacy,
      notes: req.body.notes,
    };
    let collection = await db.collection("medications");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
      medicationName: req.body.medicationName,
      dosage: req.body.dosage,
      timeOfDay: req.body.timeOfDay,
      pharmacy: req.body.pharmacy,
      notes: req.body.notes,
      },
    };

    let collection = await db.collection("medications");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("medications");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;