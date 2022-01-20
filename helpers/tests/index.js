import { v4 as uuidv4 } from 'uuid';

export const slowServerResponse = async (request, params = []) => {
  setTimeout(() => {
    return;
  }, 6000);
};

export const serverThrowsError = async (request, params = []) => {
  throw new Error();
};

export const returnResponseWithMultipleObjects = async (sampleObject) => {
  return async (request, params = []) => {
    return { rows: [sampleObject, sampleObject] };
  };
};

export const returnResponseWithSingleObject = async (sampleObject) => {
  return async (request, params = []) => {
    return { rows: sampleObject };
  };
};

export const modelThrowsError = async (errorType, modelName) => {
  throw new Error(constructErrorResponse(errorType, modelName));
};

export const constructErrorResponse = (errorType, modelName) => {
  return `${errorType}: Couldn't access ${modelName}`;
};

export const vaildId = uuidv4();

export const invalidId = 5;

export const serverError = 'Server Error';

export const userError = 'Bad Request';

export const buildResponse = (message, success, payload = null) => {
  if (payload) {
    return {
      message,
      success,
      payload,
    };
  } else {
    return {
      message,
      success,
    };
  }
};
