import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Craft } from './craft.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCraftDto } from './dto/create-craft.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CraftService {
  private readonly logger = new Logger(CraftService.name);
  constructor(
    @InjectModel(Craft.name) private craftModel: Model<Craft>,
    private uploadService: UploadService,
  ) {}

  async getAllCrafts(): Promise<Craft[]> {
    try {
      this.logger.log('Get all crafts');
      return await this.craftModel.find().exec();
    } catch (e) {
      this.logger.error('Get all crafts error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async getCraftById(id: string): Promise<Craft> {
    try {
      this.logger.log(`Get one craft with id ${id}`);
      const craft = await this.craftModel.findById(id).exec();
      if (!craft) {
        throw new NotFoundException('Craft not found');
      }
      return craft;
    } catch (e) {
      this.logger.error('Get one craft with id error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async addCraft(
    createCraftDto: CreateCraftDto,
    image: Express.Multer.File,
  ): Promise<Craft> {
    try {
      this.logger.log('Create a craft', JSON.stringify(createCraftDto));

      //upload craft image to s3
      const imageUrl = await this.uploadService.uploadFile(image);

      const newCraft = new this.craftModel({
        ...createCraftDto,
        image: imageUrl,
      });
      return newCraft.save();
    } catch (e) {
      this.logger.error('Create a craft error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async updateCraft(
    id: string,
    updateCraftDto: CreateCraftDto,
    image: Express.Multer.File,
  ): Promise<Craft> {
    try {
      this.logger.log(`Update a craft with id ${id}`);

      //get craft by id
      const craft = await this.craftModel.findById(id).exec();

      //check if craft exists
      if (!craft) {
        throw new NotFoundException('Craft not found');
      }

      //update craft
      craft.name = updateCraftDto.name;
      craft.description = updateCraftDto.description;
      craft.price = updateCraftDto.price;
      craft.stock = updateCraftDto.stock;

      if (image) {
        //upload craft image to s3
        craft.image = await this.uploadService.uploadFile(image);
      }

      return craft.save();
    } catch (e) {
      this.logger.error('Update a craft error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async deleteCraft(id: string): Promise<void> {
    try {
      this.logger.log(`Delete a craft with id ${id}`);

      const craft = await this.craftModel.findByIdAndDelete(id);
      if (!craft) {
        throw new NotFoundException('Craft not found');
      }
      return;
    } catch (e) {
      this.logger.error('Delete a craft error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  updateStock(id: string, quantity: number) {
    try {
      this.logger.log(`Update stock of craft with id ${id}`);

      //get craft by id and update stock
      return this.craftModel.findByIdAndUpdate(
        id,
        { $inc: { stock: -quantity } },
        { new: true },
      );
    } catch (e) {
      this.logger.error('Update stock of craft error', e.message);
      throw new HttpException(e.message, e.status);
    }
  }
}
