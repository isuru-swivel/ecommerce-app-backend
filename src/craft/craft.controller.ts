import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
  UploadedFile,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CraftService } from './craft.service';
import { CreateCraftDto } from './dto/create-craft.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('crafts')
export class CraftController {
  constructor(private readonly craftService: CraftService) {}

  @Get()
  getAllCrafts() {
    try {
      return this.craftService.getAllCrafts();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(':id')
  getCraftById(@Param('id') id: string) {
    try {
      return this.craftService.getCraftById(id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  addCraft(
    @Body() createCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      return this.craftService.addCraft(createCraftDto, image);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  updateCraft(
    @Param('id') id: string,
    @Body() updateCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      return this.craftService.updateCraft(id, updateCraftDto, image);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteCraft(@Param('id') id: string) {
    try {
      return this.craftService.deleteCraft(id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
