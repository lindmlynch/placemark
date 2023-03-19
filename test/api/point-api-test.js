import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, greenway, testPlacemarks, testPoints, loop } from "../fixtures.js";

suite("Point API tests", () => {
  let user = null;
  let listPoints = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllPoints();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    greenway.userid = user._id;
    listPoints = await placemarkService.createPlacemark(greenway);
  });

  teardown(async () => {});

  test("create point", async () => {
    const returnedPoint = await placemarkService.createPoint(listPoints._id, loop);
    assertSubset(loop, returnedPoint);
  });

  test("create Multiple points", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoint(listPoints._id, testPoints[i]);
    }
    const returnedPoints = await placemarkService.getAllPoints();
    assert.equal(returnedPoints.length, testPoints.length);
    for (let i = 0; i < returnedPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const point = await placemarkService.getPoint(returnedPoints[i]._id);
      assertSubset(point, returnedPoints[i]);
    }
  });

  test("Delete PointApi", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoint(listPoints._id, testPoints[i]);
    }
    let returnedPoints = await placemarkService.getAllPoints();
    assert.equal(returnedPoints.length, testPoints.length);
    for (let i = 0; i < returnedPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await placemarkService.deletePoint(returnedPoints[i]._id);
    }
    returnedPoints = await placemarkService.getAllPoints();
    assert.equal(returnedPoints.length, 0);
  });

  test("denormalised placemark", async () => {
    for (let i = 0; i < testPoints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoint(listPoints._id, testPoints[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemark(listPoints._id);
    assert.equal(returnedPlacemark.points.length, testPoints.length);
    for (let i = 0; i < testPoints.length; i += 1) {
      assertSubset(testPoints[i], returnedPlacemark.points[i]);
    }
  });
});
