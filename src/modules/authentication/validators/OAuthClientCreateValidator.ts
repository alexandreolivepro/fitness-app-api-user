const createUsersValidator = {
  properties: {
    clientId: {
      type: 'string',
      maxLength: 128,
    },
    clientSecret: {
      type: 'string',
      maxLength: 128,
    },
    redirectUris: {
      type: 'array',
    },
    grants: {
      type: 'array',
    },
  },
  required: ['clientId', 'clientSecret', 'redirectUris', 'grants'],
};

  export = createUsersValidator;
