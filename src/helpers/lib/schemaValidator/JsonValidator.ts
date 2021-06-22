import Ajv from 'ajv';

class JsonValidator {
  ajv = new Ajv({ allErrors: true });

  constructor() {
    this.ajv.addKeyword({
      keyword: 'objectId',
      validate<T>(schema: boolean, data: T) {
        return (typeof data === 'string' && data !== null
            && new RegExp('^[0-9a-fA-F]{24}$').test(data)
        ) === schema;
      },
    });
  }

  public validate<T>(schema: string | boolean | Record<string, unknown>, data: T): T {
    const isValid = this.ajv.validate(schema, data);

    if (!isValid) {
      const errorMessages = this.ajv.errorsText();
      throw new Error(`Validation de Schema : ${errorMessages}`);
    }

    return data;
  }
}

Object.seal(JsonValidator);
export = JsonValidator;
