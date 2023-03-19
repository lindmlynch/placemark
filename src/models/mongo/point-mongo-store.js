import { Point } from "./point.js";

export const pointMongoStore = {
  async getAllPoints() {
    const points = await Point.find().lean();
    return points;
  },

  async addPoint(placemarkId, point) {
    point.placemarkId = placemarkId;
    const newPoint = new Point(point);
    const pointObj = await newPoint.save();
    return this.getPointById(pointObj._id);
  },

  async getPointsByPlacemarkId(id) {
    const points = await Point.find({ placemark: id }).lean();
    return points;
  },

  async getPointById(id) {
    if (id) {
      const point = await Point.findOne({ _id: id }).lean();
      return point;
    }
    return null;
  },

  async deletePoint(id) {
    try {
      await Point.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPoints() {
    await Point.deleteMany({});
  },

  async updatePoint(point, updatedPoint) {
    const pointDoc = await Point.findOne({ _id: point._id });
    pointDoc.name = updatedPoint.name;
    pointDoc.description = updatedPoint.description;
    pointDoc.latitude = updatedPoint.latitude;
    pointDoc.longitude = updatedPoint.longitude;
    await pointDoc.save();
  },
};
