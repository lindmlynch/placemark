import { PointSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const pointController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const point = await db.pointStore.getPointById(request.params.pointid);
      const viewData = {
        title: "Edit Point",
        placemark: placemark,
        point: point,
      };
      return h.view("point-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PointSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("point-view", { title: "Edit point error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const point = await db.pointStore.getPointById(request.params.pointid);
      const newPoint = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.pointStore.updatePoint(point, newPoint);
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },
};
