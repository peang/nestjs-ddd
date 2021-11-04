export interface IValueObject {
    serialize(): string | number | boolean | Record<any, any>;

    deserialize(data: any): IValueObject;
}