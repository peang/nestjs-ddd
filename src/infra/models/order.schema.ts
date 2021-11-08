import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    id: string;

    @Prop()
    items: Record<string, any>[];

    @Prop()
    status: number;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;


}

export const OrderSchema = SchemaFactory.createForClass(Order);