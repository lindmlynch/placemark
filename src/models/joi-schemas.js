import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PointSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Kerry Loop"),
    description: Joi.string().required().example("Walking Loop"),
    latitude: Joi.number().allow("").optional().example(12),
    longitude: Joi.number().allow("").optional().example(12),
    placemarkId: IdSpec,
  })
  .label("Point");

export const PointSpecPlus = PointSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PointPlus");

export const PointArraySpec = Joi.array().items(PointSpecPlus).label("PointArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Greenway"),
    userid: IdSpec,
    points: PointArraySpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
