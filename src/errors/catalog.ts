export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  ObjectNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObj = {
  message: string,
  httpStatus: number,
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObj
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
};
