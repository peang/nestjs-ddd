import { NotImplementedException } from '@nestjs/common';
export class ValueObject {
    public serialize(): string | number | boolean | Record<any, any> {
        throw new NotImplementedException();
    }

    public static deserialize(data: any): ValueObject {
        throw new NotImplementedException();
    }
}