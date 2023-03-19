export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "Kingdom Trails",
      };
      return h.view("about-view", viewData);
    },
  },
};
