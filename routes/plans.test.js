import { v4 as uuidv4 } from 'uuid';

const request = require('supertest');
const router = require('./plans');
const plansModel = require('../models/plans');

describe('Unit Tests: plans', () => {
  test.todo(
    'Upon a successful GET request, the correct response is returned',
    async () => {
      // Arrange
      const plansObject = {
        id: expect.any(String),
        date: expect.any(String),
        organiser: expect.any(String),
        attendees: expect.arrayContaining(expect.any(String)),
        meal: expect.stringMatching(/breakfast|lunch|dinner/i),
      };

      const expected = {
        message: 'All plans',
        success: true,
        payload: expect.arrayContaining(plansObject),
      };

      jest.spyOn(plansModel, 'getPlans');
      plansModel.getPlans.mockImplementation(async () => {
        return [
          {
            id: uuidv4(),
            date: Date(),
            organiser: uuidv4(),
            attendees: [uuidv4(), uuidv4()],
            meal: 'Breakfast',
          },
          {
            id: uuidv4(),
            date: Date(),
            organiser: uuidv4(),
            attendees: [uuidv4(), uuidv4()],
            meal: 'Lunch',
          },
          {
            id: uuidv4(),
            date: Date(),
            organiser: uuidv4(),
            attendees: [uuidv4(), uuidv4()],
            meal: 'dinner',
          },
        ];
      });

      // Act and Assert
      const actual = await request(router).get('/').expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlans.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const expected = {
        message: `Bad Request: couldn't retrieve plans`,
        success: false,
      };

      jest.spyOn(plansModel, 'getPlans');
      plansModel.getPlans.mockImplementation(async () => {
        throw new Error(`Bad Request: couldn't retrieve plans`);
      });

      // Act and Assert
      const actual = await request(router).get('/').expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlans.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const expected = {
        message: `Server Error: couldn't retrieve plans`,
        success: false,
      };

      jest.spyOn(plansModel, 'getPlans');
      plansModel.getPlans.mockImplementation(async () => {
        throw new Error(`Server Error: couldn't retrieve plans`);
      });

      // Act and Assert
      const actual = await request(router).get('/').expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlans.mockRestore();
    }
  );

  test.todo(
    'Upon a successful POST request, the correct response is returned',
    async () => {
      // Arrange
      const input = {
        id: uuidv4(),
        date: Date(),
        organiser: uuidv4(),
        attendees: [uuidv4()],
        meal: 'lunch',
      };

      const expected = {
        message: `${input.meal} for ${input.date} added`,
        success: true,
        payload: expect.toStrictEqual(input),
      };

      jest.spyOn(plansModel, 'addPlan');
      plansModel.addPlan.mockImplementation(async (data) => {
        return data;
      });

      // Act and Assert
      const actual = await request(router).post('/').send(input).expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.addPlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful POST request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const input = {
        id: uuidv4(),
        date: Date(),
        organiser: uuidv4(),
        attendees: [uuidv4()],
        meal: 'lunch',
      };

      const expected = {
        message: `Bad Request: unable to add ${input.meal} for ${input.date}`,
        success: false,
      };

      jest.spyOn(plansModel, 'addPlan');
      plansModel.addPlan.mockImplementation(async (data) => {
        throw new Error(
          `Bad Request: unable to add ${data.meal} for ${data.date}`
        );
      });

      // Act and Assert
      const actual = await request(router).post('/').send(input).expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.addPlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful POST request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const input = {
        id: uuidv4(),
        date: Date(),
        organiser: uuidv4(),
        attendees: [uuidv4()],
        meal: 'lunch',
      };

      const expected = {
        message: `Server Error: unable to add ${input.meal} for ${input.date}`,
        success: false,
      };

      jest.spyOn(plansModel, 'addPlan');
      plansModel.addPlan.mockImplementation(async (data) => {
        throw new Error(
          `Server Error: unable to add ${data.meal} for ${data.date}`
        );
      });

      // Act and Assert
      const actual = await request(router).post('/').send(input).expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.addPlan.mockRestore();
    }
  );
});

