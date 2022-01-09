import { v4 as uuidv4 } from 'uuid';

const request = require('supertest');
const router = require('./households');
const householdsModel = require('../models/households');

describe('Unit Tests: households', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const householdObject = {
      id: expect.any(String),
      name: expect.any(String),
      occupants: expect.arrayContaining(expect.any(String)),
    };

    const expected = {
      message: 'All households',
      success: true,
      payload: expect.arrayContaining(householdObject),
    };

    jest.spyOn(householdsModel, 'getHouseholds');
    householdsModel.getHouseholds.mockImplementation(async () => {
      return [
        {
          id: uuidv4(),
          name: 'Mock Household 1',
          occupants: [uuidv4(), uuidv4(), uuidv4()],
        },
        {
          id: uuidv4(),
          name: 'Mock Household 2',
          occupants: [uuidv4(), uuidv4()],
        },
      ];
    });

    // Act and Assert
    const actual = await request(router).get('/').expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholds.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = {
      message: `Bad Request: Couldn't retrieve households`,
      success: false,
    };

    jest.spyOn(householdsModel, 'getHouseholds');
    householdsModel.getHouseholds.mockImplementation(async () => {
      throw new Error(`Bad Request: Couldn't retrieve households`);
    });

    // Act and Assert
    const actual = await request(router).get('/').expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholds.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = {
      message: `Server Error: Couldn't retrieve households`,
      success: false,
    };

    jest.spyOn(householdsModel, 'getHouseholds');
    householdsModel.getHouseholds.mockImplementation(async () => {
      throw new Error(`Server Error: Couldn't retrieve households`);
    });

    // Act and Assert
    const actual = await request(router).get('/').expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholds.mockRestore();
  });

  test.skip('Upon a successful POST request, the correct response is returned', async () => {
    // Arrange
    const input = { name: 'Mock Household', occupants: [uuidv4(), uuidv4()] };

    const expected = {
      message: `Household ${input.name} added`,
      success: true,
      payload: { id: expect.any(String), ...input },
    };

    jest.spyOn(householdsModel, 'addHousehold');
    householdsModel.addHousehold.mockImplementation(async (data) => {
      return { id: uuidv4(), ...data };
    });

    // Act and Assert
    const actual = await request(router).post('/').send(input).expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.addHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful POST request due to user error, the correct response is returned', async () => {
    // Arrange
    const input = { name: 'Mock Household', occupants: [uuidv4(), uuidv4()] };

    const expected = {
      message: `Bad Request: Couldn't add Household ${input.name}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'addHousehold');
    householdsModel.addHousehold.mockImplementation(async (data) => {
      throw new Error(`Bad Request: Couldn't add Household ${data.name}`);
    });

    // Act and Assert
    const actual = await request(router).post('/').send(input).expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.addHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful POST request due to server error, the correct response is returned', async () => {
    // Arrange
    const input = { name: 'Mock Household', occupants: [uuidv4(), uuidv4()] };

    const expected = {
      message: `Server Error: Couldn't add Household ${input.name}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'addHousehold');
    householdsModel.addHousehold.mockImplementation(async (data) => {
      throw new Error(`Server Error: Couldn't add Household ${data.name}`);
    });

    // Act and Assert
    const actual = await request(router).post('/').send(input).expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.addHousehold.mockRestore();
  });
});

