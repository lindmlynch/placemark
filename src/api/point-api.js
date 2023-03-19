import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PointSpec, PointSpecPlus, PointArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const pointApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const points = await db.pointStore.getAllPoints();
        return points;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PointArraySpec, failAction: validationError },
    description: "Get all pointApi",
    notes: "Returns all pointApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No point with this id");
        }
        return point;
      } catch (err) {
        return Boom.serverUnavailable("No point with this id");
      }
    },
    tags: ["api"],
    description: "Find a Point",
    notes: "Returns a point",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PointSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const point = await db.pointStore.addPoint(request.params.id, request.payload);
        if (point) {
          return h.response(point).code(201);
        }
        return Boom.badImplementation("error creating point");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a point",
    notes: "Returns the newly created point",
    validate: { payload: PointSpec },
    response: { schema: PointSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.pointStore.deleteAllPoints();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all pointApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const point = await db.pointStore.getPointById(request.params.id);
        if (!point) {
          return Boom.notFound("No Point with this id");
        }
        await db.pointStore.deletePoint(point._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Point with this id");
      }
    },
    tags: ["api"],
    description: "Delete a point",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
