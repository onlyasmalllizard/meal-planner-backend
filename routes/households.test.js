const request = require('supertest');
const router = require('./households');

const householdsModel = require('../models/households');

describe('Unit Tests: households/:id', () => {
  test('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const id = 1;
    const expected = {
      message: `Household ${id}`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        occupants: expect.arrayContaining(expect.any(Object)),
      },
    };

    jest.spyOn(householdsModel, 'getHouseholdById');
    householdsModel.getHouseholdById.mockImplementation(async (householdId) => {
      return { id: householdId, name: 'Mock Household', occupants: [{}] };
    });

    // Act
    const actual = request(router).get(`/${id}`);

    // Assert
    expect(actual).toStrictEqual(expected);

    // Cleanup
    householdsModel.getHouseholdById.mockRestore();
  });

  test.todo(
    'Upon an unsuccessful GET request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const expected = {
        message: `Bad Request: Couldn't retrieve Household ${id}`,
        success: false,
        status: 400,
      };

      jest.spyOn(householdsModel, 'getHouseholdById');
      householdsModel.getHouseholdById.mockImplementation(
        async (householdId) => {
          throw new Error(
            `Bad Request: Couldn't retrieve Household ${householdId}}`
          );
        }
      );

      // Act
      const actual = request(router).get(`/${id}`);

      // Assert
      expect(actual).toStrictEqual(expected);

      // Cleanup
      householdsModel.getHouseholdById.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const expected = {
        message: `Server Error: Couldn't retrieve Household ${id}`,
        success: false,
        status: 500,
      };

      jest.spyOn(householdsModel, 'getHouseholdById');
      householdsModel.getHouseholdById.mockImplementation(
        async (householdId) => {
          throw new Error(
            `Server Error: Couldn't retrieve Household ${householdId}`
          );
        }
      );

      // Act
      const actual = request(router).get(`/${id}`);

      // Assert
      expect(actual).toStrictEqual(expected);

      // Cleanup
      householdsModel.getHouseholdById.mockRestore();
    }
  );

  test.todo(
    'Upon a successful PATCH request, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const input = { name: 'New Name' };
      const expected = {
        message: `Household ${id} updated`,
        success: true,
        payload: {
          id,
          name: input.name,
          occupants: expect.arrayContaining(expect.any(Object)),
        },
      };

      jest.spyOn(householdsModel, 'updateHouseholdById');
      householdsModel.updateHouseholdById.mockImplementation(
        async (householdId, data) => {
          const keys = Object.keys(data);
          const object = { id: householdId, name: 'Old Name', occupants: [{}] };

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
    }
  );

  test.todo(
    'Upon an unsuccessful PATCH request due to user error, the correct response is returned',
    async () => {
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
    }
  );

  test.todo(
    'Upon an unsuccessful PATCH request due to server error, the correct response is returned',
    async () => {
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
    }
  );

  test.todo(
    'Upon a successful PUT request, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const input = { name: 'New Name', occupants: [{}] };
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
    }
  );

  test.todo(
    'Upon an unsuccessful PUT request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const input = { name: 'New Name', occupants: [{}] };
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
    }
  );

  test.todo(
    'Upon an unsuccessful PUT request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const input = { name: 'New Name', occupants: [{}] };
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
    }
  );

  test.todo(
    'Upon a successful DELETE request, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const expected = {
        message: `Household ${id} deleted`,
        success: true,
        payload: {
          id,
          name: expect.any(String),
          occupants: expect.arrayContaining(expect.any(Object)),
        },
      };

      jest.spyOn(householdsModel, 'deleteHousehold');
      householdsModel.deleteHousehold.mockImplementation(
        async (householdId) => {
          return {
            id: householdId,
            name: 'Deleted Household',
            occupants: [{}],
          };
        }
      );

      // Act
      const actual = await request(router).delete(`/${id}`);

      // Assert
      expect(actual).toStrictEqual(expected);

      // Cleanup
      householdsModel.deleteHousehold.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful DELETE request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const expected = {
        message: `Bad Request: Couldn't delete Household ${id}`,
        success: false,
        status: 400,
      };

      jest.spyOn(householdsModel, 'deleteHousehold');
      householdsModel.deleteHousehold.mockImplementation(
        async (householdId) => {
          throw new Error(
            `Bad Request: Couldn't delete Household ${householdId}`
          );
        }
      );

      // Act
      const actual = await request(router).delete(`/${id}`);

      // Assert
      expect(actual).toStrictEqual(expected);

      // Cleanup
      householdsModel.deleteHousehold.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful DELETE request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = 1;
      const expected = {
        message: `Server Error: Couldn't delete Household ${id}`,
        success: false,
        status: 500,
      };

      jest.spyOn(householdsModel, 'deleteHousehold');
      householdsModel.deleteHousehold.mockImplementation(
        async (householdId) => {
          throw new Error(
            `Server Error: Couldn't delete Household ${householdId}`
          );
        }
      );

      // Act
      const actual = await request(router).delete(`/${id}`);

      // Assert
      expect(actual).toStrictEqual(expected);

      // Cleanup
      householdsModel.deleteHousehold.mockRestore();
    }
  );
});

describe('Unit Tests: households/name', () => {
  test('Upon a successful GET request, the correct response is returned', async () => {});

  test('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {});

  test('Upon a successful POST request, the correct response is returned', async () => {});

  test('Upon an unsuccessful POST request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful POST request due to server error, the correct response is returned', async () => {});

  test('Upon a successful PATCH request, the correct response is returned', async () => {});

  test('Upon an unsuccessful PATCH request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful PATCH request due to server error, the correct response is returned', async () => {});

  test('Upon a successful PUT request, the correct response is returned', async () => {});

  test('Upon an unsuccessful PUT request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful PUT request due to server error, the correct response is returned', async () => {});

  test('Upon a successful DELETE request, the correct response is returned', async () => {});

  test('Upon an unsuccessful DELETE request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful DELETE request due to server error, the correct response is returned', async () => {});
});

describe('Unit Tests: households/:id/occupants', () => {
  test('Upon a successful GET request, the correct response is returned', async () => {});

  test('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {});

  test('Upon a successful POST request, the correct response is returned', async () => {});

  test('Upon an unsuccessful POST request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful POST request due to server error, the correct response is returned', async () => {});

  test('Upon a successful PATCH request, the correct response is returned', async () => {});

  test('Upon an unsuccessful PATCH request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful PATCH request due to server error, the correct response is returned', async () => {});

  test('Upon a successful PUT request, the correct response is returned', async () => {});

  test('Upon an unsuccessful PUT request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful PUT request due to server error, the correct response is returned', async () => {});

  test('Upon a successful DELETE request, the correct response is returned', async () => {});

  test('Upon an unsuccessful DELETE request due to user error, the correct response is returned', async () => {});

  test('Upon an unsuccessful DELETE request due to server error, the correct response is returned', async () => {});
});
