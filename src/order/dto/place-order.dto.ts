import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

export interface OrderItem {
  craft: string;
  quantity: number;
}

export class PlaceOrderDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsPhoneNumber('LK')
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  orderItems: OrderItem[];

  @IsNotEmpty()
  @IsNumber()
  orderTotal: number;
}
