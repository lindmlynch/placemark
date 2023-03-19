import axios from "axios";
import { db } from "../models/db.js";
import { PointSpec } from "../models/joi-schemas.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Trails",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addPoint: {
    validate: {
      payload: PointSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Add point error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newPoint = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };

      const apiKey = "5ccfe1a1e84b94d1babd1bb10d85753c";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${newPoint.latitude}&lon=${newPoint.longitude}&appid=${apiKey}`;
      const response = await axios.get(url);
      const weather = response.data.weather[0].description;
      const pointToAdd = { ...newPoint, weather };

      await db.pointStore.addPoint(placemark._id, pointToAdd);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  deletePoint: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.pointStore.deletePoint(request.params.pointid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
  uploadImage: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        let placemark;
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
