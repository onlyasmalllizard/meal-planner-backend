import * as request from 'supertest';
import * as router from './households';
import * as householdsModel from '../models/households';
import {
  buildResponse,
  serverError,
  userError,
  validId,
  invalidId,
} from '../helpers/tests';
import {
  householdModelThrowsError,
  householdServerErrorResponse,
  householdUserErrorResponse,
  invalidInput,
  invalidPatchInput,
  returnManyHouseholds,
  returnSingleHousehold,
  sampleHousehold,
  validInput,
  validPatchInput,
} from '../helpers/tests/households';

const householdObject = {
  id: expect.any(String),
  name: expect.any(String),
  occupants: expect.arrayContaining(expect.any(String)),
};

const mockedFunctions = Object.keys(householdsModel);

beforeEach(() => {
  mockedFunctions.forEach((mockedFunction) =>
    jest.spyOn(householdsModel, mockedFunction)
  );
});

afterEach(() => {
  mockedFunctions.forEach((mockedFunction) =>
    householdsModel[mockedFunction].mockRestore()
  );
});

describe('Unit Tests: households', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(
      'All households',
      true,
      expect.arrayContaining(householdObject)
    );

    householdsModel.getHouseholds.mockImplementation(returnManyHouseholds);

    // Act and Assert
    const actual = await request(router).get('/').expect(200);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdUserErrorResponse(), false);

    householdsModel.getHouseholds.mockImplementation(() =>
      householdModelThrowsError(userError)
    );

    // Act and Assert
    const actual = await request(router).get('/').expect(400);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdServerErrorResponse(), false);

    householdsModel.getHouseholds.mockImplementation(() =>
      householdModelThrowsError(serverError)
    );

    // Act and Assert
    const actual = await request(router).get('/').expect(500);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon a successful POST request, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(
      `Household ${validInput.name} added`,
      true,
      householdObject
    );

    householdsModel.addHousehold.mockImplementation(returnSingleHousehold);

    // Act and Assert
    const actual = await request(router).post('/').send(validInput).expect(200);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful POST request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdUserErrorResponse(), false);

    householdsModel.addHousehold.mockImplementation(
      async () => await householdmodelThrowsError(userError)
    );

    // Act and Assert
    const actual = await request(router)
      .post('/')
      .send(invalidInput)
      .expect(400);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful POST request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdServerErrorResponse(), false);

    householdsModel.addHousehold.mockImplementation(
      async () => await householdmodelThrowsError(serverError)
    );

    // Act and Assert
    const actual = await request(router).post('/').send(validInput).expect(500);
    expect(actual).toStrictEqual(expected);
  });
});

describe('Unit Tests: households/:id', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(`Household ${validId}`, true, {
      ...householdObject,
      id: validId,
    });

    householdsModel.getHouseholdById.mockImplementation(
      async () =>
        await returnSingleHousehold({ ...sampleHousehold, id: validId })
    );

    // Act and Assert
    const actual = request(router).get(`/${validId}`).expect(200);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdUserErrorResponse(), false);

    householdsModel.getHouseholdById.mockImplementation(
      async () => await householdModelThrowsError(userError)
    );

    // Act and Assert
    const actual = request(router).get(`/${invalidId}`).expect(400);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdServerErrorResponse(), false);

    householdsModel.getHouseholdById.mockImplementation(
      async () => await householdmodelThrowsError(serverError)
    );

    // Act and Assert
    const actual = request(router).get(`/${validId}`).expect(500);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon a successful PATCH request, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(`Household ${validId} updated`, true, {
      ...householdObject,
      id: validId,
      ...validPatchInput,
    });

    householdsModel.updateHousehold.mockImplementation(
      async () =>
        await returnSingleHousehold({ ...sampleHousehold, id: validId })
    );

    // Act and Assert
    const actual = await request(router)
      .patch(`/${validId}`)
      .send(input)
      .expect(200);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful PATCH request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdUserErrorResponse(), false);

    householdsModel.updateHousehold.mockImplementation(
      async () => await householdmodelThrowsError(userError)
    );

    // Act and Assert
    const actual = await request(router)
      .patch(`/${validId}`)
      .send(invalidPatchInput)
      .expect(400);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful PATCH request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdServerErrorResponse(), false);

    householdsModel.updateHousehold.mockImplementation(
      async () => await householdmodelThrowsError(serverError)
    );

    // Act and Assert
    const actual = await request(router)
      .patch(`/${validId}`)
      .send(validPatchInput)
      .expect(500);

    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon a successful PUT request, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(`Household ${validId} updated`, true, {
      id: validId,
      name: validInput.name,
      occupants: validInput.occupants,
    });

    householdsModel.overwriteHousehold.mockImplementation(
      async () => await returnSingleHousehold({ id: validId, ...validInput })
    );

    // Act and Assert
    const actual = await request(router)
      .put(`/${validId}`)
      .send(validInput)
      .expect(200);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful PUT request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdUserErrorResponse(), false);

    householdsModel.overwriteHousehold.mockImplementation(
      async () => await householdmodelThrowsError(userError)
    );

    // Act and Assert
    const actual = await request(router)
      .put(`/${validId}`)
      .send(invalidInput)
      .expect(400);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful PUT request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdServerErrorResponse(), false);

    householdsModel.overwriteHousehold.mockImplementation(
      async () => await householdmodelThrowsError(serverError)
    );

    // Act and Assert
    const actual = await request(router)
      .put(`/${validId}`)
      .send(validInput)
      .expect(500);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon a successful DELETE request, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(`Household ${id} deleted`, true, {
      id: validId,
      ...sampleHousehold,
    });

    householdsModel.deleteHousehold.mockImplementation(
      async () =>
        await returnSingleHousehold({ ...sampleHousehold, id: validId })
    );

    // Act and Assert
    const actual = await request(router).delete(`/${validId}`).expect(200);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful DELETE request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdUserErrorResponse(), false);

    householdsModel.deleteHousehold.mockImplementation(
      async () => await householdmodelThrowsError(userError)
    );

    // Act and Assert
    const actual = await request(router).delete(`/${invalidId}`).expect(400);
    expect(actual).toStrictEqual(expected);
  });

  test.skip('Upon an unsuccessful DELETE request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = buildResponse(householdServerErrorResponse(), false);

    householdsModel.deleteHousehold.mockImplementation(
      async () => await householdmodelThrowsError(serverError)
    );

    // Act and Assert
    const actual = await request(router).delete(`/${validId}`).expect(500);
    expect(actual).toStrictEqual(expected);
  });
});
