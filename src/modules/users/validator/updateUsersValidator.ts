const updateUsersValidator = {
  properties: {
    firsname: {
      type: 'string',
      maxLength: 128,
    },
    lastname: {
      type: 'string',
      maxLength: 128,
    },
    email: {
      type: 'string',
    },
    role: {
      type: 'string',
      maxLength: 128,
    },
    username: {
      type: 'string',
      maxLength: 128,
    },
  },
};

export = updateUsersValidator;
