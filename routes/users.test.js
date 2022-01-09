import { v4 as uuidv4 } from 'uuid';
import * as request from 'supertest';
import * as router from './users';
import * as usersModel from '../models/users';

describe('Unit Tests: users', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const userObject = {
      id: expect.any(String),
      name: expect.any(String),
      household: expect.any(String),
    };

    const expected = {
      message: 'All users',
      success: true,
      payload: expect.arrayContaining(userObject),
    };

    jest.spyOn(usersModel, 'getUsers');
    usersModel.getUsers.mockImplentation(async () => {
      return [
        { id: uuidv4(), name: 'Ghost', household: uuidv4() },
        { id: uuidv4(), name: 'Cirrus', household: uuidv4() },
        { id: uuidv4(), name: 'Cooper', household: uuidv4() },
      ];
    });

    // Act and Assert
    const actual = await request(router).get('/').expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUsers.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const expected = {
      message: `Bad Request: Couldn't retrieve users`,
      success: false,
    };

    jest.spyOn(usersModel, 'getUsers');
    usersModel.getUsers.mockImplentation(async () => {
      throw new Error(`Bad Request: Couldn't retrieve users`);
    });

    // Act and Assert
    const actual = await request(router).get('/').expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUsers.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const expected = {
      message: `Server Error: Couldn't retrieve users`,
      success: false,
    };

    jest.spyOn(usersModel, 'getUsers');
    usersModel.getUsers.mockImplentation(async () => {
      throw new Error(`Server Error: Couldn't retrieve users`);
    });

    // Act and Assert
    const actual = await request(router).get('/').expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUsers.mockRestore();
  });

  test.skip('Upon a successful POST request, the correct response is returned', async () => {
    // Arrange
    const input = {
      name: 'Fennel',
      household: uuidv4(),
    };

    const expected = {
      message: `${input.name} added`,
      success: true,
      payload: {
        id: expect.any(String),
        name: input.name,
        household: input.household,
      },
    };

    jest.spyOn(usersModel, 'addUser');
    usersModel.addUser.mockImplentation(async (data) => {
      return { id: uuidv4(), ...data };
    });

    // Act and Assert
    const actual = await request(router).post('/').send(input).expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.addUser.mockRestore();
  });

  test.skip('Upon an unsuccessful POST request due to user error, the correct response is returned', async () => {
    // Arrange
    const input = {
      name: 'Fennel',
      household: uuidv4(),
    };

    const expected = {
      message: `Bad Request: unable to add ${input.name}`,
      success: false,
    };

    jest.spyOn(usersModel, 'addUser');
    usersModel.addUser.mockImplentation(async (data) => {
      throw new Error(`Bad Request: unable to add ${data.name}`);
    });

    // Act and Assert
    const actual = await (await request(router).post('/'))
      .send(input)
      .expect(400);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.addUser.mockRestore();
  });

  test.skip('Upon an unsuccessful POST request due to server error, the correct response is returned', async () => {
    // Arrange
    const input = {
      name: 'Fennel',
      household: uuidv4(),
    };

    const expected = {
      message: `Server Error: unable to add ${input.name}`,
      success: false,
    };

    jest.spyOn(usersModel, 'addUser');
    usersModel.addUser.mockImplentation(async (data) => {
      throw new Error(`Server Error: unable to add ${data.name}`);
    });

    // Act and Assert
    const actual = await request(router).post('/').send(input).expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.addUser.mockRestore();
  });
});