describe('Unit Tests: plans/:id', () => {
  test.todo(
    'Upon a successful GET request, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();

      const plansObject = {
        id,
        date: expect.any(String),
        organiser: expect.any(String),
        attendees: expect.arrayContaining(expect.any(String)),
        meal: expect.stringMatching(/breakfast|lunch|dinner/i),
      };

      const expected = {
        message: `Plan ${id}`,
        success: true,
        payload: expect.toStrictEqual(plansObject),
      };

      jest.spyOn(plansModel, 'getPlanById');
      plansModel.getPlanById.mockImplementation(async (planId) => {
        return {
          id: planId,
          date: Date(),
          organiser: uuidv4(),
          attendees: [uuidv4(), uuidv4()],
          meal: 'Breakfast',
        };
      });

      // Act and Assert
      const actual = await request(router).get(`/${id}`).expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlanById.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();

      const expected = {
        message: `Bad Request: unable to retrieve Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'getPlanById');
      plansModel.getPlanById.mockImplementation(async (planId) => {
        throw new Error(`Bad Request: unable to retrieve Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router).get(`/${id}`).expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlanById.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();

      const expected = {
        message: `Server Error: unable to retrieve Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'getPlanById');
      plansModel.getPlanById.mockImplementation(async (planId) => {
        throw new Error(`Server Error: unable to retrieve Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router).get(`/${id}`).expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlanById.mockRestore();
    }
  );

  test.todo(
    'Upon a successful PATCH request, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const input = {
        meal: 'lunch',
      };

      const plansObject = {
        id,
        date: expect.any(String),
        organiser: expect.any(String),
        attendees: expect.arrayContaining(expect.any(String)),
        meal,
      };

      const expected = {
        message: `Plan ${id} updated`,
        success: true,
        payload: expect.toStrictEqual(plansObject),
      };

      jest.spyOn(plansModel, 'updatePlan');
      plansModel.updatePlan.mockImplementation(async (planId, data) => {
        const keys = Object.keys(data);

        const object = {
          id: planId,
          date: Date(),
          organiser: uuidv4(),
          attendees: [uuidv4()],
          meal: 'breakfast',
        };

        keys.forEach((key) => (object[key] = data[key]));
        return object;
      });

      // Act and Assert
      const actual = await request(router)
        .patch(`/${id}`)
        .send(input)
        .expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.updatePlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful PATCH request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const input = {
        meal: 'lunch',
      };

      const expected = {
        message: `Bad Request: Unable to update Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'updatePlan');
      plansModel.updatePlan.mockImplementation(async (planId, data) => {
        throw new Error(`Bad Request: Unable to update Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router)
        .patch(`/${id}`)
        .send(input)
        .expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.updatePlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful PATCH request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const input = {
        meal: 'lunch',
      };

      const expected = {
        message: `Server Error: Unable to update Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'updatePlan');
      plansModel.updatePlan.mockImplementation(async (planId, data) => {
        throw new Error(`Server Error: Unable to update Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router)
        .patch(`/${id}`)
        .send(input)
        .expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.updatePlan.mockRestore();
    }
  );

  test.todo(
    'Upon a successful PUT request, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const input = {
        id,
        date: Date(),
        organiser: uuidv4(),
        attendees: [uuidv4()],
        meal: 'lunch',
      };

      const expected = {
        message: `Plan ${id} updated`,
        success: true,
        payload: expect.toStrictEqual(input),
      };

      jest.spyOn(plansModel, 'overwritePlan');
      plansModel.overwritePlan.mockImplementation(async (planId, data) => {
        return { planId, ...data };
      });

      // Act and Assert
      const actual = await request(router)
        .put(`/${id}`)
        .send(input)
        .expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.overwritePlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful PUT request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const input = {
        id,
        date: Date(),
        organiser: uuidv4(),
        attendees: [uuidv4()],
        meal: 'lunch',
      };

      const expected = {
        message: `Bad Request: unable to update Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'overwritePlan');
      plansModel.overwritePlan.mockImplementation(async (planId, data) => {
        throw new Error(`Bad Request: unable to update Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router)
        .put(`/${id}`)
        .send(input)
        .expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.overwritePlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful PUT request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const input = {
        id,
        date: Date(),
        organiser: uuidv4(),
        attendees: [uuidv4()],
        meal: 'lunch',
      };

      const expected = {
        message: `Server Error: unable to update Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'overwritePlan');
      plansModel.overwritePlan.mockImplementation(async (planId, data) => {
        throw new Error(`Server Error: unable to update Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router)
        .put(`/${id}`)
        .send(input)
        .expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.overwritePlan.mockRestore();
    }
  );

  test.todo(
    'Upon a successful DELETE request, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();
      const plansObject = {
        id,
        date: expect.any(String),
        organiser: expect.any(String),
        attendees: expect.arrayContaining(expect.any(String)),
        meal: expect.stringMatching(/breakfast|lunch|dinner/i),
      };

      const expected = {
        message: `Plan ${id} deleted`,
        success: true,
        payload: expect.toStrictEqual(plansObject),
      };

      jest.spyOn(plansModel, 'deletePlan');
      plansModel.deletePlan.mockImplementation(async (planId) => {
        return {
          planId,
          date: Date(),
          organiser: uuidv4(),
          attendees: [uuidv4()],
          meal: 'lunch',
        };
      });

      // Act and Assert
      const actual = await request(router).delete(`/${id}`).expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.deletePlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful DELETE request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();

      const expected = {
        message: `Bad Request: unable to delete Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'deletePlan');
      plansModel.deletePlan.mockImplementation(async (planId) => {
        throw new Error(`Bad Request: unable to delete Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router).delete(`/${id}`).expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.deletePlan.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful DELETE request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const id = uuidv4();

      const expected = {
        message: `Server Error: unable to delete Plan ${id}`,
        success: false,
      };

      jest.spyOn(plansModel, 'deletePlan');
      plansModel.deletePlan.mockImplementation(async (planId) => {
        throw new Error(`Server Error: unable to delete Plan ${planId}`);
      });

      // Act and Assert
      const actual = await request(router).delete(`/${id}`).expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.deletePlan.mockRestore();
    }
  );
});