describe('Unit Tests: households/:id', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Household ${id}`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        occupants: expect.arrayContaining(expect.any(String)),
      },
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      return { id: householdId, name: 'Mock Household', occupants: [uuidv4()] };
    });

    // Act and Assert
    const actual = request(router).get(`/${id}`).expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Bad Request: Couldn't retrieve Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      throw new Error(
        `Bad Request: Couldn't retrieve Household ${householdId}}`
      );
    });

    // Act and Assert
    const actual = request(router).get(`/${id}`).expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Server Error: Couldn't retrieve Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      throw new Error(
        `Server Error: Couldn't retrieve Household ${householdId}`
      );
    });

    // Act and Assert
    const actual = request(router).get(`/${id}`).expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.skip('Upon a successful PATCH request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'New Name' };
    const expected = {
      message: `Household ${id} updated`,
      success: true,
      payload: {
        id,
        name: input.name,
        occupants: expect.arrayContaining(expect.any(String)),
      },
    };

    jest.spyOn(householdsModel, 'updateHouseholdById');
    householdsModel.updateHouseholdById.mockImplementation(
      async (householdId, data) => {
        const keys = Object.keys(data);
        const object = {
          id: householdId,
          name: 'Old Name',
          occupants: [uuidv4(), uuidv4()],
        };

        keys.forEach((key) => (object[key] = data[key]));
        return object;
      }
    );

    // Act and Assert
    const actual = await request(router)
      .patch(`/${id}`)
      .send(input)
      .expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.updateHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PATCH request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'New Name' };
    const expected = {
      message: `Bad Request: Couldn't update Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'updateHouseholdById');
    householdsModel.updateHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Bad Request: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act and Assert
    const actual = await request(router)
      .patch(`/${id}`)
      .send(input)
      .expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.updateHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PATCH request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'New Name' };
    const expected = {
      message: `Server Error: Couldn't update Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'updateHouseholdById');
    householdsModel.updateHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Server Error: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act and Assert
    const actual = await request(router)
      .patch(`/${id}`)
      .send(input)
      .expect(500);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.updateHouseholdById.mockRestore();
  });

  test.skip('Upon a successful PUT request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'New Name', occupants: [uuidv4(), uuidv4()] };
    const expected = {
      message: `Server Error: Couldn't update Household ${id}`,
      success: true,
      payload: {
        id,
        name: input.name,
        occupants: input.occupants,
      },
    };

    jest.spyOn(householdsModel, 'overwriteHouseholdById');
    householdsModel.overwriteHouseholdById.mockImplementation(
      async (householdId, data) => {
        return { id: householdId, ...data };
      }
    );

    // Act and Assert
    const actual = await request(router).put(`/${id}`).send(input).expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.overwriteHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PUT request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'New Name', occupants: [uuidv4(), uuidv4()] };
    const expected = {
      message: `Bad Request: Couldn't update Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'overwriteHouseholdById');
    householdsModel.overwriteHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Bad Request: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act and Assert
    const actual = await request(router).put(`/${id}`).send(input).expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.overwriteHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PUT request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'New Name', occupants: [uuidv4(), uuidv4()] };
    const expected = {
      message: `Server Error: Couldn't update Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'overwriteHouseholdById');
    householdsModel.overwriteHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Server Error: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act and Assert
    const actual = await request(router).put(`/${id}`).send(input).expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.overwriteHouseholdById.mockRestore();
  });

  test.skip('Upon a successful DELETE request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Household ${id} deleted`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        occupants: expect.arrayContaining(expect.any(String)),
      },
    };

    jest.spyOn(householdsModel, 'deleteHousehold');
    householdsModel.deleteHousehold.mockImplementation(async (householdId) => {
      return {
        id: householdId,
        name: 'Deleted Household',
        occupants: [uuidv4(), uuidv4(), uuidv4()],
      };
    });

    // Act and Assert
    const actual = await request(router).delete(`/${id}`).expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.deleteHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful DELETE request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Bad Request: Couldn't delete Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'deleteHousehold');
    householdsModel.deleteHousehold.mockImplementation(async (householdId) => {
      throw new Error(`Bad Request: Couldn't delete Household ${householdId}`);
    });

    // Act and Assert
    const actual = await request(router).delete(`/${id}`).expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.deleteHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful DELETE request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Server Error: Couldn't delete Household ${id}`,
      success: false,
    };

    jest.spyOn(householdsModel, 'deleteHousehold');
    householdsModel.deleteHousehold.mockImplementation(async (householdId) => {
      throw new Error(`Server Error: Couldn't delete Household ${householdId}`);
    });

    // Act and Assert
    const actual = await request(router).delete(`/${id}`).expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.deleteHousehold.mockRestore();
  });
});
