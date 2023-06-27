import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
  UploadedFile,
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
  async getAllCrafts(@Query('search') searchTerm: string) {
    return await this.craftService.getAllCrafts(searchTerm);
  }

  @Get(':id')
  async getCraftById(@Param('id') id: string) {
    return await this.craftService.getCraftById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async addCraft(
    @Body() createCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.craftService.addCraft(createCraftDto, image);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async updateCraft(
    @Param('id') id: string,
    @Body() updateCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.craftService.updateCraft(id, updateCraftDto, image);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCraft(@Param('id') id: string) {
    return await this.craftService.deleteCraft(id);
  }
}
