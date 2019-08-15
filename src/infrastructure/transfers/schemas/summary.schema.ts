import * as mongoose from 'mongoose';

export const summarySchema = new mongoose.Schema({
  _id: String,
  docket: String,
  extract: String,
  expected: Number,
  recieved: Number,
  updated: Date,
});
