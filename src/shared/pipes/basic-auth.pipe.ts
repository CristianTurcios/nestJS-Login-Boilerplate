
import { ObjectSchema } from '@hapi/joi';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: any) {        
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException(error.message);
        }
        return value;
    }
}