describe('Unit Tests: users/?organiser=', () => {
  test.todo(
    'Upon a successful GET request, the correct response is returned',
    async () => {
      // Arrange
      const organiser = uuidv4();
      const plansObject = {
        id: expect.any(String),
        date: expect.any(String),
        organiser,
        attendees: expect.arrayContaining(expect.any(String)),
        meal: expect.stringMatching(/breakfast|lunch|dinner/i),
      };

      const expected = {
        message: `Plans organised by User ${organiser}`,
        success: true,
        payload: expect.arrayContaining(plansObject),
      };

      jest.spyOn(plansModel, 'getPlansByOrganiser');
      plansModel.getPlansByOrganiser.mockImplementation(async (organiserId) => {
        return [
          {
            id: uuidv4(),
            date: Date(),
            organiser: organiserId,
            attendees: [uuidv4(), uuidv4()],
            meal: 'Breakfast',
          },
          {
            id: uuidv4(),
            date: Date(),
            organiser: organiserId,
            attendees: [uuidv4(), uuidv4()],
            meal: 'Lunch',
          },
          {
            id: uuidv4(),
            date: Date(),
            organiser: organiserId,
            attendees: [uuidv4(), uuidv4()],
            meal: 'dinner',
          },
        ];
      });

      // Act and Assert
      const actual = await request(router)
        .get(`/?organiser=${organiser}`)
        .expect(200);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlansByOrganiser.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to user error, the correct response is returned',
    async () => {
      // Arrange
      const organiser = uuidv4();

      const expected = {
        message: `Bad Request: unable to retrieve Plans organised by User ${organiser}`,
        success: false,
      };

      jest.spyOn(plansModel, 'getPlansByOrganiser');
      plansModel.getPlansByOrganiser.mockImplementation(async (organiserId) => {
        throw new Error(
          `Bad Request: unable to retrieve Plans organised by User ${organiserId}`
        );
      });

      // Act and Assert
      const actual = await request(router)
        .get(`/?organiser=${organiser}`)
        .expect(400);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlansByOrganiser.mockRestore();
    }
  );

  test.todo(
    'Upon an unsuccessful GET request due to server error, the correct response is returned',
    async () => {
      // Arrange
      const organiser = uuidv4();

      const expected = {
        message: `Server Error: unable to retrieve Plans organised by User ${organiser}`,
        success: false,
      };

      jest.spyOn(plansModel, 'getPlansByOrganiser');
      plansModel.getPlansByOrganiser.mockImplementation(async (organiserId) => {
        throw new Error(
          `Server Error: unable to retrieve Plans organised by User ${organiserId}`
        );
      });

      // Act and Assert
      const actual = await request(router)
        .get(`/?organiser=${organiser}`)
        .expect(500);
      expect(actual).toStrictEqual(expected);

      // Cleanup
      plansModel.getPlansByOrganiser.mockRestore();
    }
  );
});
