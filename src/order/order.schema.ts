import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// const orderItemSchema = new mongoose.Schema({
//   craft: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Craft',
//   },
//   quantity: Number,
// });

@Schema()
export class Order {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  orderItems: [
    {
      craft: {
        type: mongoose.Schema.Types.ObjectId;
        require: true;
        ref: 'Craft';
      };
      quantity: {
        type: number;
        required: true;
      };
    },
  ];

  @Prop({ required: true })
  orderTotal: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
