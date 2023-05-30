import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CraftService } from './craft.service';
import { CreateCraftDto } from './dto/create-craft.dto';

@Controller('craft')
export class CraftController {
  constructor(private readonly craftService: CraftService) {}

  @Get()
  getAllCrafts() {
    return this.craftService.getAllCrafts();
  }

  @Get(':id')
  getCraftById(@Param('id') id: string) {
    return this.craftService.getCraftById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addCraft(
    @Body() createCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.craftService.addCraft(createCraftDto, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateCraft(
    @Param('id') id: string,
    @Body() updateCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.craftService.updateCraft(id, updateCraftDto, image);
  }

  @Delete(':id')
  deleteCraft(@Param('id') id: string) {
    return this.craftService.deleteCraft(id);
  }
}
