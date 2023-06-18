import { Get, Body, Post, Controller, HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/place-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders() {
    try {
      return this.orderService.getAllOrders();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post()
  placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    try {
      return this.orderService.placeOrder(placeOrderDto);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
