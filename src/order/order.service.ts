import { Injectable, Logger, HttpException } from '@nestjs/common';
import { PlaceOrderDto } from './dto/place-order.dto';
import { CraftService } from '../craft/craft.service';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly craftService: CraftService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    try {
      this.logger.log('Get all orders');

      return await this.orderModel.find().populate('orderItems.craft').exec();
    } catch (e) {
      this.logger.error('Get all orders error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async placeOrder(placeOrderDto: PlaceOrderDto) {
    try {
      this.logger.log('Place an order', JSON.stringify(placeOrderDto));

      //check remaining stock before place an order
      for (const item of placeOrderDto.orderItems) {
        const craft = await this.craftService.getCraftById(item.craft);
        if (craft.stock < item.quantity) {
          throw new HttpException(`${craft.name} is out of stock`, 400);
        }
      }

      //save order
      const newOrder = new this.orderModel(placeOrderDto);
      await newOrder.save();

      //update stock after place an order
      for (const item of placeOrderDto.orderItems) {
        await this.craftService.updateStock(item.craft, item.quantity);
      }

      return;
    } catch (e) {
      this.logger.error('Place an order error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }
}
