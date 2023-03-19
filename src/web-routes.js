import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { pointController } from "./controllers/point-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addPlacemark", config: dashboardController.addPlacemark },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/addPoint", config: placemarkController.addPoint },
  { method: "POST", path: "/placemark/{id}/uploadimage", config: placemarkController.uploadImage },

  { method: "GET", path: "/point/{id}/updatePoint/{pointid}", config: pointController.index },
  { method: "POST", path: "/point/{id}/updatePoint/{pointid}", config: pointController.update },

  { method: "GET", path: "/dashboard/deletePlacemark/{id}", config: dashboardController.deletePlacemark },
  { method: "GET", path: "/placemark/{id}/deletePoint/{pointid}", config: placemarkController.deletePoint },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
