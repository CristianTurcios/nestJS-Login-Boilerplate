import { Test, TestingModule } from '@nestjs/testing';
import { BasicAuthService } from './basic-auth.service';

describe('BasicAuthService', () => {
  let service: BasicAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicAuthService],
    }).compile();

    service = module.get<BasicAuthService>(BasicAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