describe('Unit Tests: users/:id', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `User ${id}`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        household: expect.any(String),
      },
    };

    jest.spyOn(usersModel, 'getUserById');
    usersModel.getUserById.mockImplentation(async (userId) => {
      return { id: userId, name: 'Sprocket', household: uuidv4() };
    });

    // Act and Assert
    const actual = await request(router).get(`/${id}`).expect(200);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUserById.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Bad Request: unable to retrieve User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'getUserById');
    usersModel.getUserById.mockImplentation(async (userId) => {
      throw new Error(`Bad Request: unable to retrieve User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router).get(`/${id}`).expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUserById.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Server Error: unable to retrieve User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'getUserById');
    usersModel.getUserById.mockImplentation(async (userId) => {
      throw new Error(`Server Error: unable to retrieve User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router).get(`/${id}`).expect(500);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUserById.mockRestore();
  });

  test.skip('Upon a successful PATCH request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'Ghostling' };
    const expected = {
      message: `User ${id} updated`,
      success: true,
      payload: {
        id,
        name: input.name,
        household: expect.any(String),
      },
    };

    jest.spyOn(usersModel, 'updateUser');
    usersModel.updateUser.mockImplentation(async (userId, data) => {
      const userObject = { id: userId, name: 'Ghost', household: uuidv4() };
      const keys = Object.keys(data);

      keys.forEach((key) => (userObject[key] = data[key]));

      return userObject;
    });

    // Act and Assert
    const actual = await request(router)
      .patch(`/${id}`)
      .send(input)
      .expect(200);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.updateUser.mockRestore();
  });

  test.skip('Upon an unsuccessful PATCH request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'Ghostling' };
    const expected = {
      message: `Bad Request: unable to update User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'updateUser');
    usersModel.updateUser.mockImplentation(async (userId, data) => {
      throw new Error(`Bad Request: unable to update User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router)
      .patch(`/${id}`)
      .send(input)
      .expect(400);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.updateUser.mockRestore();
  });

  test.skip('Upon an unsuccessful PATCH request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'Ghostling' };
    const expected = {
      message: `Server Error: unable to update User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'updateUser');
    usersModel.updateUser.mockImplentation(async (userId, data) => {
      throw new Error(`Server Error: unable to update User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router)
      .patch(`/${id}`)
      .send(input)
      .expect(500);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.updateUser.mockRestore();
  });

  test.skip('Upon a successful PUT request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'Ghostling', household: uuidv4() };
    const expected = {
      message: `User ${id} updated`,
      success: true,
      payload: {
        id,
        name: input.name,
        household: input.household,
      },
    };

    jest.spyOn(usersModel, 'overwriteUser');
    usersModel.overwriteUser.mockImplentation(async (userId, data) => {
      return { id: userId, ...data };
    });

    // Act and Assert
    const actual = await request(router).put(`/${id}`).send(input).expect(200);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.overwriteUser.mockRestore();
  });

  test.skip('Upon an unsuccessful PUT request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'Ghostling', household: uuidv4() };
    const expected = {
      message: `Bad Request: unable to update User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'overwriteUser');
    usersModel.overwriteUser.mockImplentation(async (userId, data) => {
      throw new Error(`Bad Request: unable to update User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router).put(`/${id}`).send(input).expect(400);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.overwriteUser.mockRestore();
  });

  test.skip('Upon an unsuccessful PUT request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const input = { name: 'Ghostling', household: uuidv4() };
    const expected = {
      message: `Server Error: unable to update User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'overwriteUser');
    usersModel.overwriteUser.mockImplentation(async (userId, data) => {
      throw new Error(`Server Error: unable to update User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router).put(`/${id}`).send(input).expect(500);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.overwriteUser.mockRestore();
  });

  test.skip('Upon a successful DELETE request, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `User ${id} deleted`,
      success: true,
      payload: {
        id,
        name: expect.any(String),
        household: expect.any(String),
      },
    };

    jest.spyOn(usersModel, 'deleteUser');
    usersModel.deleteUser.mockImplentation(async (userId) => {
      return { id: userId, name: 'Horrible User', household: uuidv4() };
    });

    // Act and Assert
    const actual = await request(router).delete(`/${id}`).expect(200);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.deleteUser.mockRestore();
  });

  test.skip('Upon an unsuccessful DELETE request due to user error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Bad Request: unable to delete User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'deleteUser');
    usersModel.deleteUser.mockImplentation(async (userId) => {
      throw new Error(`Bad Request: unable to delete User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router).delete(`/${id}`).expect(400);
    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.deleteUser.mockRestore();
  });

  test.skip('Upon an unsuccessful DELETE request due to server error, the correct response is returned', async () => {
    // Arrange
    const id = uuidv4();
    const expected = {
      message: `Server Error: unable to delete User ${id}`,
      success: false,
    };

    jest.spyOn(usersModel, 'deleteUser');
    usersModel.deleteUser.mockImplentation(async (userId) => {
      throw new Error(`Server Error: unable to delete User ${userId}`);
    });

    // Act and Assert
    const actual = await request(router).delete(`/${id}`).expect(500);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.deleteUser.mockRestore();
  });
});

describe('Unit Tests: users/?name=', () => {
  test.skip('Upon a successful GET request, the correct response is returned', async () => {
    // Arrange
    const searchedName = 'Cooper';

    const userObject = {
      id: expect.any(String),
      name: expect.stringContaining(searchedName),
      household: expect.any(String),
    };

    const expected = {
      message: `User ${searchedName}`,
      success: true,
      payload: expect.arrayContaining(userObject),
    };

    jest.spyOn(usersModel, 'getUsersByName');
    usersModel.getUsersByName.mockImplentation(async (search) => {
      return [
        { id: uuidv4(), name: search, household: uuidv4() },
        { id: uuidv4(), name: `${search}son`, household: uuidv4() },
      ];
    });

    // Act and Assert
    const actual = await request(router)
      .get(`/?name=${searchedName}`)
      .expect(200);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUsersByName.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to user error, the correct response is returned', async () => {
    // Arrange
    const searchedName = 'Cooper';

    const expected = {
      message: `Bad Request: couldn't retrieve User ${searchedName}`,
      success: false,
    };

    jest.spyOn(usersModel, 'getUsersByName');
    usersModel.getUsersByName.mockImplentation(async (search) => {
      throw new Error(`Bad Request: couldn't retrieve User ${search}`);
    });

    // Act and Assert
    const actual = await request(router)
      .get(`/?name=${searchedName}`)
      .expect(400);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUsersByName.mockRestore();
  });

  test.skip('Upon an unsuccessful GET request due to server error, the correct response is returned', async () => {
    // Arrange
    const searchedName = 'Cooper';

    const expected = {
      message: `Server Error: couldn't retrieve User ${searchedName}`,
      success: false,
    };

    jest.spyOn(usersModel, 'getUsersByName');
    usersModel.getUsersByName.mockImplentation(async (search) => {
      throw new Error(`Server Error: couldn't retrieve User ${search}`);
    });

    // Act and Assert
    const actual = await request(router)
      .get(`/?name=${searchedName}`)
      .expect(500);

    expect(actual).toStrictEqual(expected);

    // Cleanup
    usersModel.getUsersByName.mockRestore();
  });
});
