const createUsersValidator = {
  properties: {
    firstname: {
      type: 'string',
      maxLength: 128,
    },
    lastname: {
      type: 'string',
      maxLength: 128,
    },
    password: {
      type: 'string',
      maxLength: 128,
    },
    username: {
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
  },
  required: ['firstname', 'lastname', 'password', 'username', 'email'],
};

export = createUsersValidator;
