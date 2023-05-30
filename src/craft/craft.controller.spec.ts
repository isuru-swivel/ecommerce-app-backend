import { Test, TestingModule } from '@nestjs/testing';
import { CraftController } from './craft.controller';

describe('CraftController', () => {
  let controller: CraftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CraftController],
    }).compile();

    controller = module.get<CraftController>(CraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
