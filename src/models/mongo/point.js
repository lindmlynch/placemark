import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  weather: String,
  placemarkId: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Point = Mongoose.model("Point", pointSchema);
