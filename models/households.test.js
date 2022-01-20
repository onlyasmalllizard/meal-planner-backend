import db from '../db';
import {
  invalidId,
  serverError,
  serverThrowsError,
  slowServerResponse,
  userError,
  vaildId,
} from '../helpers/tests';
import {
  addHousehold,
  deleteHousehold,
  getHouseholdById,
  getHouseholds,
  overwriteHousehold,
  updateHousehold,
} from './households';
import {
  invalidInput,
  invalidPatchInput,
  returnManyHouseholds,
  returnSingleHousehold,
  validInput,
  validPatchInput,
} from '../helpers/tests/households';

const householdObject = {
  id: expect.any(String),
  name: expect.any(String),
  occupants: expect.arrayContaining(expect.any(String)),
};

beforeEach(() => {
  jest.spyOn(db, 'query');
});

afterEach(() => {
  db.query.mockRestore();
});

describe('Unit Tests: getHouseholds()', () => {
  test.skip('It returns data in the correct format', async () => {
    // Arrange
    const expected = expect.arrayContaining(householdObject);

    db.query.mockImplementation(returnManyHouseholds);

    // Act
    const actual = await getHouseholds();

    // Assert
    expect(actual).toStrictEqual(expected);
  });

  test.skip('When the server does not respond within 5 seconds, an error referencing a server error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(slowServerResponse);

    // Act and Assert
    expect(async () => await getHouseholds()).toThrowError(serverError);
  });
});

describe('Unit Tests: getHouseholdById()', () => {
  test.skip('When given a valid id, it returns data in the correct format', async () => {
    // Arrange
    db.query.mockImplementation(returnSingleHousehold);

    // Act
    const actual = await getHouseholdById(vaildId);

    // Assert
    expect(actual).toStrictEqual(householdObject);
  });

  test.skip('When given an invalid id, an error referencing a user error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(serverThrowsError);

    // Act and Assert
    expect(async () => await getHouseholdById(invalidId)).toThrowError(
      userError
    );
  });

  test.skip('When the server does not respond within 5 seconds, an error referencing a server error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(slowServerResponse);

    // Act and Assert
    expect(async () => await getHouseholdById(vaildId)).toThrowError(
      serverError
    );
  });
});

describe('Unit Tests: addHousehold()', () => {
  test.skip('When given valid input, it returns data in the correct format', async () => {
    // Arrange
    db.query.mockImplementation(returnSingleHousehold);

    // Act
    const actual = await addHousehold(validInput);

    // Assert
    expect(actual).toStrictEqual(householdObject);
  });

  test.skip('When given invalid input, an error referencing a user error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(serverThrowsError);

    // Act and Assert
    expect(async () => await addHousehold(invalidInput)).toThrowError(
      userError
    );
  });

  test.skip('When the server does not respond within 5 seconds, an error referencing a server error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(slowServerResponse);

    // Act and Assert
    expect(async () => await addHousehold(validInput)).toThrowError(
      serverError
    );
  });
});

describe('Unit Tests: updateHousehold()', () => {
  test.skip('When given valid input, it returns data in the correct format', async () => {
    // Arrange
    db.query.mockImplementation(returnSingleHousehold);

    // Act
    const actual = await updateHousehold(vaildId, validPatchInput);

    // Assert
    expect(actual).toStrictEqual(householdObject);
  });

  test.skip('When given invalid input, an error referencing a user error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(serverThrowsError);

    // Act and Assert
    expect(
      async () => await updateHousehold(vaildId, invalidPatchInput)
    ).toThrowError(userError);
  });

  test.skip('When the server does not respond within 5 seconds, an error referencing a server error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(slowServerResponse);

    // Act and Assert
    expect(
      async () => await updateHousehold(validId, validPatchInput)
    ).toThrowError(serverError);
  });
});

describe('Unit Tests: overwriteHousehold()', () => {
  test.skip('When given valid input, it returns data in the correct format', async () => {
    // Arrange
    db.query.mockImplementation(returnSingleHousehold);

    // Act
    const actual = await overwriteHousehold(validId, validInput);

    // Assert
    expect(actual).toStrictEqual(householdObject);
  });

  test.skip('When given invalid input, an error referencing a user error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(serverThrowsError);

    // Act and Assert
    expect(
      async () => await overwriteHousehold(validId, invalidInput)
    ).toThrowError(userError);
  });

  test.skip('When the server does not respond within 5 seconds, an error referencing a server error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(slowServerResponse);

    // Act and Assert
    expect(
      async () => await overwriteHousehold(vaildId, validInput)
    ).toThrowError(serverError);
  });
});

describe('Unit Tests: deleteHousehold()', () => {
  test.skip('When given a valid id, it returns data in the correct format', async () => {
    // Arrange
    db.query.mockImplementation(returnSingleHousehold);

    // Act
    const actual = await deleteHousehold(validId);

    // Assert
    expect(actual).toStrictEqual(householdObject);
  });

  test.skip('When given an invalid id, an error referencing a user error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(serverThrowsError);

    // Act and Assert
    expect(async () => await deleteHousehold(invalidId)).toThrowError(
      userError
    );
  });

  test.skip('When the server does not respond within 5 seconds, an error referencing a server error is thrown', async () => {
    // Arrange
    db.query.mockImplementation(slowServerResponse);

    // Act and Assert
    expect(async () => await deleteHousehold(validId)).toThrowError(
      serverError
    );
  });
});
