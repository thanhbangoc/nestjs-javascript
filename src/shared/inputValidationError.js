import { HttpStatus } from '@nestjs/common';

export class InputValidationError {
  constructor(errors) {
    this.errors = this.buildValidationError(errors);
  }

  getErrors() {
    return this.errors;
  }

  buildValidationError(errors) {
    return errors.reduce(validationErrorReducer('/data/attributes'), []);
  
    function validationErrorReducer(pointerAddress) {
      return (result, current) => {
        let currentResult = [];
  
        for (const constraintMessage of Object.values(
          current?.constraints ?? {},
        )) {
          currentResult = currentResult.concat([
            buildErrorObject(
              pointerAddress,
              current?.property,
              constraintMessage,
            ),
          ]);
        }
  
        currentResult = currentResult.concat(
          (current?.children ?? []).reduce(
            validationErrorReducer(pointerAddress.concat('/', current?.property)), []
          ),
        );
  
        return result.concat(currentResult);
      };
    }
  
    function buildErrorObject(pointerAddress, property, message) {
      return {
        status: HttpStatus.BAD_REQUEST,
        source: { pointer: pointerAddress.concat('/', property) },
        detail: message,
      };
    }
  }
}
