const request = require('supertest');
const router = require('./households');
const householdsModel = require('../models/households');

describe('Unit Tests: households', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const householdObject = {
      id: expect.any(Number),
      name: expect.any(String),
      occupants: expect.arrayContaining(expect.any(Number)),
    };

    const expected = {
      message: 'All households',
      success: true,
      payload: expect.arrayContaining(householdObject),
    };

    jest.spyOn(householdsModel, 'getHouseholds');
    householdsModel.getHouseholds.mockImplementation(async () => {
      return [
        { id: 5, name: 'Mock Household 1', occupants: [3, 5, 9] },
        { id: 4, name: 'Mock Household 2', occupants: [2, 1] },
      ];
    });

    // Act
    const actual = await request(router).get('/');

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholds.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = {
      message: `Bad Request: Couldn't retrieve households`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'getHouseholds');
    householdsModel.getHouseholds.mockImplementation(async () => {
      throw new Error(`Bad Request: Couldn't retrieve households`);
    });

    // Act
    const actual = await request(router).get('/');

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholds.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = {
      message: `Server Error: Couldn't retrieve households`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'getHouseholds');
    householdsModel.getHouseholds.mockImplementation(async () => {
      throw new Error(`Server Error: Couldn't retrieve households`);
    });

    // Act
    const actual = await request(router).get('/');

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholds.mockRestore();
  });

  test.skip('Upon a successful POST request, the correct response is returned', async () => {
    // Arrange
    const input = { name: 'Mock Household', occupants: [1, 2] };

    const expected = {
      message: `Household ${input.name} added`,
      success: true,
      payload: { id: expect.any(Number), ...input },
    };

    jest.spyOn(householdsModel, 'addHousehold');
    householdsModel.addHousehold.mockImplementation(async (data) => {
      return { id: 5, ...data };
    });

    // Act
    const actual = await request(router).post('/').send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.addHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful POST request due to user error, the correct response is returned', async () => {
    // Arrange
    const input = { name: 'Mock Household', occupants: [1, 2] };

    const expected = {
      message: `Bad Request: Couldn't add Household ${input.name}`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'addHousehold');
    householdsModel.addHousehold.mockImplementation(async (data) => {
      throw new Error(`Bad Request: Couldn't add Household ${data.name}`);
    });

    // Act
    const actual = await request(router).post('/').send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.addHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful POST request due to server error, the correct response is returned', async () => {
    // Arrange
    const input = { name: 'Mock Household', occupants: [1, 2] };

    const expected = {
      message: `Server Error: Couldn't add Household ${input.name}`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'addHousehold');
    householdsModel.addHousehold.mockImplementation(async (data) => {
      throw new Error(`Server Error: Couldn't add Household ${data.name}`);
    });

    // Act
    const actual = await request(router).post('/').send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.addHousehold.mockRestore();
  });
});

