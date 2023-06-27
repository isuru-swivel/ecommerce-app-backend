import { Get, Body, Post, UseGuards, Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Post()
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return await this.orderService.placeOrder(placeOrderDto);
  }

  @Get('/analytics')
  async getAnalytics() {
    return await this.orderService.getAnalytics();
  }
}
