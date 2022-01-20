import { v4 as uuidv4 } from 'uuid';
import {
  constructErrorResponse,
  modelThrowsError,
  returnResponseWithMultipleObjects,
  returnResponseWithSingleObject,
  serverError,
  userError,
} from '.';

export const sampleHousehold = {
  id: uuidv4(),
  name: 'Mock Household',
  occupants: [uuidv4(), uuidv4()],
};

export const validInput = {
  name: 'New Household',
  occupants: [uuidv4(), uuidv4()],
};

export const invalidInput = {
  name: { first: 'Bad', last: 'Name' },
  occupants: 'Me',
};

export const validPatchInput = {
  name: 'Edited Household',
};

export const invalidPatchInput = {
  name: 10,
};

export const returnManyHouseholds = async () =>
  await returnResponseWithMultipleObjects(sampleHousehold);

export const returnSingleHousehold = async (
  requestedHousehold = sampleHousehold
) => await returnResponseWithSingleObject(requestedHousehold);

export const householdModelThrowsError = async (errorType) =>
  await modelThrowsError(errorType, 'households');

export const householdUserErrorResponse = () =>
  constructErrorResponse(userError, 'households');

export const householdServerErrorResponse = () =>
  constructErrorResponse(serverError, 'households');