describe('Unit Tests: households/:id', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Household ${id}`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        occupants: expect.arrayContaining(expect.any(Number)),
      },
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      return { id: householdId, name: 'Mock Household', occupants: [1] };
    });

    // Act
    const actual = request(router).get(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Bad Request: Couldn't retrieve Household ${id}`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      throw new Error(
        `Bad Request: Couldn't retrieve Household ${householdId}}`
      );
    });

    // Act
    const actual = request(router).get(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Server Error: Couldn't retrieve Household ${id}`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      throw new Error(
        `Server Error: Couldn't retrieve Household ${householdId}`
      );
    });

    // Act
    const actual = request(router).get(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.skip('Upon a successful PATCH request, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const input = { name: 'New Name' };
    const expected = {
      message: `Household ${id} updated`,
      success: true,
      payload: {
        id,
        name: input.name,
        occupants: expect.arrayContaining(expect.any(Number)),
      },
    };

    jest.spyOn(householdsModel, 'updateHouseholdById');
    householdsModel.updateHouseholdById.mockImplementation(
      async (householdId, data) => {
        const keys = Object.keys(data);
        const object = {
          id: householdId,
          name: 'Old Name',
          occupants: [1, 2],
        };

        keys.forEach((key) => (object[key] = data[key]));
        return object;
      }
    );

    // Act
    const actual = await request(router).patch(`/${id}`).send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.updateHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PATCH request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const input = { name: 'New Name' };
    const expected = {
      message: `Bad Request: Couldn't update Household ${id}`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'updateHouseholdById');
    householdsModel.updateHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Bad Request: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act
    const actual = await request(router).patch(`/${id}`).send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.updateHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PATCH request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const input = { name: 'New Name' };
    const expected = {
      message: `Server Error: Couldn't update Household ${id}`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'updateHouseholdById');
    householdsModel.updateHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Server Error: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act
    const actual = await request(router).patch(`/${id}`).send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.updateHouseholdById.mockRestore();
  });

  test.skip('Upon a successful PUT request, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const input = { name: 'New Name', occupants: [4, 2] };
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

    // Act
    const actual = await request(router).put(`/${id}`).send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.overwriteHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PUT request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const input = { name: 'New Name', occupants: [4, 2] };
    const expected = {
      message: `Bad Request: Couldn't update Household ${id}`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'overwriteHouseholdById');
    householdsModel.overwriteHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Bad Request: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act
    const actual = await request(router).put(`/${id}`).send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.overwriteHouseholdById.mockRestore();
  });

  test.skip('Upon an unsuccessful PUT request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const input = { name: 'New Name', occupants: [4, 2] };
    const expected = {
      message: `Server Error: Couldn't update Household ${id}`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'overwriteHouseholdById');
    householdsModel.overwriteHouseholdById.mockImplementation(
      async (householdId, data) => {
        throw new Error(
          `Server Error: Couldn't update Household ${householdId}`
        );
      }
    );

    // Act
    const actual = await request(router).put(`/${id}`).send(input);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.overwriteHouseholdById.mockRestore();
  });

  test.skip('Upon a successful DELETE request, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Household ${id} deleted`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        occupants: expect.arrayContaining(expect.any(Number)),
      },
    };

    jest.spyOn(householdsModel, 'deleteHousehold');
    householdsModel.deleteHousehold.mockImplementation(async (householdId) => {
      return {
        id: householdId,
        name: 'Deleted Household',
        occupants: [3, 1, 5],
      };
    });

    // Act
    const actual = await request(router).delete(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.deleteHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful DELETE request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Bad Request: Couldn't delete Household ${id}`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'deleteHousehold');
    householdsModel.deleteHousehold.mockImplementation(async (householdId) => {
      throw new Error(`Bad Request: Couldn't delete Household ${householdId}`);
    });

    // Act
    const actual = await request(router).delete(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.deleteHousehold.mockRestore();
  });

  test.skip('Upon an unsuccessful DELETE request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Server Error: Couldn't delete Household ${id}`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'deleteHousehold');
    householdsModel.deleteHousehold.mockImplementation(async (householdId) => {
      throw new Error(`Server Error: Couldn't delete Household ${householdId}`);
    });

    // Act
    const actual = await request(router).delete(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.deleteHousehold.mockRestore();
  });
});

describe('Unit Tests: households/?name=', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const houseName = 'test';
    const expected = {
      message: `Household ${houseName}`,
      success: true,
      payload: [
        {
          id: expect.any(Number),
          name: houseName,
          occupants: expect.arrayContaining(expect.any(Number)),
        },
      ],
    };

    jest.spyOn(householdsModel, 'getHouseholdsByName');
    householdsModel.getHouseholdsByName.mockImplementation(
      async (searchedName) => {
        return [
          {
            id: 1,
            name: searchedName,
            occupants: [8],
          },
        ];
      }
    );

    // Act
    const actual = await request(router).get(`/?name=${houseName}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdsByName.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const houseName = 'test';
    const expected = {
      message: `Bad Request: unable to retrieve Household ${houseName}`,
      success: false,
      status: 400,
    };

    jest.spyOn(householdsModel, 'getHouseholdsByName');
    householdsModel.getHouseholdsByName.mockImplementation(
      async (searchedName) => {
        throw new Error(
          `Bad Request: unable to retrieve Household ${searchedName}`
        );
      }
    );

    // Act
    const actual = await request(router).get(`/?name=${houseName}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdsByName.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const houseName = 'test';
    const expected = {
      message: `Server Error: unable to retrieve Household ${houseName}`,
      success: false,
      status: 500,
    };

    jest.spyOn(householdsModel, 'getHouseholdsByName');
    householdsModel.getHouseholdsByName.mockImplementation(
      async (searchedName) => {
        throw new Error(
          `Server Error: unable to retrieve Household ${searchedName}`
        );
      }
    );

    // Act
    const actual = await request(router).get(`/?name=${houseName}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdsByName.mockRestore();
  });
});
