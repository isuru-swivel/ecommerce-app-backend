import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

interface OrderItem {
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
  phoneNumber: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  orderItems: [OrderItem];

  @IsNotEmpty()
  @IsNumber()
  orderTotal: number;
}
