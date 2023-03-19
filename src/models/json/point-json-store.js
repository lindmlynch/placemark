import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/points.json"));
db.data = { points: [] };

export const pointJsonStore = {
  async getAllPoints() {
    await db.read();
    return db.data.points;
  },

  async addPoint(placemarkId, point) {
    await db.read();
    point._id = v4();
    point.placemarkid = placemarkId;
    db.data.points.push(point);
    await db.write();
    return point;
  },

  async getPointsByPlacemarkId(id) {
    await db.read();
    return db.data.points.filter((point) => point.placemarkid === id);
  },

  async getPointById(id) {
    await db.read();
    return db.data.points.find((point) => point._id === id);
  },

  async deletePoint(id) {
    await db.read();
    const index = db.data.points.findIndex((point) => point._id === id);
    db.data.points.splice(index, 1);
    await db.write();
  },

  async deleteAllPoints() {
    db.data.points = [];
    await db.write();
  },

  async updatePoint(point, updatedPoint) {
    point.name = updatedPoint.name;
    point.description = updatedPoint.description;
    point.latitude = updatedPoint.latitude;
    point.longitude = updatedPoint.longitude;
    await db.write();
  },
};
