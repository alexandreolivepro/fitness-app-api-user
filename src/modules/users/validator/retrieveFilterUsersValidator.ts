const retrieveFilterUsersValidator = {
  type: 'object',
  properties: {
    prenom: {
      type: 'string',
      minLength: 1,
    },
    nom: {
      type: 'string',
      minLength: 1,
    },
    email: {
      type: 'string',
      minLength: 1,
    },
    status: {
      type: 'string',
      minLength: 1,
    },
    role: {
      type: 'string',
      minLength: 1,
    },
  },
};

export = retrieveFilterUsersValidator;
