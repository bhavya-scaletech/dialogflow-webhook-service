import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

/**
 * It will use to validate the body of the api.
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  /**
   * It will check, validate and transform the error.
   * @param value any
   * @param param1 ArgumentMetadata
   * @returns any
   */

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    let object;
    try {
      object = plainToInstance(metatype, value);
    } catch (e) {
      throw new BadRequestException({
        message: 'Validation failed',
        data: [],
      });
    }
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false,
      },
    });

    if (errors.length > 0) {
      let ero = errors[0];
      let constraints: any = ero?.constraints;
      const maxDepth = 5;
      let counter = 0;
      let firstErrorMessage = 'Invalid value';
      if (constraints) {
        const firstConstraint = Object.keys(constraints)[0];

        firstErrorMessage = firstConstraint
          ? constraints[firstConstraint]
          : 'Invalid value';
      }
      while (!constraints && ero?.children && counter < maxDepth) {
        ero = ero.children[0];

        constraints = ero?.constraints;
        if (constraints != undefined) {
          const firstConstraint = Object.keys(constraints)[0];

          firstErrorMessage = firstConstraint
            ? constraints[firstConstraint]
            : 'Invalid value';
          break;
        }
        counter++;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      throw new BadRequestException({
        message: firstErrorMessage,
        data: this.buildError(errors),
      });
    }
    return object;
  }

  /**
   * It will check the errors available and contruct it accordingly.
   * @param errors ValidationError[]
   * @returns [key: string]: string;
   */
  private buildError(
    errors: ValidationError[],
    errMessage?: any,
    parentField?: string,
  ) {
    const message = errMessage || {};
    let errorField = '';
    let validationsList;

    errors.forEach((error) => {
      errorField = parentField
        ? `${parentField}.${error.property}`
        : error.property;
      if (!error?.constraints && error?.children?.length) {
        this.buildError(error.children, message, errorField);
      } else {
        validationsList = Object.values(error?.constraints ?? {});
        message[errorField] =
          validationsList.length > 0 ? validationsList.pop() : 'Invalid Value.';
      }
    });

    return message;
  }

  /**
   * It will use to validate the function that will returns certain type.
   * @param metatype {Funciton}
   * @returns Boolean
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
